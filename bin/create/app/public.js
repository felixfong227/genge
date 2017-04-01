module.exports = appPath => {
    const fs = require('fs');
    const path = require('path');
    const mainObject = require('../../index');
    const cliColor = require('cli-color');
    const color = {
        error: cliColor.red
        ,warning: cliColor.yellow
        ,success: cliColor.greenBright
        ,info: cliColor.blue
    }
    console.log(`${color.info("INFO")}: Creating the public directory for storging static files like images and css files`);
    if(!fs.existsSync(`${appPath}/public`)){
        fs.mkdirSync(`${appPath}/public`);
    }
    require('./static')(appPath);
}