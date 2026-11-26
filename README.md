# blog.thesounding.site

Zola site. `nix develop` for a shell with zola (`zola serve` to preview);
`nix build` renders the site into `./result`. Pushes to `main` deploy to
GitHub Pages via `.github/workflows/pages.yml`.

## Shared theme, footer and brand

These are verbatim copies from the Sounding product repo, which owns them.
Don't edit them here; changes go there and are copied back.

- `static/theme.css`, `static/theme.js`
- `static/brand/` (logo font, its licence `OFL.txt`, favicons; see its
  README), plus `static/favicon.ico`, a copy of `brand/favicon.ico` for
  browsers that ask for it at the root
- In `templates/base.html`: the appearance control (the `data-theme-switch`
  group) and everything inside `<footer class="site-footer">`, pasted without
  their leading comments

Last copied 2026-11-26 from the product repo's `main` (no commit hash was
given; the files' SHA-256s were checked against the list sent with them):
theme.css `45817a54…`, theme-switch.html `32eab147…`, footer.html
`dbabb167…`, theme.js `a6ea54be…` (unchanged). The 0rwx badges in
`static/0rwx/` are byte-identical to 0rwx.com's, released into the public
domain (CC0).

## AI labels on posts

Every post carries exactly one 0rwx tag, written exactly as `AI:0`, `AI:R`,
`AI:W` or `AI:X`, conventionally first in `tags`. The post page shows the
matching badge (images in `static/0rwx/`, CC0 from 0rwx.com).
`scripts/check-ai-tags.py` enforces this in CI before the build, drafts
included; run it locally the same way.
