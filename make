#!/usr/bin/env bash
git submodule init
git submodule update
cd public; bash ./make
cd ../overall; bash ./make
cd ../server; bash ./make
