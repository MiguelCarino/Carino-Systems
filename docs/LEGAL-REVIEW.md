# Legal page — review notes

The legal text lives in one place: [`../legal.html`](../legal.html)
(carino.systems/legal.html). Spanish governs; English is a translation.

**Status: `ai`.** Drafted by AI on 2026-10-19/20 from facts in the code: the
`carino_lang` cookie, each outside service the tools call, and the hosting.
No person or lawyer has reviewed it yet. The page says so at the top. When
it has been reviewed, remove the banner and mark `legal.html` `reviewed` in
`AUDIT.md`.

Questions for the reviewer:

1. **Which law applies.** Mexico's private-sector data-protection law
   (LFPDPPP). Confirm the version in force, and whether sites that collect
   no personal data need a full *aviso de privacidad integral* or whether
   the short form is enough.
2. **Operator.** The text names Miguel Cariño as an individual. If a
   company takes over, §1 changes.
3. **Contact.** Is pointing to the navbar's GitHub/LinkedIn links enough for
   a legal notice, or must an email or postal address be listed? (Decision
   so far: no contact channel beyond the navbar.)
4. **Medical disclaimer.** Is the wording for Retina, the DICOM editor and
   dicom.carino.systems strong enough?
5. **Private services (§4).** Some subdomains point to the operator's own
   server and are invitation-only; by decision they are not named on the
   page. Confirm the server location (stated as Mexico), set a concrete
   retention period for server logs (the text says "as long as needed"),
   and confirm the examples of what the services offer.
6. **Outside-services table.** Re-check it against the code whenever a tool
   starts calling a new service.

ButterEye is not a Carino product and does not link to this page.
