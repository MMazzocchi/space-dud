#!/usr/bin/bash

src_dir=./client/src/
js_dir=./client/js

if [[ ! -e $js_dir ]]
then
  mkdir $js_dir
fi

for src_file in $src_dir/*.js
do
  file_name=$(basename $src_file)
  class_name=$(basename $src_file .js)

  echo "Generating class for $class_name..."

  browserify -s $class_name -e $src_dir/$file_name -o $js_dir/$file_name
done
