# Yggdrasil
## The Norse tree of life, connecting the nine worlds
## or  a global, npm-based, no-root package manager.
### Installation
Install it using `npm i -g yggdrasil-pm`.
Then, run `ygg init` or `yggdrasil init` to create the ~/node-executables folder and add it to your PATH and source your ~/.profile.
I would recommend that, if you really want to be safe, run after that:
```shell-session
$ ygg install yggdrasil-pm
$ sudo npm uninstall -g yggdrasil-pm
```
This is so that it is installed under your home directory with no root access.
### Usage
```
ygg [command]

Commands:
  ygg init           Initialize ~/node-executables
  ygg install [pkg]  Install pkg.
  ygg remove [pkg]   Remove pkg.
  ygg update [pkg]   Upgrade pkg, or all packages, using david
  ygg check-update   Check for updates using david

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```
### Looking for a JS API?
[gi-joe](https://npmjs.com/package/gi-joe) is the package for you. It does, however, need yggdrasil pre-installed (it does not automatically install it) on the machine you are running it on.
