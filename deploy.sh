#!/bin/sh

rm -rf ./dist
mkdir dist
cd api
bundle install
JEKYLL_ENV=production bundle exec jekyll build --config _config.yml,_config-production.yml || exit
md5=$(md5sum "./_site/css/main.css" | cut -d ' ' -f 1)
sed -i ''  "s/\/css\/main.css/\/api\/css\/main.css?v=$md5/g" ./_layouts/default.html || exit
JEKYLL_ENV=production bundle exec jekyll build --config _config.yml,_config-production.yml || exit
cd ..
mkdir dist/api
#mv api/_site/assets api/_site/scripts api/_site/images api/_site/search api/_site/favicon.ico api/_site/apple-touch-icon.png api/_site/launcher.png api/_site/robots.txt api/_site/index.html dist/api/
mv api/_site/* dist/api/

cd developers
yarn install
yarn build
cd ..
mv developers/dist dist/developers

rsync -rcv dist/* one@mixin-developers:html/
git reset --hard
