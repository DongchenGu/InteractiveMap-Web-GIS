FROM node:16-alpine as builder

WORKDIR /create-react-app/
ADD . /create-react-app/
ADD package.json package-lock.json  /create-react-app/

RUN npm -g install npm@6.x
RUN npm ci
RUN  npm run build

FROM nginx:alpine
COPY --from=builder /create-react-app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY  private.key  /etc/ssl/private.key
COPY  mapmarker.net.crt  /etc/ssl/certificate.crt
COPY  nginx.conf  /etc/nginx/conf.d/default.conf







