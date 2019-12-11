# npm install || exit
npm run build || exit
scp -r ./dist/* lapsed@118.24.121.133:/var/nginx/webs/test-mixin
# mv ./dashboard ../../dist/