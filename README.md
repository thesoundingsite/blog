# blog.thesounding.site

Zola site. `nix develop` for a shell with zola (`zola serve` to preview);
`nix build` renders the site into `./result`. Pushes to `main` deploy to
GitHub Pages via `.github/workflows/pages.yml`.

## Shared theme

`static/theme.css`, `static/theme.js` and the appearance control's markup in
`templates/base.html` (the `data-theme-switch` group) are verbatim copies from
the Sounding product repo, which owns them. Don't edit them here; changes go
there and are copied back.

Copied from: `public/web/src/theme.css`, `public/web-rs/prefs/theme.js`,
`public/web-rs/prefs/theme-switch.html` at commit 2729f93.

The footer markup inside `<footer class="site-footer">` is the English render
of the `PageFooter` component, and `static/theme.css` was refreshed with its
styles, from branch `wip/shared-footer` at commit 5eed1bf (to be updated to
the `main` commit once merged). The badge images in `static/0rwx/` are
byte-identical to 0rwx.com's, released into the public domain (CC0).

## AI labels on posts

Every post carries exactly one 0rwx tag, written exactly as `AI:0`, `AI:R`,
`AI:W` or `AI:X`, conventionally first in `tags`. The post page shows the
matching badge (images in `static/0rwx/`, CC0 from 0rwx.com).
`scripts/check-ai-tags.py` enforces this in CI before the build, drafts
included; run it locally the same way.
