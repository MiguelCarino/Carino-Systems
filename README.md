# Carino-Systems

The hub at [carino.systems](https://carino.systems/) — the index of every tool in
the fleet.

## Adding a tool

The page is rendered from [`assets/json/tools.json`](assets/json/tools.json).
Adding one is a single object:

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

- `tags` are **not** exclusive — a tool that is honestly two things gets two and
  shows up under both. Valid ids are the `tags` list at the top of the same file.
- `keywords` never appear on screen. They are what someone would actually type:
  `srt` finds Sync Studio, `anonymize` finds the tag editor.
- `local: true` marks a tool that runs on your own machine rather than at a URL.

`desc` and `cta` are translated the fleet way — the English string **is** the
key, so add it to each locale in [`i18n.js`](i18n.js) or it falls back to English.

Categories carry a `label`, a one-line `blurb` and an SVG `path`, all in the same
file. Both the label and the blurb are translated the same way.

## Layout

A line about why any of this exists with the search box beside it, then the
browser: every category down one side, the tools of whichever one is open along
the other. Whatever does not fit on a row wraps onto the next one.

Both columns share one height, computed from the category that needs the most
rows at the current width — so the rows do not resize under the pointer as the
rotation walks, and the page does not grow and shrink at the bottom. The eight
category rows divide that height between them, which is what makes them tall.

The selection walks to the next category every five seconds, so standing still
still shows you the whole fleet. The rule under the category name fills as it
counts down — an unannounced rotation reads as the page glitching. It pauses
under the pointer, while the search box is in use, when the tab is hidden, and
for `prefers-reduced-motion`; picking a category by hand stops it for good.

State lives in the hash: `#medical` for a category, `#/dicom` for a search. The
rotation never writes to the URL — it is ambient, and history should record what
you chose.

## License

Licensed under the **GNU Affero General Public License v3.0 or later** (AGPL-3.0-or-later) — see [LICENSE](LICENSE). Copyright © 2026 Miguel Carino.
