module.exports = appPath => {
    const fs = require('fs');
    const path = require('path');
    const mainObject = require('../../index');
    const cliColor = require('cli-color');
    const color = {
        error: cliColor.red
        ,warning: cliColor.yellow
        ,success: cliColor.greenBright
    }
    logs = require('../../coreModule/logs');
    if(!fs.existsSync(`${appPath}/router`)){
        fs.mkdirSync(`${appPath}/router`);
    }
    fs.readFile(`${__dirname}/../../template/webpage/router.ejs`, 'utf-8', (error, ejsCode) => {
        if(error){
            logs(`Something when wrong while trying to create the router.js for your app router`, 'error');
        }
        fs.writeFile(`${appPath}/router/login.js`, ejsCode, error => {
            logs(`router.js app entry pont has been created`, 'success');
            require('./public')(appPath);
        });
    });
}