#!/bin/bash

## Init submodules. Often forgotten, but important!
git submodule update --init --recursive

## Create folder for custom binaries
mkdir ~/bin

## Install command line tools
gcc