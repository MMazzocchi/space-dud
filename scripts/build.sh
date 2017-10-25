#!/usr/bin/bash

src_files="./client/src/DisplayConnection.js \
           ./client/src/ControllerConnection.js \
           ./client/src/KeyboardConnection.js \
           ./client/src/GamepadConnection.js"
dist_dir=./client/dist

if [[ ! -e $dist_dir ]]
then
  mkdir $dist_dir
fi

for src_name in $src_files
do
  class_name=$(basename $src_name .js)

  echo "Generating class for $class_name..."

  browserify -s $class_name -e $src_name -o $dist_dir/$class_name.js
done
