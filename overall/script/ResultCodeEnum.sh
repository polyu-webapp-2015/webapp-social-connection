#!/usr/bin/env bash
echo '<?php'
echo 'class ResultCodeEnum'
echo '{'
echo '  const _ = "resultCode";'
cat ../webapp-server/app/models/idl/social_connection/ResultCodeEnum.java  | grep 'final' | grep -v idl | sed 's/public static final int/const/g'
echo '}'