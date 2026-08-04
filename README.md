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
command bar, board — and nothing outside a tile ever scrolls. The board is itself
a column: the section's name, its animation, then its tiles, anchored to the top.
The header is
full-bleed like the shared navbar on every other site in the fleet; only the two
rows below it box into the content column.

The tile grid sizes itself. The box is the board row minus the heading and the
animation — measured there rather than on the grid, because the grid is what
`fit()` writes to and reading its own output back would be circular. Given that
box and how many tiles there are, `fit()` tries every column count and keeps the
one whose cells land closest to a readable proportion, weighted hard against a
ragged last row and away from layouts that waste horizontal space. Raggedness
used to be a gentle nudge, which was not enough: nine tools came out 4×3, one
card sitting alone under eight. Cells are capped in both directions — past a point a bigger card is not a
better one, it is a card with a hole in it. `fit()` then sets the grid to exactly
the height its answer needs, so the slack belongs to the row and is shared with
the heading and the animation instead of being swallowed inside the grid: four
tools in a tall band come out as one centred block, not four cards adrift with the
animation stranded at the bottom of the screen.

Every size on the page is one of the thirteen `--fs-*` steps from
[the type scale](https://branding.carino.systems/#type), declared in `:root` and
used by token — no raw rem values anywhere, and nothing below the `--fs-micro`
floor. The wordmark is `--fs-h2`, which is also what the shared navbar uses, so
the hub's brand matches every other site in the fleet.

Cards are treated as a material, not as boxes: a top edge catching light, a ruled
field behind the board so the black reads as a surface, an icon chip to land on
before you read anything, and a gold pool that follows the cursor across the card
rather than the whole card switching on. Tiles arrive with a short index-staggered
entrance when you change facet — never while you type, where re-running it per
keystroke turns a narrowing list into a strobe. Every effect is transform, opacity
or colour, so none of it can feed back into the fit.

As a cell gets shorter it drops the least useful thing it carries — the call to
action, then a line of description at a time, then the description — rather than
clipping text. At phone density the whole fleet still fits: 3 columns of icon +
name, the name wrapping to two lines. Only when nothing legible fits at all does
the grid scroll inside itself; the page still does not.

A category is a place you stand rather than a filter you applied. The board shows
one section at a time — its name, then its animation, then its cards, all anchored
to the top of the board so the mark sits high and whatever a small section cannot
fill falls to the bottom as whitespace. Centring the block instead put a void
above it and a void below, which reads as broken rather than as breathing room.
You step with the wheel, a swipe, `PageUp`/`PageDown` or the **next** chip; there
is no dot rail, because the facet strip above already lists every section, carries
the counts and lights the current one. The set is a ring, so the last section is not a dead
end. `#all` is the whole wall, and searching leaves the frame entirely: a query is
not a place. Each tile carries its own description, so there is nothing to read
anywhere else.

The animations come from `carino-anim.css` (motion) and `carino-anim.js`
(geometry), local copies of the pair documented in §24 of
[branding.carino.systems](https://branding.carino.systems/#anim). Ids match the
tag ids in `assets/json/tools.json`, so a section finds its animation by name and
a new category without one simply gets no band.

State lives in the hash: `#medical` is a facet, `#/dicom` is a query,
`#medical/dicom` is both.

Keyboard: `/` or `Ctrl`/`⌘-K` for the search box, arrows to walk the grid (up and
down jump a row, which is only knowable after the fit), `Enter` to open, `Esc` to
clear.

## License

Licensed under the **GNU Affero General Public License v3.0 or later** (AGPL-3.0-or-later) — see [LICENSE](LICENSE). Copyright © 2026 Miguel Carino.
