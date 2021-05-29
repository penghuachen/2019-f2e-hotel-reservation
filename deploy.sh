#!/usr/bin/env sh
# 執行腳本 sh ./deploy.sh
# 當發生錯誤時終止腳本運行
set -e

# 打包
yarn build

# 移動至到打包後的dist目錄 
cd dist

git init
git add -A
git commit -m 'deploy'


# 部署到 https://penghuachen.github.io/F2EWeek6
git push -f git@github.com:penghuachen/f2e-hotel-reservation.git main:gh-pages

cd -