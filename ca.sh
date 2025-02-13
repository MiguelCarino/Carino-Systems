#!/bin/bash

if [ "$#" -gt 0 ]; then
    case $1 in
    *setup*)
        bash <(curl -s https://miguelcarino.github.io/SimpleSetup/setup.sh) "$@"
        ;;
    *vp9*)
        bash <(curl -s https://miguelcarino.github.io/SimpleTranscoding/simple.sh) "$@"
        ;;
    *av1*)
        bash <(curl -s https://miguelcarino.github.io/SimpleTranscoding/simple.sh) "$@"
        ;;
    *)
        echo "No valid option provided."
        ;;
    esac
else
    bash <(curl -s https://miguelcarino.github.io/SimpleSetup/setup.sh)
fi
