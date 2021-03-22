npm run build;
docker build -t registry.cn-chengdu.aliyuncs.com/bailei/alt:vuepage-builder . ;
docker push registry.cn-chengdu.aliyuncs.com/bailei/alt:vuepage-builder;
docker system prune -f;
docker images;
ssh root@129.204.64.9 -t "~/bin/update.sh"