const { COMMANDS } = require('../util/constants');

const HELP_INFO = [
    {
        command: 'cd',
        arguments: '[directory]',
        description: 'Change the current working directory'
    },
    {
        command: 'ls',
        arguments: '[-hlst] [directory]',
        description: 'List files from the specified path or from the current working directory'
    }
];

const CD_INFO = [
    {
        argument: 'directory',
        description: 'Path to the destination directory. Required'
    }
];

const LS_INFO = [
    {
        argument: '-h',
        description: 'Print sizes in human readable format. (e.g., 1Kb, 234Mb, 2Gb, etc.)'
    },
    {
        argument: '-l',
        description: 'Long format. Shows filename, last modified date, and file size'
    },
    {
        argument: '-s',
        description: 'Sort the list of files by size'
    },
    {
        argument: '-t',
        description: 'Sort the list of files by modification date'
    },
    {
        argument: 'directory',
        description: 'Optional. If specified, will list files from the specified directory'
    }
];

const helpCommand = {
    process(args) {
        const [command] = args;

        helpCommand.showHeader(command);

        if (command) {
            helpCommand.showCommandInfo(command);
        } else {
            helpCommand.showDefaulInfo();
        }
    },
    showHeader(command) {
        const PAD = ('=').repeat(30);
        const title = command ? `HELP: ${ command.toUpperCase() }` : 'HELP';

        console.log(`${ PAD }  ${ title }  ${ PAD }`);
        console.log();

        if (!command) {
            console.log('\tType help [command] to see more information about the command.');
            console.log();
        }
    },
    showDefaulInfo() {
        console.table(HELP_INFO);
        console.log();
    },
    showCommandInfo(command) {
        switch (command) {
            case COMMANDS.CD:
                console.table(CD_INFO);
                break;
            case COMMANDS.LS:
                console.table(LS_INFO);
                break;
            default:
                console.log(`Help information for ${ command } is not available`);
        }

        console.log();
    }
};

module.exports = helpCommand;