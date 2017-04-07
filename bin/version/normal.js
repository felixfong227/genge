module.exports = () => {
    const request = require('request');
    const fs = require('fs');
    const path = require('path');
    const logs = require('../coreModule/logs');
    logs('Fetching the data from the NPM registry', 'info');
    request(`https://registry.npmjs.com/genge`, (error, response, body) => {
        body = JSON.parse(body);
        const latestVersion = body["dist-tags"].latest;
        const packageJSON = JSON.parse( fs.readFileSync(path.join(`${__dirname}/../../package.json`), 'utf-8') );
        if(packageJSON.version < latestVersion){
            logs(`You got an update`, 'info');
        }else{
            logs(`You are already up-to-data`, 'info');
        }
    });
};