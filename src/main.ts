#!/usr/bin/env node
import * as path from "path";
import * as fs from 'fs';
import {execFile, spawn, execSync} from "child_process";
import * as spawn from "@munchkinhalfling/spawn.js";

const ne = path.join(process.env.HOME, "node-executables");
var pwd = process.env.PWD;
require("yargs").command("init", "Initialize ~/node-executables", (yargs) => {}, async (argv) => {
  console.log(`Creating ${process.env.HOME}/node-executables`);
  execSync(`mkdir -p ${ne}`);
  console.log("Initializing with npm init.");
  execSync("npm init -y", {cwd: ne});
  console.log("Installing david as a package updater.");
  execSync("npm i david", {cwd: ne})
  fs.writeFileSync(path.join(process.env.HOME, ".profile"), "export PATH=$PATH:$HOME/node-executables/node_modules/.bin", {flag: "as"});
  console.log("Reloading configuration");
  execFile(path.join(process.env.HOME, ".profile"));
  console.log("Done!");
}).command("install [pkg]", "Install pkg.", (yargs) => {
  yargs.positional('pkg', {
    type: "string",
    describe: "The package to be installed"
  });
}, (argv) => {
  let yarn = spawn.spawnConnect("npm", ["install", argv.pkg], {cwd: ne});
  yarn.on("exit", process.exit);
}).command("remove [pkg]", "Remove pkg.", (yargs) => {
  yargs.positional("pkg", {
    type: "string",
    describe: "The package to be removed."
  });
}, (argv) => {
  let yarn = spawn.spawnConnect("npm", ["uninstall", argv.pkg], {cwd: ne});
  yarn.on("exit", process.exit);
}).command("update [pkg]", "Upgrade pkg, or all packages, using david", (yargs) => {
  yargs.positional("pkg", {
    type: "string",
    default: "",
    describe: "(optional) Package to upgrade"
  });
}, (argv) => {
  let david = spawn.spawnConnect("david", ["update", argv.pkg], {cwd: ne});
  david.on("exit", process.exit);
}).command("check-update", "Check for updates using david", (yargs) => {}, argv => {
	spawn.spawnConnect("david", [], {cwd: ne}).on("exit", process.exit);
}).argv;
