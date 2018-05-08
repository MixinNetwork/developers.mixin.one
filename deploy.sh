#!/bin/sh

rm -r dist/*
npm run dist || exit

cd api
JEKYLL_ENV=production bundle exec jekyll build --config _config.yml,_config-production.yml || exit
cd ..
mkdir dist/api
mv api/_site/css api/_site/js api/_site/images api/_site/search api/_site/favicon.ico api/_site/robots.txt api/_site/index.html dist/api/

rsync -rcv dist/* one@mixin-developers:html/
