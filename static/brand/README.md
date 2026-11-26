# brand/ — the Sounding icons and the wordmark's typeface

Every Sounding site ships this directory beside its copy of `theme.css`
(`wasm/join/brand/`, `wasm/pages/brand/`, the free page's `wasm/brand/`),
because the paid pages' Content-Security-Policy takes images and fonts from
their own origin alone. The logo itself is not a file here: it is inline SVG
in `../src/brand.rs`, coloured from the theme's tokens so it follows the
appearance choice, which an `<img>` cannot.

| File | What it is |
|---|---|
| `favicon.svg` | The tab icon: the plain S. Follows the system's light or dark scheme through its own media query (an icon cannot see the page's choice). |
| `favicon.ico`, `favicon-16.png`, `favicon-32.png` | The same S on a light tile, for browsers that skip the SVG. |
| `apple-touch-icon.png` | 180 px, the full logo on a light square, for a phone's home screen. |
| `SpaceGrotesk-thesounding.woff2` | Space Grotesk cut down to the wordmark's letters (below). |
| `OFL.txt` | Space Grotesk's licence, the SIL Open Font License 1.1. |

The icons are the brand set built from the logo, copied unmodified.

## The font file

The wordmark, `thesounding.site`, is never translated, so the font carries
only its letters (t h e s o u n d i g) at weights 400 to 600: 2,020 bytes,
where the whole family is 136,676. Any other character falls back to the
system font, which is the point: nothing else on the sites is set in it.

Made 2026-11-26 from google/fonts commit `00a38a53f92aef923b9353f40128e8f4552ddae4`,
`ofl/spacegrotesk/SpaceGrotesk[wght].ttf` (sha256
`acad6de1fc93436f5c0f1f4137751ef04f1aea3063e7036535970ffcfbd79f72`), with
fonttools 4.63.0 from nixpkgs:

    fonttools varLib.instancer -o limited.ttf 'SpaceGrotesk[wght].ttf' wght=400:600
    pyftsubset limited.ttf --text=thesounding --layout-features=kern,liga \
      --no-hinting --desubroutinize --flavor=woff2 \
      --output-file=SpaceGrotesk-thesounding.woff2

The licence names no Reserved Font Name, so the cut-down file may keep the
family's name. Its internal name table still says "Space Grotesk Light", the
instancer's leftover; `theme.css` names the family itself, so nothing reads it.
