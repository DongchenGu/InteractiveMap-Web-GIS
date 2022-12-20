FROM node:15-alpine as builder

WORKDIR /create-react-app
ADD . /create-react-app
ADD package.json package-lock.json  /create-react-app
RUN npm install --legact-peer-deps
RUN npm ci
RUN  npm run build

FROM nginx:alpine
COPY --from=builder /create-react-app/build /usr/share/ngnix/html





