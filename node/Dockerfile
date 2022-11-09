FROM node:15

WORKDIR /usr/src/app

COPY . .

RUN apt-get update && \
    apt-get install -y wget netcat && \
    npm install && \
    wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
    chmod +x /usr/bin/wait-for
