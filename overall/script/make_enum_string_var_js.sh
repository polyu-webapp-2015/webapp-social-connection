#!/usr/bin/env bash
echo '/** @remark this is auto-generated file, do not edit */'
cat ../webapp-server/app/models/idl/social_connection/$1Enum.java | grep 'final' | grep 'idl' | awk '{print "var _" $5 " = \"" $5 "\";"}'
echo ''
echo 'var '$1'Enum = [];'
echo $1Enum'.push("'$1'");'
cat ../webapp-server/app/models/idl/social_connection/$1Enum.java | grep 'final' | grep 'idl' | awk '{print $5}' | xargs -I {} echo $1'Enum.push(_'{}');'
