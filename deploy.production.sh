#!/bin/sh

rm -rf ./dist
mkdir dist

git pull

cd developers
yarn install && yarn build
cd ..
mv developers/dist dist/developers

cd developers-docs
yarn install && yarn build
cd ..
mv developers-docs/build dist/developers-docs

SUM=`md5 -q dist/developers/index.html`
mv dist/developers/index.html dist/developers/index.$SUM.html

cp app.one.yaml dist/app.yaml
sed -i ''  "s/index.html/index.$SUM.html/g" dist/app.yaml || exit
cd dist && gcloud app deploy app.yaml
