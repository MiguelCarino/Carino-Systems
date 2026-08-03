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

One screen. The page is a three-row grid the height of the viewport — header,
command bar, tiles — and nothing outside a tile ever scrolls. The header is
full-bleed like the shared navbar on every other site in the fleet; only the two
rows below it box into the content column.

The tile grid sizes itself. Given the box the tiles have and how many there are,
`fit()` tries every column count and keeps the one whose cells land closest to a
readable proportion, nudged toward layouts that leave few empty cells in the last
row and away from ones that waste horizontal space. Cells are capped in both
directions — past a point a bigger card is not a better one, it is a card with a
hole in it — so the tracks are `minmax(0, MAX)`: they fill the space when there is
little and stop growing when there is plenty, and the board centres itself in the
leftovers.

As a cell gets shorter it drops the least useful thing it carries — the call to
action, then a line of description at a time, then the description — rather than
clipping text. At phone density the whole fleet still fits: 3 columns of icon +
name, the name wrapping to two lines. Only when nothing legible fits at all does
the grid scroll inside itself; the page still does not.

Categories are filters on that one board, not a place you navigate to, so there is
no second view to come back from. Each tile carries its own description, so there
is nothing to read anywhere else.

State lives in the hash: `#medical` is a facet, `#/dicom` is a query,
`#medical/dicom` is both.

Keyboard: `/` or `Ctrl`/`⌘-K` for the search box, arrows to walk the grid (up and
down jump a row, which is only knowable after the fit), `Enter` to open, `Esc` to
clear.

## License

Licensed under the **GNU Affero General Public License v3.0 or later** (AGPL-3.0-or-later) — see [LICENSE](LICENSE). Copyright © 2026 Miguel Carino.
