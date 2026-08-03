# Carino-Systems

The hub at [carino.systems](https://carino.systems/) — an index of every tool in
the workshop, searchable from the box at the top.

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

## Layout

Search and the tag rail are the whole navigation; there are no sections. The
five fixed slices this replaced could not hold 31 tools without keeping a drawer
for whatever fit nowhere, and forced tools that were two things to be filed as
one.

## License

Licensed under the **GNU Affero General Public License v3.0 or later** (AGPL-3.0-or-later) — see [LICENSE](LICENSE). Copyright © 2026 Miguel Carino.
