#!/bin/sh

rm -rf ./dist
mkdir dist

git merge main

cd developers
yarn install && yarn build

rsync -rcv dist/* mixinstagingnew:developers.mixin.one

# SUM=`md5 -q dist/developers/index.html`
# mv dist/developers/index.html dist/developers/index.$SUM.html
