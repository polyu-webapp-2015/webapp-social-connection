#!/bin/bash
while [ true ]
do
  ./activator ui -Dhttp.address=0.0.0.0 -Dhttp.port=8888
  echo waiting to restart
  sleep 2
done
