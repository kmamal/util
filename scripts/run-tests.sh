#!/usr/bin/env bash

set -eEu -o pipefail

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

echo DIR $DIR ${BASH_SOURCE[0]}

cd "$DIR/.."

shopt -s globstar nullglob
node node_modules/@kmamal/testing src/**/*.test.js
