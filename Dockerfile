FROM nginx:1.27-alpine

COPY www/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -q -O /dev/null http://localhost/healthz || exit 1
