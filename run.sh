#!/bin/bash

mujs es5/index.js > assets/mujs.json
qjs es5/index.js > assets/qjs.json
# node es5/index.js > assets/node.json
# tjs run es5/index.js > tjs.json