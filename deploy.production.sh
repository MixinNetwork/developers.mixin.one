rm -rf ./dist
mkdir dist

cd developers
yarn install && yarn build
cd ..
mv developers/dist dist/developers

gzip -k dist/developers/js/*.js
for old in dist/developers/js/*.js.gz; do mv $old dist/developers/js/`basename $old .js.gz`.js; done
gzip -k dist/developers/css/*.css
for old in dist/developers/css/*.css.gz; do mv $old dist/developers/css/`basename $old .css.gz`.css; done
SUM=`md5 -q dist/developers/index.html`
mv dist/developers/index.html dist/developers/index.$SUM.html

gsutil -h "Cache-Control:public, max-age=31536000" -h "Content-Encoding:gzip" -m cp dist/developers/css/*.css gs://developers.mixin.one/css/
gsutil -h "Cache-Control:public, max-age=31536000" -h "Content-Encoding:gzip" -m cp dist/developers/js/*.js gs://developers.mixin.one/js/
rm dist/developers/css/*.css dist/developers/js/*.js

gsutil -h "Cache-Control:public, max-age=31536000" -m cp -r dist/developers/* gs://developers.mixin.one
gsutil web set -m index.$SUM.html -e index.$SUM.html gs://developers.mixin.one
