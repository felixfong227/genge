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
    
    const jsFile = path.basename(appPath);
    routerPath = path.join(appPath.split(jsFile)[0]);
    if(!fs.existsSync( path.join(`${cwd}/router/${routerPath}`) )){
        console.log(`${color.error("EREOR")}: ${routerPath} is not an exists`);
        process.exit();
    }

    fs.readdir( path.join(`${cwd}/router/${routerPath}`), (error, files) => {
        if(error){
            console.log(`${color.error("EREOR")}: Something when wrong while trying to reading the directory`);
        }

        files.forEach(fileName => {
            fs.unlinkSync( path.join(`${cwd}/router/${routerPath}/${fileName}`) );
        });

        fs.rmdir( path.join(`${cwd}/router/${routerPath}/`), error => {
            if(error){
                console.log(`${color.error("EREOR")}: Something when wrong while trying to removing the router path`);
            }
            console.log(`${color.success("SUCCESS")}: Router has been removed`);
        });

    });

}