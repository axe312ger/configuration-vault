## ZSH Config
############################################################

# Custom custom folder
ZSH_CUSTOM="$CONFIG_VAULT_PATH/zsh/custom"

# Theme
ZSH_THEME="bullet-train"

# Set sublime as default editor
export EDITOR='subl -w'

# Aliases
. "$CONFIG_VAULT_PATH/dotfiles/.zsh_aliases"


## ZSH Extensions
############################################################

# z - cd is lame - https://github.com/rupa/z
. "$CONFIG_VAULT_PATH/zsh/submodules/z/z.sh"

# zsh autosuggestions - https://github.com/tarruda/zsh-autosuggestions
. "$CONFIG_VAULT_PATH/zsh/submodules/zsh-autosuggestions/zsh-autosuggestions.zsh"

# scmpuff - https://mroth.github.io/scmpuff/
eval "$(scmpuff init -s)"

## Custom binary path
############################################################
export PATH="$PATH:`echo ~`/bin"
