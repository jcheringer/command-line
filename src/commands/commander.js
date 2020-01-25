const readline = require('readline');
const os = require('os');

const pathUtils = require('../util/path-utils');
const cdCommand = require('./cd-command');
const lsCommand = require('./ls-command');
const helpCommand = require('./help-command');

const { COMMANDS } = require('../util/constants');

const cmdUtils = {
    request() {
        return new Promise((resolve) => {
            const reader = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });

            console.log(`${ os.userInfo().username } | ${ pathUtils.getWorkingDir() }`);

            reader.question('$', (answer) => {
                resolve(answer);
                reader.close();
            });
        });
    },
    process(input) {
        const [command, ...args] = input.match(/"[^"]+"|[^\s"]+/g).map(m => m.replace(/"(.*?)"/, "$1"));

        if (command === '') {
            return;
        }

        switch (command.toLowerCase()) {
            case COMMANDS.EXIT: {
                console.log('Application terminated');
                break;
            }
            case COMMANDS.HELP: {
                helpCommand.process(args);
                break;
            }
            case COMMANDS.CD: {
                cdCommand.process(args);
                break;
            }
            case COMMANDS.LS: {
                lsCommand.process(args);
                break;
            }
            default: {
                console.log(`${ command }: Command not found`);
            }
        }
    }
};

module.exports = cmdUtils;