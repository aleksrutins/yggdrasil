#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const {execFile, spawn, execSync} = require("child_process");
const ne = path.join(process.env.HOME, "node-executables");
var pwd = process.env.PWD;
const writeTo = function(stream) {
	return function(data) {
		stream.write(data);
	};
};
function spawnConnect(cmd, args, opts) {
  let commd = spawn(cmd, args, opts);
  commd.stdout.on("data", writeTo(process.stdout));
  commd.stderr.on("data", writeTo(process.stderr));
  process.stdin.on("data", writeTo(commd.stdin));
  return commd;
}

require("yargs").command("init", "Initialize ~/node-executables", (yargs) => {}, async (argv) => {
  console.log(`Creating ${process.env.HOME}/node-executables`);
  execSync("mkdir -p $HOME/node-executables");
  console.log("Initializing with yarn init.");
  execSync("npm init -y", {cwd: ne});
  console.log("Installing david as a package updater.");
  execSync("npm i david", {cwd: ne})
  fs.writeFileSync(path.join(process.env.HOME, ".profile"), "export PATH=$PATH:$HOME/node-executables/node_modules/.bin", {flags: "as"});
  console.log("Reloading configuration");
  execFile(path.join(process.env.HOME, ".profile"));
  console.log("Done!")
}).command("install [pkg]", "Install pkg using yarn.", (yargs) => {
  yargs.positional('pkg', {
    type: "string",
    describe: "The package to be installed"
  });
}, (argv) => {
  let yarn = spawnConnect("npm", ["install", argv.pkg], {cwd: ne});
  yarn.on("exit", process.exit);
}).command("remove [pkg]", "Remove pkg.", (yargs) => {
  yargs.positional("pkg", {
    type: "string",
    describe: "The package to be removed."
  });
}, (argv) => {
  let yarn = spawnConnect("npm", ["uninstall", argv.pkg], {cwd: ne});
  yarn.on("exit", process.exit);
}).command("upgrade [pkg]", "Upgrade pkg, or all packages, using david", (yargs) => {
  yargs.positional("pkg", {
    type: "string",
    default: "",
    describe: "(optional) Package to upgrade"
  });
}, (argv) => {
  let david = spawnConnect("david", ["update", argv.pkg], {cwd: ne});
  david.on("exit", process.exit);
}).argv;
