#!/bin/bash

clear

echo "****** jade transformation : START ******"
echo "Folder: app/jade to app/views"
jade-amd --from app/jade/ --to app/views/

for folderName in $(ls -d -- app/control/*/)
do
  echo "Folder: $folderName"
  jade-amd --from $folderName --to $folderName
done

echo "****** jade transformation : END ******"

exit 0