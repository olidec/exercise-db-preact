
FROM ubuntu:latest

WORKDIR /scripts

RUN apt update -y && apt install -y openssl

ENTRYPOINT ./self-signed.sh