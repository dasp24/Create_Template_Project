const fs = require('fs');
const {exec} = require('child_process');

const json = JSON.stringify({
    "name": "new_project",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "mocha ./spec"
    },
    "devDependencies": {
        "chai": "^1.8.1",
        "eslint": "^3.19.0",
        "mocha": "^3.4.2"
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
});

const specImports = (destination) => `const { expect } = require("chai");\nconst {${destination}} = require("../${destination}");\n\ndescribe("${destination}", () => {\nit("is a function", () => {\nexpect(${destination}).to.be.a("function");\n});\n});`;

const mainImports = (destination) => `const ${destination} = () => {}\nmodule.exports = { ${destination} };`;

const forGitIgnore = () => '.node_modules\n**/node_modules\n.DS_Store\n**/.DS_Store\n*.log\n**/*.log\n.vscode\n**/.vscode\n.idea/*\n**/.idea/*\n**/bundle.js\n**/bundle.js.map\n**/*.map.css\n**/*.map.js';

// it will be called with node in comand line
const path = process.argv[2];
const array = process.argv[2].split('/');
const destinationName = array[array.length - 1];
function createProject(destination, destinationName) {
    fs.mkdir(destination,  (err, data) => {
        fs.writeFile(destination + `/${destinationName}.js`, mainImports(destinationName),  (err, data) => {
            fs.writeFile(destination + '/package.json', json,  (err, data) => {
                fs.writeFile(destination + '/.gitignore', forGitIgnore(),  (err, data) => {
                    fs.mkdir(destination + '/spec',  (err, data) => {
                        fs.writeFile(destination + `/spec/${destinationName}.spec.js`, specImports(destinationName), () => {
                            exec('cd ' + destination + '; npm i');
                        });
                    });
                });
            });
        });
    });
}

createProject(path, destinationName);