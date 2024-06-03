FROM node:20.14.0-alpine3.20 as base

WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm config list \
    && npm ci --force \
    && npm cache clean --force

FROM base as build

COPY . .
RUN npm run build

FROM nginx:1.27.0-alpine3.19

RUN apk add dumb-init

COPY nginx-default.conf /etc/nginx/conf.d/nginx-default.tmpl
COPY ./src/ /home/nginx/
COPY nginx-start.sh /usr/local/bin/nginx-start.sh
COPY ./nginx.conf /etc/nginx/nginx.conf
RUN chmod +x /usr/local/bin/nginx-start.sh
COPY --from=build /usr/src/app/dist/blockchain-shop-front-shell/ /usr/share/nginx/html
RUN chown -R nginx:nginx /usr/share/nginx/html && chmod -R 755 /usr/share/nginx/html && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid

WORKDIR /home/nginx
EXPOSE 8080

ENTRYPOINT ["dumb-init", "--"]

CMD ["/usr/local/bin/nginx-start.sh"]
