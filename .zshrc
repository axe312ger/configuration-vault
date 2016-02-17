## ZSH Config
############################################################

# Custom custom folder
ZSH_CUSTOM=~/.zsh/custom

# Theme
ZSH_THEME="bullet-train"

# Set sublime as default editor
export EDITOR='subl -w'

# Aliases
. .zsh_aliases


## Zsh Extensions
############################################################

# z - cd is lame - https://github.com/rupa/z
. ~/.zsh/submodules/z/z.sh

# zsh autosuggestions - https://github.com/tarruda/zsh-autosuggestions
. ~/.zsh/submodules/zsh-autosuggestions/zsh-autosuggestions.zsh

# scmpuff - https://mroth.github.io/scmpuff/
eval "$(scmpuff init -s)"

## Package Managers
############################################################

# Node Version Manager
export NVM_DIR=~/.nvm
. $(brew --prefix nvm)/nvm.sh

nvm use stable

# Ruby Version Manager
export PATH="$PATH:$HOME/.rvm/bin"


# PHP & Composer
alias composer='php /usr/local/bin/composer'
export PATH="$PATH:$HOME/.composer/vendor/bin"
export PATH="$PATH:$HOME/usr/local/opt/php56/bin"
