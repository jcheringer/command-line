const cmdUtils = require('./commands/commander');
const { COMMANDS } = require('./util/constants');

(async function () {
    console.clear();
    console.log('Type help for the list of available commands.');
    console.log('Type help [command] to see more information about the command.');
    console.log('Type exit to quit application');
    console.log();

    while (true) {
        let command = await cmdUtils.request();
        cmdUtils.process(command);

        if (command === COMMANDS.EXIT) {
            break;
        }
    }
})();