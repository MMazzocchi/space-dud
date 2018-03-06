#!/usr/bin/bash

src_dir=./client/src/

src_files="$src_dir/DisplayConnection.js \
           $src_dir/ControllerConnection.js \
           $src_dir/KeyboardConnection.js \
           $src_dir/GamepadConnection.js"

dist_dir=./client/dist

if [[ ! -e $dist_dir ]]
then
  mkdir $dist_dir
fi

rm -f $dist_dir/*.js $dist_dir/*.map

for src_name in $src_files
do
  class_name=$(basename $src_name .js)

  echo "Generating class for $class_name..."

  browserify -s $class_name -e $src_name -o $dist_dir/$class_name.js
done

echo "Generating space-dud-client files..."

browserify -s SpaceDudClient \
           -e $src_dir/SpaceDudClient \
           -o $dist_dir/space-dud-client.js
