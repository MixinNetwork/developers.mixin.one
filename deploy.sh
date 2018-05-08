#!/bin/sh

rm -r dist/*
npm run dist || exit

cd api
bundle exec jekyll build || exit
cd ..
mkdir dist/api
mv api/_site/css api/_site/js api/_site/images api/_site/search api/_site/favicon.ico api/_site/robots.txt api/_site/index.html dist/api/

rsync -rcv dist/* one@mixin-developers:html/
