# Carino-Systems

The hub at [carino.systems](https://carino.systems/) — the index of every tool in
the fleet.

## Adding a tool

Two files, joined by name.

**1. The registry.** [`assets/json/tools.json`](assets/json/tools.json) is what
the fleet *is* — one object per tool:

```json
{
  "name": "Carino Fonts",
  "icon": "🔤",
  "url": "https://font.carino.systems/",
  "desc": "Draw a typeface glyph by glyph or with a vector pen, kern it, preview live and export a working TTF or WOFF — entirely in the browser.",
  "cta": "Launch ↗",
  "tags": ["files", "media"],
  "keywords": "font glyph ttf woff kerning typeface type editor subset"
}
```

- `name`, `icon` and `url` are what the page renders, and `name` is the key the
  running order joins on — so it has to match exactly, and changing it means
  changing it in both files.
- `local: true` marks a tool that runs on your own machine rather than at a URL.
  The card says so, under its name.
- `tags` are **not** exclusive — a tool that is honestly two things gets two —
  and they remain the fleet's classification of what a tool *is*. Nothing on the
  page reads them today; where a tool *appears* is decided by `start.json`, which
  is about what a visitor wants rather than what a tool is.
- `desc`, `cta` and `keywords` are likewise kept and unread. `desc` is the
  technical one-liner, written for someone who knows the words; the page shows
  the plain `line` from `start.json` instead. They cost nothing and are the first
  thing any search or API would want back.

**2. The running order.** [`assets/json/start.json`](assets/json/start.json)
decides which group it appears in and what it is called in plain words — see
*The running order* below. A tool that is in the registry and not in the running
order is not on the page at all, so both edits are the one job.

## One page

The hub is one scrolling page, and it is written for someone who does **not**
already know the fleet's vocabulary.

Three designs came before it and all three were indexes for a reader who did: a
wall of thirty-four tiles, a scrolling page of industry sections, and a console
of eight animated industry panels on one screen. Each answered *which tool* for
somebody who could already tell a distro from a DICOM tag. Most people who
arrive here cannot, and were never going to learn in order to open a scan a
colleague sent them — so the page groups the fleet by **the job someone came to
do**, in sentences, and everything that made the BODY of the console read as an
instrument is deliberately gone: no monospace, no uppercase tracking, no abstract
marks, no hover-to-reveal, no keyboard ring. The navbar is the exception and
keeps its instruments — see *The navbar* below.

Four rules hold it together:

- **Nothing is hidden behind a hover.** A first-time visitor on a tablet never
  finds it and would not think to look, so every tool is on the glass at rest.
- **Every tool is named twice** — once in plain words, large (*"Clean a study
  before you share it"*), once by its real name, small (*DICOM Tag Editor*). The
  page teaches the fleet's vocabulary instead of assuming it.
- **One tap target per tool**: the whole card. Never a small arrow at the end of
  a row, which on a phone is a miss.
- **The privacy claim is the second thing on the page**, as a badge rather than
  a clause in a paragraph, because for a clinic it is the whole decision.

In order: the claim and that promise; four *start here* cards; the groups; three
plain answers to *is it safe / do I install anything / what does it cost*; and a
way to get in touch.

Nothing is left out. The tools that genuinely need a technical reader are the
last group and say so in their heading, rather than living on a second page
nobody would find.

### The running order

[`assets/json/start.json`](assets/json/start.json) owns the groups, their order,
and what each tool is called in plain words:

```json
{ "ref": "Carino Retina",
  "plain": "Eye examinations",
  "line": "Mark up a photo of the eye, work out the prescription, print the sheet." }
```

`ref` is the tool's exact `name` in `tools.json` — that is where the URL, the
icon and the local flag come from, so a moved subdomain is one edit in one file
and the plain wording can never drift away from the address. A `ref` that
matches nothing is skipped rather than rendered broken.

**Every tool in `tools.json` belongs in exactly one group.** This is the hub, and
a tool it does not list is a tool nobody can find; the page checks on load and
names any it is missing in the browser console — where the person maintaining it
will see it and the person reading it will not.

`plain` and `line` are English keys like everything else: add each to the four
locales in [`i18n.js`](i18n.js) or they fall back to English. An optional `shot`
points at `assets/shots/<file>.webp` and replaces the icon plate with a
screenshot of the tool, which is worth more to a first-time visitor than any
glyph.

The groups are verbs, not industries: *Medical images and eye care · Documents,
photos and video · Your computer · Passwords and safety · The business side ·
For the technical side · Learning, and time off*. The `tags` in `tools.json` are
still the honest classification of what a tool **is**, and are what a search
would use; the groups here are about what a visitor **wants**, and the two do
not have to agree.

### The look

Same black and gold as every other site in the fleet, and the same fonts — what
changed is everything that made it read as an instrument rather than as a page.

Every size is one of the thirteen `--fs-*` steps from
[the type scale](https://branding.carino.systems/#type), declared in `:root` and
used by token — no raw rem values, nothing below the `--fs-micro` floor. The
page reads larger than the old console did because it is emptier, not because it
invents sizes. The wordmark is `--fs-h2`, which is what the shared navbar uses,
so the brand matches every other site.

Cards are treated as a material: a top edge catching light, an icon plate to
land on before you read anything, and a lift on hover. The page behind them is
black and one soft gold pool — the ruled field the old board sat on is gone,
because a page of prose does not need to be told it is sitting on a surface.
Every effect is transform, opacity or colour, and every one of them is switched
off under `prefers-reduced-motion`.

The headline uses `text-wrap: balance` rather than a hand-tuned width: a claim of
two sentences breaks badly on a fixed measure, and which line it breaks on
differs per language. Its measure is in `em`, not `ch` — `ch` is the width of the
digit zero in whichever face actually won, which differs per engine and again
before the webfont has landed.

There is no footer. The page ends on the two bands, with the bottom space as
padding on `main` rather than a margin on the last band — `main` has no vertical
padding of its own, so a margin there collapses straight through it.

### The navbar

The header is the **full** fleet header — brand, live clock with its timezone
chip and rotating greeting, the language switcher, the social links, and the
Sys. Status drawer. The page below it is written for someone with no technical
background; the instruments are not, and that is the point. They belong to the
fleet rather than to this page, they sit in the same slots on every other Carino
site, and somebody who does not know what a jitter reading is simply never opens
the drawer.

`carino-clock.js` finds the clock by class and cycles Local / UTC / Epoch on
click. `assets/js/clock-network.js` fills the drawer and `assets/js/services.js`
runs the tab-title gag. Two things about them are load-bearing:

**Script order.** The deferred trio (`carino-clock.js`, `carino-lang.js`,
`i18n.js`) is followed by two classic scripts at the very end of `<body>`.
Classic scripts there run *before* deferred ones, and clock-network.js depends on
that twice: it binds `#retryNetwork`, `#exportStatus` and the toggle at parse
time, so the markup must already exist above it, and it deliberately cannot see
i18n.js's `t()` yet, which is why it carries its own bridge and re-runs on
`carino:langchange`. Do not add `defer` to the last two.

**Nothing networked runs until the drawer is opened.** The sweep is ~26
cross-origin requests plus a bandwidth test that pulls 1 MB — 25 MB on a fast
link — into memory. That was fine on a console for engineers and is not fine on
a front door most people reach on a phone and never open the drawer on. Only
`detectSystem()` is eager; it is local and touches no network. The gate is the
`open` class on `#diagBox`, so `toggleDiag` and that class name are a contract
between index.html and clock-network.js.

The drawer closes on `pointerdown` outside it rather than `click`: WebKit does
not bubble a click to `document` from a non-interactive element, so on an iPhone
tapping the prose left it open forever while the same tap closed it everywhere
else. `Escape` closes it too and returns focus to the button, which the console
never wired up.

### Three engines

Every rule on this page is meant to render the same in WebKit, Gecko and
Chromium, and the places where they genuinely differ are handled rather than
guessed at:

- **Safe area.** `viewport-fit=cover` is on, so the gutter is
  `max(var(--pad), env(safe-area-inset-*, 0px))`, folded into `--pad-l`/`--pad-r`
  once. The `, 0px` covers an engine that knows `env()` but not that variable
  name; everywhere else it is 0 on a device with no cutout and `max()` picks
  `--pad`.
- **The background pool** is sized, not `background-attachment: fixed`. iOS
  Safari does not honour a fixed attachment and resolved the gradient's `-10%`
  against the document height instead of the viewport, pushing the gold off the
  page; the other two honoured it and repainted on every scroll frame.
- **Scrollbars** are `@supports`-gated. Since Chromium 121 a non-`auto`
  `scrollbar-width` makes `::-webkit-scrollbar` inert, so styling both meant two
  engines drew one design and one drew the other. `scrollbar-width` does not
  inherit, so the drawer sets its own.
- **Fonts.** Red Hat Display is latin + latin-ext and IBM Plex Sans has no CJK,
  so `--font-display` / `--font-body` name the CJK and system fallbacks rather
  than leaving three platforms to pick differently. `--font-emoji` puts the
  colour-emoji faces first, because an icon whose default presentation is text
  (a bare U+1F441 eye) otherwise draws monochrome on two engines and colour on
  the third.
- **Buttons** reset `appearance` both prefixed and unprefixed — WebKit only went
  unprefixed in 15.4 — and the clock blocks `-webkit-touch-callout`, which has no
  unprefixed partner and is what makes a tap on the digits raise the copy sheet.
- **`prefers-reduced-motion`** is a blanket rule rather than a hand-listed one,
  so the drawer's pulsing dot and scanning dots are covered, and so is whatever
  gets pasted in next.
- **The drawer says less on Safari and Firefox, by design.** `deviceMemory`,
  `getBattery` and `connection` are Chromium-only and `WEBGL_debug_renderer_info`
  is masked by the other two. Those rows are now *hidden* rather than printed as
  "Masked", which read like a privacy switch the visitor could flip.

### On a phone

Everything is a single column, every card is a full-width tap target, and the
four *start here* cards lie down into the same shape as the rest rather than
staying tall. There is nothing to reveal on the way past and nothing to widen,
because there never was — the page is the same page a desktop gets, in one
column. It scrolls, which the console pointedly did not.

The navbar gives way in the order its parts stop earning their width: the
greeting at 1080px, the whole clock at 860px, the Sys. Status label at 560px,
leaving the pulsing dot as the button. `overflow-x: hidden` is deliberately not
the shortcut — in both WebKit and Chromium it turns the root into a scroll
container and the sticky header silently stops sticking.

## Licensing

**Mine — GNU Affero General Public License v3.0 or later.** Everything in this
repository *except* the paths listed below. Copyright © 2026 Miguel Carino.
Full terms in [LICENSE](LICENSE).

**Not mine.** The files below are third-party works redistributed here. This
project's licence does not cover them and could not: they are not mine to
relicense. Each keeps its own terms, and each carries its own notice.

| Path | What it is | Licence | Notice |
| --- | --- | --- | --- |
| [`fonts/`](fonts/) | IBM Plex Mono, IBM Plex Sans, Red Hat Display | SIL OFL 1.1 | [`fonts/OFL.txt`](fonts/OFL.txt) |

Those files travel with any fork, mirror or repackaging of this repository, and
their notices must travel with them.
