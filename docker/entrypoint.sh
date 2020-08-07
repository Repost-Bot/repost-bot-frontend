#!/bin/sh

ROOT_DIR=/usr/share/nginx/html

# Replace env vars in JavaScript files
echo "Replacing env constants in JS"
for file in $ROOT_DIR/js/*.js $ROOT_DIR/index.html;
do
  echo "Processing $file ...";

  sed -i 's|VUE_APP_API_BASE_URL|'${VUE_APP_API_BASE_URL}'|g' $file
  sed -i 's|VUE_APP_TITLE|'${VUE_APP_TITLE}'|g' $file

done

echo "Starting Nginx"
nginx -g 'daemon off;'