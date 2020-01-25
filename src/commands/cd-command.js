const path = require('path');
const fs = require('fs');
const pathUtils = require('../util/path-utils');

const cdCommand = {
    process(args) {
        try {
            if (args.length === 0) {
                return;
            }

            const dest = args[0];
            const newPath = path.resolve(pathUtils.getWorkingDir(), dest);

            if (!fs.existsSync(newPath)) {
                console.warn(`cd: ${ dest }: Invalid path`);
                return;
            }

            if (!fs.lstatSync(newPath).isDirectory()) {
                console.warn(`cd: ${ dest }: Not a directory`);
                return;
            }

            pathUtils.setWorkingDir(newPath);
        } catch (error) {
            console.error(`cd: Failed to process command. ${ error }`);
        }
    }
};

module.exports = cdCommand;