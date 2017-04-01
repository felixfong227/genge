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
    if(!fs.existsSync(`${appPath}/router`)){
        fs.mkdirSync(`${appPath}/router`);
    }
    fs.readFile(`${__dirname}/../../template/webpage/router.ejs`, 'utf-8', (error, ejsCode) => {
        if(error){
            console.log(`${color.error("ERROR")}: Something when wrong while trying to create the router.js for your app router`);
        }
        fs.writeFile(`${appPath}/router/login.js`, ejsCode, error => {
            console.log(`${color.success("SUCCESS")}: router.js app entry pont has been created`);
            require('./public')(appPath);
        });
    });
}