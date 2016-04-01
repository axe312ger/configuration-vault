#!/bin/bash
CWD=`pwd`

# Make sure zsh is installed
if ! which zsh >/dev/null
then
  echo "Zsh needs to be installed before you run this script!"
  exit
fi

# Set zsh as default shell
chsh -s /bin/zsh

# Install Oh My Zsh
if [ ! -d ~/.oh-my-zsh ]
then
  echo "Installing Oh My Zsh..."
  sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
fi

# Inject our custom configuration into the default .zshrc
if ! grep -q "export CONFIG_VAULT_PATH" ~/.zshrc
then
  echo "Injecting zsh config into your user .zshrc file."
  echo -e "\n\n# Custom settings should be put into the following file instead of here" >> ~/.zshrc
  echo "export CONFIG_VAULT_PATH=\"$CWD\"" >> ~/.zshrc
  echo ". \"\$CONFIG_VAULT_PATH/.zshrc\"" >> ~/.zshrc

  # @todo the sourcing must happen BEFORE `source $ZSH/oh-my-zsh.sh`, otherwise the theme and more settings are ignored

  source ~/.zshrc
fi
