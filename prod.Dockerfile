FROM node:carbon as builder

WORKDIR app/ 

COPY ./package.json ./

RUN npm install
COPY . .
RUN npm run build

FROM nginx

COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf