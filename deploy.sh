#!/bin/sh

rm dist/*
npm run dist || exit

rsync -rcv dist/* one@mixin-developers:html/
