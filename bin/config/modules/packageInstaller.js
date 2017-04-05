module.exports = rootDir => {
    const path = require('path');
    const fs = require('fs');
    const logs = require('../../coreModule/logs');
    const inquirer = require('inquirer');
    editCoifgFile();
    function editCoifgFile(){
        inquirer.prompt([
            {
                type: 'list',
                name: 'packageInstaller',
                message: 'Choosing the package installer your are going to using',
                choices: [
                    'NPM',
                    'Yarn'
                ]
            }
        ]).then( data => {
            // Read the globalConfig
            fs.readFile(path.join(`${rootDir}/.genge/globalConfig.json`), 'utf-8', (error, jsonString) => {
                if(error){
                    logs(`Can't read the globalConfig.json file`, 'error');
                }

                const jsonObject = JSON.parse(jsonString);

                jsonObject['packageInstaller'] = data.packageInstaller.toLowerCase();

                // Save the config back to the globalConfig.json
                fs.writeFile(path.join(`${rootDir}/.genge/globalConfig.json`), JSON.stringify(jsonObject, null ,2), error => {
                    if(error){
                        logs(`For some reason, can't write new config back to the globalConfig.json, so witch mean your new changes won't be saved`, 'error');
                    }
                    logs('Your new changes are being saved', 'success');
                })
            });
        })
    }

}