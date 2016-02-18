#!/bin/bash

# Install Homebrew
if which brew >/dev/null
then
  echo "Homebrew is already installed."
else
  echo "Installing Homebrew..."
  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
fi

# Make sure we’re using the latest Homebrew
brew update

# Upgrade any already-installed formulae
brew upgrade

# Tap services addon
brew tap homebrew/services

# Essentials
brew install zsh
brew install trash
brew install gnu-sed --default-names

# Git workflow helpers
brew install scmpuff #https://mroth.github.io/scmpuff/
brew install diff-so-fancy #https://github.com/so-fancy/diff-so-fancy

# Image & video manipulation
brew install graphicsmagick
brew install ffmpeg --with-libvpx
