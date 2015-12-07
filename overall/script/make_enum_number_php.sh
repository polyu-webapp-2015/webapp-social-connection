#!/usr/bin/env bash
echo '<?php'
echo 'class '$1'Enum'
echo '{'
echo '    const _ = "'$1'";'
cat ../webapp-server/app/models/idl/social_connection/$1Enum.java  | grep 'final' | grep -v idl | sed 's/public static final int/const/g'
#cat ../webapp-server/app/models/idl/social_connection/$1Enum.java | grep 'final' | grep 'idl' | awk '{print "    const _"$5" = \""$5"\";" }'
echo '}'