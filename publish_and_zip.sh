#!/bin/bash

# Define the directories to be zipped
DIRECTORY1="./dist"
DIRECTORY2="./i18n"
DIRECTORY3="./node_modules"
DIRECTORY4="./package.json"
DIRECTORY5="./source/static"

# Define the name of the zip file and the temporary directory
ZIP_FILE_NAME="./build/sprite_effect.zip"
ZIP_DIR=$(dirname "$ZIP_FILE_NAME")
ROOT_FOLDER_NAME="sprite_effect"
TEMP_DIR="./temp_zip"

# Clean up the temporary directory
rm -rf "$ZIP_DIR"

# Create a temporary directory and the desired root folder structure within it
mkdir -p "$ZIP_DIR"

# Create the zip file from the temporary directory while preserving the new root folder structure
zip -r "$ZIP_FILE_NAME" "$DIRECTORY1" "$DIRECTORY2" "$DIRECTORY3" "$DIRECTORY4" "$DIRECTORY5"

echo "Zipped directories into $ZIP_FILE_NAME with root folder $ROOT_FOLDER_NAME"