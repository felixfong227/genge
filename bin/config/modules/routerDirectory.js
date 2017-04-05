module.exports = rootDir => {
    const path = require('path');
    const fs = require('fs');
    const logs = require('../../coreModule/logs');
    const inquirer = require('inquirer');

    // read the globalConfig.json fist
    fs.readFile(path.join(`${rootDir}/.genge/globalConfig.json`), 'utf-8', (error, data) => {
        if(error){
            logs(`Can't not read the globalConfig.json`, 'error');
        }

        
        // turn the json string into an JSON object
        const jsonObject = JSON.parse(data);

        // check if the globalConfig contain routerDirectory
        if(typeof jsonObject.routerdirectory == 'undefined'){
            jsonObject.routerdirectory = 'router';
        }

        // ask the user question
        inquirer.prompt([
            {
                type: 'input',
                name: 'routerdirectory',
                message: 'The default router directory',
                default: rootDir
            }
        ]).then(data => {
            jsonObject.routerdirectory = data.routerdirectory;
            
            // svae the new json object into an json string
            const jsonString = JSON.stringify(jsonObject, null ,2);
            // write the new json string back to the globalConfig.json file
            fs.writeFile(path.join(`${rootDir}/.genge/globalConfig.json`), jsonString, error => {
                if(error){
                    logs(`Can't not write the data back to your globalConfig.json file sorry :/`, 'error');
                }
                logs(`Your changes has been made :)`, 'success');
            });
        })

    });
    
    
}