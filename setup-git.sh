#!/bin/bash
CWD=`pwd`

# Create sym links in user directory to keep config in git and paths simple
mv ~/.gitconfig ~/.gitconfig_backup
mv ~/.gitignore_global ~/.gitignore_global_backup

cd ~
ln -s $CWD/.gitconfig .gitconfig
ln -s $CWD/.gitignore_global .gitignore_global
