# BLADE Runtime

Frontend preview loads **only the airport-builder module**.

## GitHub Pages

After the Pages workflow on `main` finishes:

https://dad2lna-coder.github.io/BLADE-Runtime/

Repo is private. If the site 404s, either make the repo public or enable Pages in Settings → Pages (GitHub Actions source). You can also open `index.html` locally.

## What this build does

- Console shell
- Terminal / checkpoint / modset / bag-site editor
- Flat checkpoints tagged with `terminalId`
- Positional modsets, explicit AIT, CT lanes
- CBRA / OS / OSRA rooms (seats only)
- Export / import `airfield.json` (`blade.airfield.v2`)
- Warn-not-block on window mismatches; block only on empty modset/lanes
