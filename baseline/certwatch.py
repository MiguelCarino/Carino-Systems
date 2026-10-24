#!/usr/bin/env python3
"""certwatch.py — watch the TLS certificates every Carino site serves.

    python3 certwatch.py                    # dry run: print the table and alerts
    python3 certwatch.py --write            # also update certs.json at the repo root
    python3 certwatch.py --alerts FILE      # write the alerts as markdown (empty file: none)
    python3 certwatch.py ping.carino.systems ...   # only these sites

Every site is a GitHub Pages custom domain, and GitHub gets its certificates
from Let's Encrypt. So anything else is worth a look: a certificate from
another CA, one that does not name the site, one the system trust store
refuses, or one about to expire (GitHub renews about 30 days out, so 14 days
left means renewal has stopped).

Three sources, each stated where it is read:

    the sites      a verified TLS handshake to each domain in sites.json (SNI);
                   the certificate it serves goes into certs.json
    crt.sh         Certificate Transparency: every unexpired certificate any CA
                   has logged for carino.systems or a subdomain. This is what
                   catches a certificate issued but not (yet) served
    dns.google     the apex CAA record, over DNS-over-HTTPS. Information only:
                   see the README for why it can cover the apex alone

certs.json carries no "checked at" time on purpose: it changes only when a
certificate does, so the history of the file is the history of renewals.
It also holds "ct_ignore", crt.sh ids a person has reviewed and silenced.

Exit status is 0 whatever is found; alerts are reported through --alerts,
which the workflow turns into an issue. Standard library only.
"""
import hashlib
import json
import socket
import ssl
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime, timedelta, timezone
from pathlib import Path

HERE = Path(__file__).resolve().parent
OUT = HERE.parent / 'certs.json'
EXPECTED = "Let's Encrypt"
WARN_DAYS = 14
# exclude=expired cuts the answer from ~480 entries (every certificate since
# 2020) to the few dozen that matter, which is what crt.sh can serve reliably.
# The not_after test below stays: crt.sh's idea of "expired" is not checked.
CT_QUERIES = ['https://crt.sh/?q=%25.carino.systems&output=json&exclude=expired',
              'https://crt.sh/?q=carino.systems&output=json&exclude=expired']
CAA_URL = 'https://dns.google/resolve?name=carino.systems&type=CAA'
UA = {'User-Agent': 'carino-certwatch'}


