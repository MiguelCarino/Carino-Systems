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

- `tags` are **not** exclusive — a tool that is honestly two things gets two,
  and its card says so. Valid ids are the `tags` list at the top of the same
  file.
- **The FIRST tag is the tool's home**, and the board shows it in that panel
  only. Carino PACS is `["medical", "systems", "network"]`, so it sits under
  Medical, its card reads *Medical · Systems · Network*, and searching any of
  the three finds it. To move a tool to another panel, reorder its `tags` —
  there is no second field for it and no edit to make in `index.html`.
- `keywords` never appear on screen. They are what someone would actually type:
  `srt` finds Sync Studio, `anonymize` finds the tag editor.
- `local: true` marks a tool that runs on your own machine rather than at a URL.

`desc` and `cta` are translated the fleet way — the English string **is** the
key, so add it to each locale in [`i18n.js`](i18n.js) or it falls back to English.

Categories carry a `label`, a one-line `blurb` and an SVG `path`, all in the same
file. Both the label and the blurb are translated the same way.

## Layout

One screen, and the fleet is **partitioned** across it.

The page is the fleet header, a hero rail down the left, and a mosaic of eight
industry panels in two shelves of four. A closed panel shows two things: its
animated mark and its name, with the number of tools that live in it.

**Hovering a panel widens it** — it takes about half its shelf and its three
shelf-mates step back to make room — and the mark shrinks to the top third to
let the list of tools in underneath. Tabbing into a panel does the same, because
the rows are links and a list only a mouse can reach is not a list. Nothing on
this page scrolls, at any size.

A shelf is a flex row and not a pair of grid tracks for one reason: grid columns
are shared down the whole board, so widening the panel you are on would widen the
one under it too. A row that owns its own widths can give way on its own. The
grow factors add up to the same total either way (`2.2 + 3 × 0.6 = 4`), so a
shelf never changes width — only how it is divided — and `flex-grow` being an
animatable number is the whole of the animation: no width is ever computed and
nothing outside the shelf moves.

Every tool appears in exactly one panel — thirty-four tools, thirty-four rows, a
count you can add up. Home is the tool's first tag (see *Adding a tool* above),
and the card still names every tag it carries, so nothing is hidden by being
filed once.

**The rail** never changes: the claim, the paragraph, the search box, the key
legend, three readings counted from the registry, and the colophon. It is the
one fixed thing, which is what makes it a place to come back to rather than a
banner to get past.

**Opening a panel** does not navigate. Clicking anywhere on a closed panel — the
mark included, which is most of what there is to aim at on a touch screen — gives
it the floor: its tools open out into cards with their descriptions, and the
other seven fold into a rail of names down the right edge, so the rest of the
fleet is still on screen and one click away. `Esc`, the close pill, or the panel's
own head again folds it back; a stray click inside the open panel does not, or it
would close the thing you were reading.

Open, the shelves stop existing — `display: contents` hands their panels straight
to the mosaic — and the mosaic is a grid: the open panel placed at column one,
the other seven auto-placed down column two in order. One layout, two states, no
second component.

**Searching** narrows every panel at once and each head shows what survived over
what it holds — `2/3`. A panel left with nothing stays on the board, dimmed: it
holds no match, which is not the same as having gone away.

The two states of a closed panel are stacked in the same box rather than laid
out one after the other, so the swap is a cross-fade and never a reflow — the
board does not twitch when the pointer crosses it.

### On a phone

A touch screen has no hover, so there is nothing to widen or reveal on the way
past: the mark stays, and a tap anywhere on a panel opens it properly. Hover is
neutralised outright there rather than left alone, because a tap can leave
`:hover` stuck on whatever was tapped — but **focus is not**, so a tablet with a
keyboard gets the same board a desktop does. Which is why the whole board still
fits a phone **without scrolling** — a shelf becomes a plain 2 × 2 and two of
them stack into the 2 × 4 board, and eight marks with eight names is a small
thing to show. The rail lies down into a band at
1140px and gives up everything but the claim and the search box at 860px; the
mark scales with the panel it is in and can never outgrow it. Open, below 560px,
the panel *is* the board and the close pill is the way back — seven folded names
down the side of a 360px screen would be four characters each. A phone on its
side drops the claim and goes back to four columns, because there is no vertical
room for a band and a board both.

### What is not computed

Nothing measures a cell or searches for a column count. The mosaic is 4 x 2
because eight is what the registry has; a directory row grows to fill its panel
and stops at 36px, which is one flex rule; and the open panel's card grid gets
its column count from a small table (four goes 2x2 rather than 3+1, six goes
3x2, nine goes 3x3) spent as a track *minimum*, so a pane too narrow for that
many columns quietly takes fewer instead of overflowing. That is the whole of
what the one-screen wall used to need `fit()` for.

Every size on the page is one of the thirteen `--fs-*` steps from
[the type scale](https://branding.carino.systems/#type), declared in `:root` and
used by token — no raw rem values anywhere, and nothing below the `--fs-micro`
floor. The wordmark is `--fs-h2`, which is also what the shared navbar uses, so
the hub's brand matches every other site in the fleet.

Counts are written as a field and a value — `TOOLS / 34`, never "34 tools".
Spanish, Portuguese and Russian all decline a counted noun and Russian declines
it three ways; a label beside a number is correct in every language and reads as
console chrome rather than as a sentence.

Cards are treated as a material, not as boxes: a top edge catching light, a ruled
field behind the page so the black reads as a surface, an icon chip to land on
before you read anything, and a gold pool that follows the cursor across the card
rather than the whole card switching on. Cards arrive with a short index-staggered
entrance when a panel opens — never while you type, where re-running it per
keystroke turns a narrowing list into a strobe. Every effect is transform,
opacity or colour.

The animations come from `carino-anim.css` (motion) and `carino-anim.js`
(geometry), local copies of the pair documented in §24 of
[branding.carino.systems](https://branding.carino.systems/#anim). Ids match the
tag ids in `assets/json/tools.json`, so a panel finds its mark by name and a new
category without one simply gets no band. The marks are built once, with the
panels: only the lists and the card grids are ever re-rendered, because
rebuilding a panel per keystroke would restart all eight animations.

State lives in the hash: `#medical` is an open panel, `#/dicom` is a query,
`#medical/dicom` is both.

Keyboard: `/` or `Ctrl`/`⌘-K` for the search box, `1`–`8` to open an industry by
its place on the board, arrows to walk the ring once one is open, `Esc` to close
and clear.

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
