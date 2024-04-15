#! /usr/bin/env sh

openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -subj "/CN=exdb.me.local/C=CH/L=Muttenz" \
    -keyout /etc/ssl/private/nginx-selfsigned.key \
    -out /etc/ssl/certs/nginx-selfsigned.crt