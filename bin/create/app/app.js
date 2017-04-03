module.exports = appPath => {
    const fs = require('fs');
    const path = require('path');
    const ejs = require('ejs');
    const mainObject = require('../../index');
    const cliColor = require('cli-color');
    const color = {
        error: cliColor.red
        ,warning: cliColor.yellow
        ,success: cliColor.greenBright
    }
    const logs = require('../../coreModule/logs');
    // Creating a new project directory
    if(!fs.existsSync(appPath)){
        fs.mkdirSync(appPath)
    }
    // Create some basic placeholder file

    // Create the .genge floder
    // Letting genge know this is a indead a Express Genge app
    fs.exists(`${appPath}/.genge`, exists => {
        if(!exists){
            fs.mkdirSync(`${appPath}/.genge`);
        }
    });

    // Grap the template file(webpage)
    fs.readFile(path.join(`${__dirname}/../../template/webpage/mainApp.ejs`), 'utf-8', (error, ejsFile) => {
        const code = ejs.render(ejsFile, {
            port: mainObject.port
            ,name: path.basename(appPath)
        });
        fs.writeFile(`${appPath}/index.js`, code, error => {
            if(error){
                logs(`Something when wrong while trying to create the index.js for your app entry point`, 'error');
            }else{
                logs(`index.js app entry pont has been created`, 'success');
                // Creater router
                require('./router')(appPath);
            }
        })
    });

}