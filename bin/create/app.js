module.exports = appPath => {
    const fs = require('fs');
    const path = require('path');
    const ejs = require('ejs');
    const mainObject = require('../index');
    const cliColor = require('cli-color');
    const color = {
        error: cliColor.red
        ,warning: cliColor.yellow
        ,success: cliColor.greenBright
    }
    // Creating a new project directory
    if(!fs.existsSync(appPath)){
        fs.mkdirSync(appPath)
    }
    // Create some basic placeholder file

    // Grap the template file(webpage)
    fs.readFile(path.join(`${__dirname}/../template/webpage/mainApp.ejs`), 'utf-8', (error, ejsFile) => {
        const code = ejs.render(ejsFile, {
            port: mainObject.port
            ,name: path.basename(appPath)
        });
        fs.writeFile(`${appPath}/index.js`, code, error => {
            if(error){
                console.log(`${color.error("ERROR")}: Something when wrong while trying to create the index.js for your app entry point`);
            }else{
                console.log(`${color.success("SUCCESS")}: index.js app entry pont has been created`);
                // Creater router
                require('./router')(appPath);
            }
        })
    });

}