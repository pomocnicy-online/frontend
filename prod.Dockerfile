FROM node:carbon as builder

WORKDIR /usr/src/app/

COPY ./package.json ./

RUN npm install
COPY . .
RUN npm run build

FROM nginx

COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf
COPY --from=builder /usr/src/app/dist /build