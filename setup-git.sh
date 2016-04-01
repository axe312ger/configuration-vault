#!/bin/bash
CWD=`pwd`

# Create sym links in user directory to keep config in git and paths simple
mv ~/.gitconfig ~/.gitconfig.bak
mv ~/.gitignore_global ~/.gitignore_global.bak

cd ~
ln -s "$CWD/.gitconfig" .gitconfig
ln -s "$CWD/.gitignore_global" .gitignore_global
