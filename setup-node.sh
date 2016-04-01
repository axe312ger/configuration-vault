#!/bin/bash

# Install NVM
if which nvm >/dev/null
then
  echo "NVM is already installed."
else
  echo "Installing NVM..."
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
  source ~/.zshrc
fi

# Install Node & NPM
if which node >/dev/null
then
  echo "Node is already installed."
else
  echo "Installing current stable Node version including NPM..."
  nvm install stable
fi

npm install -g babel-core diff-so-fancy eslint git-stats knex npm-check-updates wifi-password
