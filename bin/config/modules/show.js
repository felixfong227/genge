module.exports = rootDir => {

    const fs = require('fs');
    const path = require('path');
    const logs = require('../../coreModule/logs');

    // Read the globalConfig.json file
    fs.readFile(path.join(`${rootDir}/.genge/globalConfig.json`), 'utf-8', (error, jsonString) => {
        if(error){
            logs(`Can't not read your globalConfig.json`, 'error');
        }else{
            logs(`Your global config:`, 'info');
            console.log(jsonString);
        }
    });

}