module.exports = appPath => {
    const fs = require('fs');
    const path = require('path');
    const mainObject = require('../../index');
    const cliColor = require('cli-color');
    const cwd = process.cwd();
    let routerPath = path.join(`${cwd}/router/${appPath}`);
    const fse = require('fs-extra');
    const ejs = require('ejs');
    const url = require('url');
    const color = {
        error: cliColor.red
        ,warning: cliColor.yellow
        ,success: cliColor.greenBright
        ,info: cliColor.blue
    }
    const logs = require('../../coreModule/logs');
    
    const jsFile = path.basename(appPath);
    routerPath = path.join(appPath.split(jsFile)[0]);
    if(!fs.existsSync( path.join(`${cwd}/${mainObject.using.router}/${routerPath}`) )){
        logs(`${routerPath} is not an exists`, 'error');
        process.exit();
    }

    fs.readdir( path.join(`${cwd}/${mainObject.using.router}/${routerPath}`), (error, files) => {
        if(error){
            logs(`Something when wrong while trying to reading the directory`, 'error');
        }

        files.forEach(fileName => {
            fs.unlinkSync( path.join(`${cwd}/${mainObject.using.router}/${routerPath}/${fileName}`) );
        });

        fs.rmdir( path.join(`${cwd}/${mainObject.using.router}/${routerPath}/`), error => {
            if(error){
                logs(`Something when wrong while trying to removing the router path`, 'error');
            }
            logs(`Router has been removed`, 'success');
        });

    });

}