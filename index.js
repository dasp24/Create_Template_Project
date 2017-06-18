const fs = require('fs');
const { exec } = require('child_process');


// process.argv - this means i can use args in node, such as file path

// child_process - possibly use to call npm install within my function

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

const callBack = function (err, data) {
    if (err) console.log(err);
    else console.log(data);
};
const args = process.argv;
const path = args[2];


// this function creates my project

// it needs a argument to tell it where to put the file

// it will be called with node in comand line
function createProject(destination) {
    fs.mkdir(destination, function (err, data) {
        fs.writeFile(destination + '/index.js', '', function (err, data) {
            fs.writeFile(destination + '.gitignore', 'node_modules', function (err, data) {
                fs.writeFile(destination + '/package.json', json, function (err, data) {
                    fs.mkdir(destination + '/spec', function (err, data) {
                        fs.writeFile(destination + '/spec/index.spec.js', "const {expect} = require('chai')", function (err) {
                            // CD into destination
                            // run npm
                            // exec('');
                            exec('cd ' + destination + '; npm i');
                        })
                    });
                });
            });
        });
    });
}

createProject(path);


