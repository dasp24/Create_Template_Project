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
        "eslint": "^3.19.0"
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
});

const specImports = (destination) => `const { expect } = require("chai");\nconst {${destination}} = require("../${destination}");\n\ndescribe("${destination}", () => {\nit("is a function", () => {\nexpect(${destination}).to.be.a("function");\n});\n});`;

const mainImports = (destination) => `const ${destination} = () => {}\nmodule.exports = { ${destination} };`;

// it will be called with node in comand line
const path = process.argv[2];
const array = process.argv[2].split('/');
const destinationName = array[array.length - 1];
function createProject(destination, destinationName) {
    fs.mkdir(destination,  (err, data) => {
        fs.writeFile(destination + `/${destinationName}.js`, mainImports(destinationName),  (err, data) => {
            fs.writeFile(destination + '/package.json', json,  (err, data) => {
                fs.writeFile(destination + '/.gitignore', 'node_modules',  (err, data) => {
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