def iso(t):
    """A certificate time ('Dec 21 10:20:56 2026 GMT') as ISO 8601 UTC."""
    return datetime.fromtimestamp(ssl.cert_time_to_seconds(t), timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ')


def parse_iso(s):
    return datetime.strptime(s[:19], '%Y-%m-%dT%H:%M:%S').replace(tzinfo=timezone.utc)


def field(name, key):
    """One attribute out of getpeercert()'s nested subject/issuer tuples."""
    for rdn in name or ():
        for k, v in rdn:
            if k == key:
                return v
    return ''


def names_match(domain, sans):
    """The domain is one of the certificate's names, or under one of its wildcards."""
    parent = domain.split('.', 1)[1] if '.' in domain else ''
    return any(n == domain or (n.startswith('*.') and n[2:] == parent) for n in sans)


def handshake(domain, verify=True):
    """(decoded cert or None, DER bytes) from one TLS connection. The unverified
    form exists only to say what was served when verification fails, and
    getpeercert() decodes nothing then, so only the DER comes back."""
    ctx = ssl.create_default_context()
    if not verify:
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
    with socket.create_connection((domain, 443), timeout=10) as raw:
        with ctx.wrap_socket(raw, server_hostname=domain) as tls:
            return (tls.getpeercert() if verify else None), tls.getpeercert(binary_form=True)


def fingerprint(der):
    return ':'.join(f'{b:02X}' for b in hashlib.sha256(der).digest())


def probe(domain):
    """The certificate entry for certs.json, or {'error': ..., 'detail': ...}.
    One retry, so a single dropped connection on a runner is not reported as an
    incident. 'error' is coarse and is what certs.json and the alert keep, so a
    site that stays down does not change the file each time the exception text
    does; 'detail' is the exception, for the console only."""
    for attempt in (1, 2):
        try:
            cert, der = handshake(domain)
            return {'issuer_org': field(cert.get('issuer'), 'organizationName'),
                    'issuer_cn': field(cert.get('issuer'), 'commonName'),
                    'subject': field(cert.get('subject'), 'commonName'),
                    'san': sorted(v for k, v in cert.get('subjectAltName', ()) if k == 'DNS'),
                    'not_before': iso(cert['notBefore']), 'not_after': iso(cert['notAfter']),
                    'sha256': fingerprint(der)}
        except ssl.SSLCertVerificationError as e:
            # Not retried: a refused certificate is an answer, not a flake.
            note = f'verification failed: {e.verify_message or e.reason}'
            try:
                note += ' (served sha256 ' + fingerprint(handshake(domain, verify=False)[1]) + ')'
            except (OSError, ssl.SSLError):
                pass
            return {'error': note, 'detail': note}
        except (OSError, ssl.SSLError) as e:
            if attempt == 2:
                return {'error': 'unreachable (no TLS handshake)', 'detail': f'{type(e).__name__}: {e}'}
            time.sleep(3)


def classify(domain, cur, prev, now):
    """(state, alerts) for one site. state is one of unchanged, renewed, new,
    changed, error; alerts is a list of sentences."""
    if 'error' in cur:
        return 'error', [cur['error']]
    alerts = []
    if cur['issuer_org'] != EXPECTED:
        alerts.append(f'issuer is {cur["issuer_org"] or "?"} {cur["issuer_cn"]}, not {EXPECTED}')
    if not names_match(domain, cur['san']):
        alerts.append('certificate does not name the site: ' + ', '.join(cur['san']))
    left = parse_iso(cur['not_after']) - now
    if left < timedelta(days=WARN_DAYS):
        alerts.append(f'expires {cur["not_after"][:10]} ({left.days} days left)')
    if not prev or 'sha256' not in prev:
        return 'new', alerts
    if prev['sha256'] == cur['sha256']:
        return 'unchanged', alerts
    return ('changed' if alerts else 'renewed'), alerts


def fetch_json(url, timeout, tries=1):
    last = None
    for i in range(tries):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=timeout) as r:
                return json.loads(r.read().decode('utf-8'))
        except (urllib.error.URLError, OSError, ValueError) as e:
            last = e
            if i + 1 < tries:
                time.sleep(5)
    raise RuntimeError(f'{url}: {getattr(last, "reason", last)}')


def ct_alerts(ignore, now):
    """(alerts, warning) from crt.sh. crt.sh is slow and often down; when it
    cannot answer, that is a warning and never an alert. Precertificate and
    final certificate are two log entries with one serial, so one line each,
    for the lowest id (crt.sh's order is not stable); either id in ct_ignore
    silences the serial."""
    seen, ids, failed = {}, {}, []
    for url in CT_QUERIES:
        # Each query on its own: the subdomain answer is still worth reading
        # when the apex one times out, and the warning says which was missed.
        try:
            for c in fetch_json(url, timeout=60, tries=2):
                s = c.get('serial_number')
                ids.setdefault(s, set()).add(c.get('id'))
                if s not in seen or c.get('id', 0) < seen[s].get('id', 0):
                    seen[s] = c
        except RuntimeError as e:
            failed.append(str(e))
    warning = ('crt.sh unavailable, CT not checked for: ' + '; '.join(failed)) if failed else None
    out = []
    for serial, c in sorted(seen.items(), key=lambda kv: kv[1].get('id', 0)):
        if ignore & ids[serial] or EXPECTED in (c.get('issuer_name') or ''):
            continue
        try:
            if parse_iso(c['not_after']) <= now:
                continue
        except (KeyError, ValueError):
            pass
        names = ', '.join(sorted(set((c.get('name_value') or '').split('\n')) - {''}))
        out.append(f'CT log: certificate not from {EXPECTED} — serial {serial}, '
                   f'issuer "{c.get("issuer_name")}", names {names}, until {str(c.get("not_after"))[:10]}, '
                   f'https://crt.sh/?id={c.get("id")}')
    return out, warning


