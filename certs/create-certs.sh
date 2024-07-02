#! /usr/bin/env bash

# Dieses Skript erzeugt die Zertifikate die für SSL verwendet werden.

ROOT_KEY=ca.key
ROOT_PEM=ca.pem
WEBSITE_KEY=exdb.local.key
WEBSITE_CSR=exdb.local.csr
WEBSITE_CERT=exdb.local.crt
WEBSITE_CONFIG=exdb.local.ext

# Generate the private key to become a tiny CA
openssl genrsa -aes256 -out ${ROOT_KEY} 2048

# Generate the root certificate
openssl req -x509 -new -nodes -key ${ROOT_KEY} -sha256 -days 1825 -out ${ROOT_PEM} \
    -subj "/CN=exdb.local/C=CH/L=Muttenz" \

# Generate a private key for the dev website
openssl genrsa -out ${WEBSITE_KEY} 2048

# Generate the CSR for the Website
openssl req -new -key ${WEBSITE_KEY} -out ${WEBSITE_CSR} \
    -subj "/CN=exdb.local/C=CH/L=Muttenz" \

# Create the client certificate using all of the above
openssl x509 -req -in ${WEBSITE_CSR} -CA ${ROOT_PEM} -CAkey ${ROOT_KEY} \
    -CAcreateserial -out ${WEBSITE_CERT} -days 825 -sha256 -extfile ${WEBSITE_CONFIG}

# Create a directory that will be mounted in the proxy, that contains the
# website certificates.
mkdir -p client/certs
mkdir -p client/private
cp ${WEBSITE_CERT} client/certs/
cp ${WEBSITE_KEY} client/private/