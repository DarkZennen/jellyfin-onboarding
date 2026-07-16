FROM nginx:1.27-alpine

ARG VERSION=dev

COPY www/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN wget -q -O /usr/share/nginx/html/js/vendor/qrcode.min.js \
      https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.0.3/qrcode.min.js

RUN sed -i "s/\.css\"/.css?v=${VERSION}\"/g; s/\.js\"/.js?v=${VERSION}\"/g" \
      /usr/share/nginx/html/index.html

RUN chmod -R a+rX /usr/share/nginx/html/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -q -O /dev/null http://127.0.0.1/healthz || exit 1
