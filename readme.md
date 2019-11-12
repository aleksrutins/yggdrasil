# Yggdrasil
## The Norse tree of life, connecting the nine worlds
## or  a global, yarn-based, no-root package manager.
### Installation
Install it using `npm i -g yggdrasil-pm`.
Then, run `ygg init` or `yggdrasil init` to create the ~/node-executables folder and add it to your PATH and source your ~/.profile.
### Usage
```
ygg [command]

Commands:
  ygg init           Initialize ~/node-executables
  ygg install [pkg]  Install pkg using yarn.
  ygg remove [pkg]   Remove pkg.
  ygg upgrade [pkg]  Upgrade pkg, or all packages, using david

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```
### Prerequisites
You need to have [Node.JS](https://nodejs.org) and [Yarn](https://yarnpkg.org) installed.
