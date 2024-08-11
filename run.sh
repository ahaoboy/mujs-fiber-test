#!/bin/bash

mujs es5/index.js > docs/mujs.json
qjs es5/index.js > docs/qjs.json
llrt es5/index.js > docs/llrt.json

# TODO: boa only run es6
# https://github.com/boa-dev/boa/issues/3518
boa dist/index.js > docs/boa.json

# node es5/index.js > assets/node.json
# tjs run es5/index.js > tjs.json