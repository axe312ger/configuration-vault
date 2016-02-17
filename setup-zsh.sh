#!/bin/bash
CWD=`pwd`

# Make sure zsh is installed
if ! which zsh >/dev/null
then
  echo "Zsh needs to be installed before you run this script!"
  exit
fi

# Install Oh My Zsh
echo "Installing Oh My Zsh..."
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

# Create sym links in user directory to keep config in git and paths simple
cd ~
ln -s $CWD/.zsh .zsh
ln -s $CWD/.zshrc .zshrc
ln -s $CWD/.zsh_aliases .zsh_aliases
