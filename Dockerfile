# Dockerfile
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install -g typescript ts-node

COPY . .

RUN tsc

EXPOSE 3000

CMD [ "node", "dist/server.js" ]
