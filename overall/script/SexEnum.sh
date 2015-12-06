#!/usr/bin/env bash
echo '<?php'
echo 'class SexEnum'
echo '{'
echo '  const _ = "sex";'
cat ../webapp-server/app/models/idl/social_connection/SexEnum.java  | grep 'final' | grep -v idl | sed 's/public static final int/const/g'
echo '}'