#!/bin/sh

cd api
bundle install
JEKYLL_ENV=production bundle exec jekyll build --config _config.yml,_config-production.yml || exit
cd ..
mkdir dist/api
#mv api/_site/assets api/_site/scripts api/_site/images api/_site/search api/_site/favicon.ico api/_site/apple-touch-icon.png api/_site/launcher.png api/_site/robots.txt api/_site/index.html dist/api/
mv api/_site/* dist/api/

cd developers
yarn install
yarn build
cd ..
mv dashboard/dist dist/developers

rsync -rcv dist/* one@mixin-developers:html/
