FROM node:carbon as builder

WORKDIR /usr/src/app/

COPY package*.json ./
RUN npm install

CMD npm run serve