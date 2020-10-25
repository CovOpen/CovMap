#!/bin/bash

# Base URL WITHOUT trailing slash
REPOSITORY_BASE_URL=https://api.github.com/repos/CovOpen/CovMapper

request_url="$REPOSITORY_BASE_URL/releases/latest"
request=$(curl -s $request_url)
url=$(echo $request | jq -r '.assets[] | select(.name == "release.zip") | .browser_download_url')

release=$(echo $request | jq .tag_name)
echo "======================================"
echo "Found Release: $release"
echo "Download from: $url"
echo "======================================"

UNZIP_PATH=./unziped
wget -O release.zip $url
unzip -o release.zip -d $UNZIP_PATH
