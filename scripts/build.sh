#!/usr/bin/bash

src_files="./client/src/DisplayConnection.js \
           ./client/src/ControllerConnection.js"
js_dir=./client/js

if [[ ! -e $js_dir ]]
then
  mkdir $js_dir
fi

for src_name in $src_files
do
  class_name=$(basename $src_name .js)

  echo "Generating class for $class_name..."

  browserify -s $class_name -e $src_name -o $js_dir/$class_name.js
done
