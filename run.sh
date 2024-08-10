#!/bin/bash

mujs es5/index.js > docs/mujs.json
qjs es5/index.js > docs/qjs.json
llrt es5/index.js > docs/llrt.json
# node es5/index.js > assets/node.json
# tjs run es5/index.js > tjs.json