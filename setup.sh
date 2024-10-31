#!/bin/bash

if [ "$#" -gt 0 ]; then
    bash <(curl -s https://miguelcarino.github.io/SimpleSetup/setup.sh "$@")
else
    bash <(curl -s https://miguelcarino.github.io/SimpleSetup/setup.sh)
fi
