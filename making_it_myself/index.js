const fs = require('fs');
const {child} = require('child_process');

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
    if (err) console.log('nah mate');
    else console.log(data);
};
const args = process.argv;
const path = args[2];
const name = args[3];

// this function creates my project

// it needs a argument to tell it where to put the file

// it will be called with node in comand line
function createProject(destination, projectName) {
    fs.mkdir(destination + projectName, callBack(null, 'making stuff'));
    fs.writeFile(destination + './' + projectName + '/index.js', '', callBack(null, 'making stuff'));
    fs.writeFile(destination + './' + projectName + '/package.json', json, callBack(null, 'making stuff'));
    fs.mkdir(destination + './' + projectName + '/spec', callBack(null, 'making stuff'));
    fs.writeFile(destination + './' + projectName + '/spec/index.spec.js', "const {expect} = require('chai')", callBack(null, 'making stuff'));
}

createProject(path, name)



