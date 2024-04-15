#! /usr/bin/env bash

# Install the certificates database
mkcert -install

# Create the certificate for localhost
mkcert localhost