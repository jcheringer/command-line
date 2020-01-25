let workingPath = process.cwd();

const pathUtils = {
    setWorkingDir(newPath) {
        workingPath = newPath;
    },
    getWorkingDir() {
        return workingPath;
    }
};

module.exports = pathUtils;