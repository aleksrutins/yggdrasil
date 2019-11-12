#!/usr/bin/env node
const command = require("command");
const path = require("path");
const fs = require("fs");
const {execFile, spawn, execSync} = require("child_process");
const ne = path.join(process.env.HOME, "node-executables");
var pwd = process.env.PWD;

function spawnConnect(cmd, args, opts) {
  let commd = spawn(cmd, args, opts);
  commd.stdout.on("data", command.writeTo(process.stdout));
  commd.stderr.on("data", command.writeTo(process.stderr));
  process.stdin.on("data", command.writeTo(commd.stdin));
  return commd;
}

require("yargs").command("init", "Initialize ~/node-executables", (yargs) => {}, async (argv) => {
  console.log(`Creating ${process.env.HOME}/node-executables`);
  execSync("mkdir -p $HOME/node-executables");
  console.log("Initializing with yarn init.");
  execSync("yarn init -yp", {cwd: ne});
  console.log("Installing david as a package updater.");
  execSync("yarn add david", {cwd: ne})
  fs.writeFileSync(path.join(process.env.HOME, ".profile"), "export PATH=$PATH:$HOME/node-executables/node_modules/.bin", {flags: "as"});
  console.log("Reloading configuration");
  execFile(path.join(process.env.HOME, ".profile"));
  console.log("Done! be sure to add the yggdrasil/bin directory to your PATH.")
}).command("install [pkg]", "Install pkg using yarn.", (yargs) => {
  yargs.positional('pkg', {
    type: "string",
    describe: "The package to be installed"
  });
}, (argv) => {
  let yarn = spawnConnect("yarn", ["add", argv.pkg], {cwd: ne});
  yarn.on("exit", process.exit);
}).command("remove [pkg]", "Remove pkg.", (yargs) => {
  yargs.positional("pkg", {
    type: "string",
    describe: "The package to be removed."
  });
}, (argv) => {
  let yarn = spawnConnect("yarn", ["remove", argv.pkg], {cwd: ne});
  yarn.on("exit", process.exit);
}).command("upgrade [pkg]", "Upgrade pkg, or all packages, using david", (yargs) => {
  yargs.positional("pkg", {
    type: "string",
    default: "",
    describe: "(optional) Package to upgrade"
  });
}, (argv) => {
  let david = spawnConnect("david", ["update", argv.pkg]);
}).argv;
