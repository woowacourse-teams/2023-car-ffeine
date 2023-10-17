#!/bin/bash

BEFORE_PORT=$1
NEW_PORT=$2
NEW_ACTUATOR_PORT=$3

echo "기존 포트 : $BEFORE_PORT"
echo "새로운 포트: $NEW_PORT"
echo "새로운 ACTUATOR_PORT: $NEW_ACTUATOR_PORT"

count=0
for count in {0..20}
do
  echo "서버 상태 확인(${count}/20)";

  UP=$(curl -s http://127.0.0.1:${NEW_ACTUATOR_PORT}/actuator/health-check)

  if [ "${UP}" != '{"status":"up"}' ]
  	then
  		sleep 10
  		continue
  	else
  		break
  fi
done

if [ $count -eq 20 ]
then
	echo "새로운 서버 배포를 실패했습니다."
	exit 1
fi

export BACKEND_PORT=$NEW_PORT
envsubst '${BACKEND_PORT}' < backend.template > backend.conf
sudo mv backend.conf /etc/nginx/conf.d/
sudo nginx -s reload

if sudo docker ps | grep ${BEFORE_PORT}; then
  sudo docker stop $(docker ps -q --filter "expose=${BEFORE_PORT}")
fi

sudo docker container prune -f
