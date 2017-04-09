module.exports = () => {
    const request = require('request');
    const fs = require('fs');
    const path = require('path');
    const logs = require('../coreModule/logs');
    logs('You are checking the BETA version', 'warning');
    logs('Fetching the data from the GitHub repository', 'info');
    request(`https://raw.githubusercontent.com/felixfong227/genge/master/package.json`, (error, response, body) => {
        body = JSON.parse(body);
        const latestVersion = body.version;
        const packageJSON = JSON.parse( fs.readFileSync(path.join(`${__dirname}/../../package.json`), 'utf-8') );
        if(packageJSON.version < latestVersion){
            logs(`You got an update`, 'warning');
        }else{
            logs(`You are already up-to-data`, 'info');
        }
    });
};