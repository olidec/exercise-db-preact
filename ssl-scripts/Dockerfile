
FROM ubuntu:latest


# RUN adduser --disabled-password --gecos "" db-admin

# USER db-admin

WORKDIR /scripts

RUN apt update -y && apt install -y openssl

ENTRYPOINT ./self-signed.sh