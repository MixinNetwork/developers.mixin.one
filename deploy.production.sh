#!/bin/sh

rm -rf ./dist
mkdir dist

git pull

cd developers-docs
pnpm install && pnpm build
cd ..
mv developers-docs/build dist/developers-docs

cd developers
pnpm install && pnpm build
cd ..
mv developers/dist dist/developers
cp -r dist/developers/assets/* dist/developers-docs/assets/

SUM=`md5 -q dist/developers/index.html`
#mv dist/developers/index.html dist/developers/index.$SUM.html

cp app.one.yaml dist/app.yaml
#sed -i ''  "s/index.html/index.$SUM.html/g" dist/app.yaml || exit
cd dist && gcloud app deploy app.yaml -q
