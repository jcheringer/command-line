const fs = require('fs');
const path = require('path');
const prettyBytes = require('pretty-bytes');
const pathUtils = require('../util/path-utils');

const STR_LIMIT = 25;
const SPACE_CHAR = ' ';
const FLAG_CHAR = '-';
const PAD = SPACE_CHAR.repeat(STR_LIMIT);

const lsCommand = {
    process(args) {
        try {
            const [firstArg, secondArg] = args;
            let flags = null;
            let cmdPath = null;

            if (firstArg && firstArg[0] === FLAG_CHAR) {
                flags = firstArg;
                cmdPath = secondArg;
            } else {
                cmdPath = firstArg;
            }

            printOutput(path.resolve(pathUtils.getWorkingDir(), cmdPath || ''), flags);
        } catch (error) {
            console.error(`ls: Failed to process command. ${ error }`);
        }
    }
};

function printOutput(cmdPath, flags) {
    const H_FLAG = flags && flags.indexOf('h') !== -1;
    const L_FLAG = flags && flags.indexOf('l') !== -1;
    const S_FLAG = flags && flags.indexOf('s') !== -1;
    const T_FLAG = flags && flags.indexOf('t') !== -1;

    let files = readFiles(cmdPath);

    if (files.length === 0) {
        return;
    }

    if (L_FLAG || S_FLAG || T_FLAG) {
        files.forEach(file => {
            const filePath = path.resolve(cmdPath, file.name);
            const stats = fs.lstatSync(filePath);

            if (stats.isDirectory()) {
                file.name += '/';
            }

            file.lastModTime = stats.mtime;
            file.size = H_FLAG ? prettyBytes(stats.size) : `${ stats.size } B`;
        });
    }

    if (S_FLAG) {
        files = files.sort((a, b) => b.size - a.size);
    }

    if (T_FLAG) {
        files = files.sort((a, b) => b.lastModTime - a.lastModTime);
    }

    if (L_FLAG) {
        tableOutput(files);
    } else {
        simpleOutput(files);
    }
}

function readFiles(path) {
    let files = [];

    if (!fs.existsSync(path) || !fs.lstatSync(path).isDirectory()) {
        console.warn('ls: Not a directory');
        return files;
    }

    files = fs.readdirSync(path || pathUtils.getWorkingDir());

    if (files.length === 0) {
        console.info('ls: Empty directory');
    }

    return files.map(file => ({ name: file }));
}

function simpleOutput(files) {
    let output = '';

    files.forEach((file, index) => {
        output += (file.name + PAD).slice(0, STR_LIMIT);
        output += ((index + 1) % 4 === 0) ? '\n' : '\t';
    });

    console.log(output);
}

function tableOutput(files) {
    console.table(files);
}

module.exports = lsCommand;