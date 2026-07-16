#!/bin/sh
set -eu

# Renders www/js/config.js from config.js.template using environment
# variables, at container startup. This is what lets deployment-specific
# values (your Jellyfin server URL, Wizarr URL, display name) be set via
# `docker run -e ...` / docker-compose `environment:` / an Unraid
# Community Apps template, instead of being baked into the image or
# committed to git.

: "${JELLYFIN_SERVER_URL:=https://jellyfin.yourdomain.com}"
: "${WIZARR_URL:=https://invites.yourdomain.com}"
: "${SERVER_NAME:=My Jellyfin Server}"

export JELLYFIN_SERVER_URL WIZARR_URL SERVER_NAME

envsubst '${JELLYFIN_SERVER_URL} ${WIZARR_URL} ${SERVER_NAME}' \
  < /usr/share/nginx/html/js/config.js.template \
  > /usr/share/nginx/html/js/config.js

echo "config.js rendered with JELLYFIN_SERVER_URL=${JELLYFIN_SERVER_URL}"
