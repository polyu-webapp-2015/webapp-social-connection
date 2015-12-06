#!/bin/bash
while [ true ]
do
  ./activator run -Dhttp.address=0.0.0.0 -Dhttp.port=9000
  echo waiting to restart
  sleep 2
done