def caa():
    """The apex CAA records as text ('0 issue "letsencrypt.org"'), sorted, or
    None when the lookup itself failed. [] means there is no record."""
    try:
        d = fetch_json(CAA_URL, timeout=15, tries=2)
    except RuntimeError:
        return None
    return sorted(a['data'] for a in d.get('Answer', []) if a.get('type') == 257)


def main(argv):
    write = '--write' in argv
    alerts_file = argv[argv.index('--alerts') + 1] if '--alerts' in argv else None
    only = {a for a in argv if '.' in a and not a.startswith('-') and a != alerts_file}
    sites = json.loads((HERE / 'sites.json').read_text(encoding='utf-8'))
    prev = json.loads(OUT.read_text(encoding='utf-8')) if OUT.exists() else {}
    old = prev.get('domains', {})
    now = datetime.now(timezone.utc)

    domains, alerts, notes = {}, [], []
    print(f'{"Site":32} {"State":9} {"Issuer":20} {"Until":10}  SHA-256')
    for site in sites:
        d = site['domain']
        if only and d not in only:
            if d in old:
                domains[d] = old[d]
            continue
        cur = probe(d)
        state, found = classify(d, cur, old.get(d), now)
        if 'error' in cur:
            # Keep the last certificate seen, marked: the file then changes once
            # when a site breaks and once when it recovers, not on every flake.
            domains[d] = {**{k: v for k, v in old.get(d, {}).items() if k != 'error'}, 'error': cur['error']}
            print(f'{d:32} {state:9} {"-":20} {"-":10}  {cur["detail"]}')
        else:
            domains[d] = cur
            print(f'{d:32} {state:9} {(cur["issuer_org"] + " " + cur["issuer_cn"])[:20]:20} '
                  f'{cur["not_after"][:10]}  {cur["sha256"][:23]}')
        if state == 'renewed':
            notes.append(f'{d}: renewed, until {cur["not_after"][:10]}')
        alerts += [f'**{d}** — {a}' for a in found]

    ignore = set(prev.get('ct_ignore', []))
    ct, warn = ct_alerts(ignore, now)
    alerts += ct
    if warn:
        print('warning: ' + warn)

    rec = caa()
    if rec is None:
        rec = prev.get('caa', [])
        print('warning: CAA lookup failed; keeping the previous value')
    print('CAA (apex): ' + ('; '.join(rec) if rec else 'none — see README, "Certificates"'))

    for n in notes:
        print('note: ' + n)
    print(f'{len(alerts)} alert(s)')
    for a in alerts:
        print('ALERT: ' + a)

    if write:
        data = {'schema': 1, 'expected_issuer': EXPECTED, 'caa': rec,
                'ct_ignore': sorted(ignore), 'domains': domains}
        text = json.dumps(data, indent=2, sort_keys=True, ensure_ascii=False) + '\n'
        if not OUT.exists() or OUT.read_text(encoding='utf-8') != text:
            OUT.write_text(text, encoding='utf-8')
            print(f'wrote {OUT.name}')
    if alerts_file:
        body = ''
        if alerts:
            body = '\n'.join(['Found by `baseline/certwatch.py`.', ''] + [f'- {a}' for a in alerts] + [
                '', 'A reviewed CT entry can be silenced by adding its crt.sh id to "ct_ignore" in certs.json.', ''])
        Path(alerts_file).write_text(body, encoding='utf-8')
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
