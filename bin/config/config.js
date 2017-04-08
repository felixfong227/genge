module.exports = (rootDir, action) => {
    const path = require('path');
    const fs = require('fs');
    const logs = require('../coreModule/logs');
    if(!fs.existsSync(path.join(`${rootDir}/.genge/globalConfig.json`))){
        logs(`Looks like you don't have an global config file, so I'm going to help you make one`, 'info');

        const data = JSON.stringify({
            packageInstaller: "npm",
            routerDirectory: "router"
        });
        fs.writeFile(path.join(`${rootDir}/.genge/globalConfig.json`),data ,error => {
            if(error){
                logs(`For some reason Genge can't write the config file for you? please fire an issues at GitHub`, 'error');
            }
        });
    }

    // Read the directory
    fs.readdir(path.join(`${__dirname}/modules`), (error, files) => {
        if(error){
            logs(`Can't read the modules directory`, 'error');
        }
        let findIt = false;
        let orgFileName = null;
        // Check if the actino match the file name
        files.forEach(fileName => {
            orgFileName = fileName.split('.')[0];
            fileName = fileName.split('.')[0].toLocaleLowerCase();
            if(fileName == action){
                findIt = true;
            }
        });

        if(findIt){
            require(`./modules/${action.toLocaleLowerCase()}`)(path.join(`${__dirname}/../`));
        }else{
            logs(`Can't not find the correct config option`, 'error');
        }

    });

}