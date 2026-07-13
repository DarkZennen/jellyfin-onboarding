# Vendored dependencies

This folder holds third-party JS libraries downloaded locally instead of
loaded from a CDN, matching the self-hosted spirit of this project.

## qrcode.min.js

QR code generator by Kazuhiko Arase (MIT licensed).
https://github.com/kazuhikoarase/qrcode-generator

This machine's sandbox has no internet access, so this file is a
placeholder. Fetch the real one on a machine with internet access:

    curl -o www/js/vendor/qrcode.min.js \
      https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.0.3/qrcode.min.js

Then confirm it's populated (should be a few KB, not empty) and you're set —
index.html already points at this local path.
