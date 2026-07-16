# Vendored dependencies

This folder holds third-party JS libraries downloaded locally instead of
loaded from a CDN, matching the self-hosted spirit of this project.

## qrcode.min.js

QR code generator by Kazuhiko Arase (MIT licensed).
https://github.com/kazuhikoarase/qrcode-generator

This file is **not committed to git** and is **not present in this folder
in the repo**. It's fetched automatically during the Docker build (see the
`RUN wget ...` step in the `Dockerfile`), so every image — whether built by
CI or locally — always has an up-to-date copy baked in.

For local development *outside* Docker (e.g. `python3 -m http.server` in
`www/`), fetch it manually once:

    curl -o www/js/vendor/qrcode.min.js \
      https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.0.3/qrcode.min.js
