#!/usr/bin/env bash
echo 'var '$1'Enum = function () {'
echo '    this._ = "'$1'";'
cat ../webapp-server/app/models/idl/social_connection/$1Enum.java  | grep 'final' | grep -v idl | sed 's/public static final int /  this./g'
#cat ../webapp-server/app/models/idl/social_connection/$1Enum.java | grep 'final' | grep 'idl' | awk '{print "    this._"$5" = \""$5"\";" }'
echo '};'