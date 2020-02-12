yarn build || exit
scp -r ./dist/* liu:/var/nginx/webs/test-mixin