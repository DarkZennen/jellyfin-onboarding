# ThatOneCloud

A polished onboarding wizard for Jellyfin, built to sit alongside Wizarr
and make joining a self-hosted media server painless for non-technical
friends and family.

See `ThatOneCloud_Project_Bible` for the full vision, roadmap, and
architecture notes.

## Quick start (Unraid / Docker)

1. Clone this repo onto your server:

   ```bash
   git clone https://github.com/DarkZennen/jellyfin-onboarding.git
   cd jellyfin-onboarding
   ```

2. Fetch the vendored QR code library (no CDN dependency at runtime):

   ```bash
   curl -o www/js/vendor/qrcode.min.js \
     https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.0.3/qrcode.min.js
   ```

3. Set your real URLs in `www/js/config.js`:

   ```js
   serverUrl:  "https://jellyfin.thatonecloud.com",
   wizarrUrl:  "https://onboard.thatonecloud.com",
   ```

4. Build and start the container:

   ```bash
   docker compose up -d --build
   ```

5. Point `watch.thatonecloud.com` at this container through Traefik
   (labels are already in `docker-compose.yml`, matching the `proxynet`
   network and `letsencrypt` cert resolver already used by Jellyfin).

## Local development / testing

Serve `www/` with any static file server, e.g.:

```bash
cd www
python3 -m http.server 5500
```

Then open `http://127.0.0.1:5500/`. To test the Wizarr invite flow,
append `?invite=SOMECODE` to the URL.

## Project layout

```
www/            static site (served by nginx in the container)
  index.html
  css/
  js/
  assets/
Dockerfile      nginx:alpine, serves www/
nginx.conf      static-site nginx config (gzip, caching, security headers)
docker-compose.yml   Traefik-labeled service definition
```

## Roadmap

See `ThatOneCloud_Project_Bible` for the versioned roadmap. Current
status: wizard flow (Welcome → Device → Install → Server → Finished)
complete, Wizarr invite handoff + QR codes complete, Docker/Traefik
deployment complete.
