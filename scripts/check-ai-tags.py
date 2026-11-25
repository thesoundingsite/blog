#!/usr/bin/env python3
"""Fail if any post lacks exactly one 0rwx AI tag (AI:0, AI:R, AI:W, AI:X).

Every post states how AI was involved in writing it; the post page shows the
matching badge. Drafts are checked too, so a missing tag is caught before
publishing. Usage: scripts/check-ai-tags.py [content/posts]
"""
import pathlib
import sys
import tomllib

LEVELS = {"AI:0", "AI:R", "AI:W", "AI:X"}


def front_matter(path):
    text = path.read_text(encoding="utf-8")
    parts = text.split("+++", 2)
    if not text.startswith("+++") or len(parts) < 3:
        raise ValueError("no +++ TOML front matter")
    return tomllib.loads(parts[1])


def main():
    root = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "content/posts")
    errors = []
    posts = [p for p in sorted(root.rglob("*.md")) if p.name != "_index.md"]
    for post in posts:
        try:
            tags = front_matter(post).get("taxonomies", {}).get("tags", [])
        except (ValueError, tomllib.TOMLDecodeError) as e:
            errors.append(f"{post}: {e}")
            continue
        found = [t for t in tags if t in LEVELS]
        near = [t for t in tags if t not in LEVELS and t.lower().replace("-", ":") in {l.lower() for l in LEVELS}]
        if near:
            errors.append(f"{post}: write the AI tag exactly as one of {sorted(LEVELS)}, not {near}")
        elif len(found) != 1:
            errors.append(f"{post}: needs exactly one AI tag from {sorted(LEVELS)}, has {found or 'none'}")
    for e in errors:
        print(e, file=sys.stderr)
    print(f"checked {len(posts)} post(s), {len(errors)} problem(s)")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
