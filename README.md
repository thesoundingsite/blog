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
