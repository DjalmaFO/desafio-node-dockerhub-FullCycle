FROM node:15 AS build

WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get install -y wget netcat && \
    wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
    chmod +x /usr/bin/wait-for

COPY package*.json ./

RUN npm install

COPY . .