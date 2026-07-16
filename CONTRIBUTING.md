# Contributing to Jellyfin Onboarding

Thanks for considering a contribution! This project is intentionally small
and dependency-free, and contributions that keep it that way are especially
welcome.

## Before you start

For anything more than a small fix, please open an issue first to discuss
what you'd like to change. That avoids spending time on a PR that doesn't
fit the project's direction.

## Project philosophy

- **No build step.** This is plain HTML/CSS/JS, loaded directly by the
  browser. No bundlers, no transpilers, no npm dependencies in `www/`.
  Please keep it that way — it's what makes this easy to self-host and
  easy to read.
- **No backend.** Jellyfin Onboarding is a static site. Device detection, QR
  codes, and the Wizarr handoff all happen client-side. If your
  contribution needs a database or server-side logic, it's probably out
  of scope for this project (though feel free to propose it as a
  discussion — the architecture could evolve).
- **Every device path matters.** Changes to the wizard flow should be
  tested against at least: a mobile platform (Android or iOS), a desktop
  platform (Windows/macOS/Linux), and a TV platform (Roku/Fire TV/Android
  TV/Apple TV) via the "Not this device?" picker. These three categories
  behave differently (see `TV_PLATFORMS` / `MOBILE_PLATFORMS` in
  `www/js/config.js.template`) and it's easy to fix one path while
  silently breaking another.

## Local development

No build tooling needed to serve the site — but since deployment
config (`config.js`) is normally rendered from a template by Docker at
container startup (see `docker-entrypoint.d/40-render-config.sh`), you
need to render it once yourself for local testing outside Docker:

```bash
export JELLYFIN_SERVER_URL="https://jellyfin.yourdomain.com"
export WIZARR_URL="https://invites.yourdomain.com"
export SERVER_NAME="My Jellyfin Server"

envsubst '${JELLYFIN_SERVER_URL} ${WIZARR_URL} ${SERVER_NAME}' \
  < www/js/config.js.template > www/js/config.js
```

(No `envsubst`? It's part of the `gettext` package — `apt install
gettext` / `brew install gettext` / `dnf install gettext`, or just
hand-edit a copy of `config.js.template`, saved as `config.js`,
replacing the three `${...}` placeholders yourself.)

Then serve the folder:

```bash
cd www
python3 -m http.server 5500
```

Then open `http://127.0.0.1:5500/`. To test the Wizarr invite flow,
append `?invite=SOMECODE` to the URL. To test the `/j/{code}` URL format,
visit `http://127.0.0.1:5500/j/SOMECODE` (requires the page to be served
from the root, which the command above does).

The QR code library (`www/js/vendor/qrcode.min.js`) isn't committed to
the repo — fetch it once before testing locally:

```bash
curl -o www/js/vendor/qrcode.min.js \
  https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.0.3/qrcode.min.js
```

## Code style

- Match the existing style: one statement per line, blank lines between
  statements. It looks unusual at first but it's deliberate — it makes
  diffs in this project very easy to read at a glance.
- No semicolon-free style, no minification of source files.
- Prefer small, focused functions over clever one-liners.

## Testing your changes

There's no automated test suite yet (contributions adding one are very
welcome). At minimum, before opening a PR:

1. Open the browser console and confirm no errors on every step of the
   wizard, for at least one mobile, one desktop, and one TV platform.
2. Run `node --check` against any JS file you touched, to catch syntax
   errors early.
3. If you touched `Dockerfile` or `docker-compose.yml`, confirm
   `docker build .` still succeeds.

## Submitting a PR

- Keep PRs focused on one change. Unrelated fixes should be separate PRs.
- Describe what you tested (which device paths, which browsers).
- If your change is visual, a screenshot or short screen recording helps
  a lot.

## Reporting bugs

Open an issue with:
- What device/browser you were on
- Whether you came from a Wizarr invite link, a direct visit, or the
  device picker
- Console errors, if any (browser DevTools → Console tab)

Thanks again for contributing!
