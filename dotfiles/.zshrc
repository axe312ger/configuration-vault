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

## Bullet Train oh my zsh theme configuration
############################################################
BULLETTRAIN_NVM_SHOW=true
BULLETTRAIN_EXEC_TIME_SHOW=true

BULLETTRAIN_GIT_PROMPT_CMD="\$(custom_git_prompt)"

custom_git_prompt() {
  prompt=$(git_prompt_info)
  prompt=${prompt//\//\ \ }
  prompt=${prompt//_/\ }
  echo ${prompt}
}

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
