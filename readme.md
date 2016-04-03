# Configuration Vault

> This repo is intended to store all configs that contain
> all basics for a proper web developer workstation.
> All main system config files are kept in a single folder and repository. Version management for your workstation.

This started as an opinionated default config, currently it transforms to a somehow flexible solution. Contribution is very welcome.

Most of the bash-scripts are currently OS X only, the universal installer might be useful for any package manager. Let's see how it evolves.

This is **not** intended to overwrite any dotfiles in your home directory.
When attaching an import statement to your original dotfile is not possible, it is renamed and replaced with a symlink into this repo.

So storing and version controlling all your system config shouldn't be a big hussle anymore.

## Basic setup

1. Clone this repo somewhere on your machine
2. Have a look what the scripts are doing, it is WIP but mostly commented.
3. Run `$ ./setup-configuration-vault.sh` to setup minimal configurations.

## Environment configuration

4. Run `$ ./setup-zsh.sh` to setup and configure zsh including oh-my-zsh and the bullet-train theme with custom font & colorscheme.
5. Run `$ ./setup-git.sh` to setup an extended git workflow with proper diffing, adding and hightlighting.
6. Run `$ ./setup-brew.sh` to install basic brew packages and tap brew casks
7. Run `$ ./setup-node.sh` to setup nvm, install node and basic node packages
8. Run `$ ./setup-ruby.sh` to install ruby with ruby on rails

## Install packages and GUI software

9. You can even install browser extensions and end user software from the appstore or brew casks. Run `$ ./run-universe-installer.sh` to start the universe installer. See below for more informations.



### Universe Installer

```
$ ./run-universe-installer.sh
```

Runs the universe installer. The idea is to provide an interactive form to select packages from several package managers. This includes `npm`, `brew cask`, browser extensions, the `App Store` and offers many more options.

It basically collects package names by user interaction and runs the corresponding CLI commands afterwards.

**@ToDo:** Add screen capture gif

## Specific software hints

### Configure iTerm

> Here we need to do some stuff manually, luckily the config contains almost everything you need.

1. Open iTerm 2
2. Go To: `Preferences > General`
3. Look for: `Preferences`
4. Select `Load preferences from a custom folder or URL:
5. Click `Browse` and select the `iTerm` folder within this repo.
6. Install the `Sauce Code Pro` font, it is located within the `iTerm` folder.

### Configure Sublime Text

1. Install Package Control -> <https://packagecontrol.io/installation>
2. Install your packages. Automatism is coming soon!

## License

Code and documentation is released under the MIT license. See [here](https://github.com/axe312ger/configuration-vault/blob/master/LICENSE)

## Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/axe312ger/configuration-vault/issues/new).
