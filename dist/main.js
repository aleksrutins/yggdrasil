#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var path = require("path");
var fs = require("fs");
var child_process_1 = require("child_process");
var spawnjs = require("@munchkinhalfling/spawn.js");
var ne = path.join(process.env.HOME, "node-executables");
var pwd = process.env.PWD;
require("yargs").command("init", "Initialize ~/node-executables", function (yargs) { }, function (argv) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("Creating " + process.env.HOME + "/node-executables");
        child_process_1.execSync("mkdir -p " + ne);
        console.log("Initializing with npm init.");
        child_process_1.execSync("npm init -y", { cwd: ne });
        console.log("Installing david as a package updater.");
        child_process_1.execSync("npm i david", { cwd: ne });
        fs.writeFileSync(path.join(process.env.HOME, ".profile"), "export PATH=$PATH:$HOME/node-executables/node_modules/.bin", { flag: "as" });
        console.log("Reloading configuration");
        child_process_1.execFile(path.join(process.env.HOME, ".profile"));
        console.log("Done!");
        return [2 /*return*/];
    });
}); }).command("install [pkg]", "Install pkg.", function (yargs) {
    yargs.positional('pkg', {
        type: "string",
        describe: "The package to be installed"
    });
}, function (argv) {
    var yarn = spawnjs.spawnConnect("npm", ["install", argv.pkg], { cwd: ne });
    yarn.on("exit", process.exit);
}).command("remove [pkg]", "Remove pkg.", function (yargs) {
    yargs.positional("pkg", {
        type: "string",
        describe: "The package to be removed."
    });
}, function (argv) {
    var yarn = spawnjs.spawnConnect("npm", ["uninstall", argv.pkg], { cwd: ne });
    yarn.on("exit", process.exit);
}).command("update [pkg]", "Upgrade pkg, or all packages, using david", function (yargs) {
    yargs.positional("pkg", {
        type: "string",
        "default": "",
        describe: "(optional) Package to upgrade"
    });
}, function (argv) {
    var david = spawnjs.spawnConnect("david", ["update", argv.pkg], { cwd: ne });
    david.on("exit", process.exit);
}).command("check-update", "Check for updates using david", function (yargs) { }, function (argv) {
    spawnjs.spawnConnect("david", [], { cwd: ne }).on("exit", process.exit);
}).argv;
//# sourceMappingURL=main.js.map