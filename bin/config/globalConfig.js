module.exports = rootDir => {
    const path = require('path');
    const fs = require('fs');
    const logs = require('../coreModule/logs');
    const inquirer = require('inquirer');
    // Read the global config file

    if(!fs.existsSync(path.join(`${rootDir}/.genge`))){
        logs(`Looks like you don't have an .genge directory, so I'm going to help you make one`, 'info');
        fs.mkdir(path.join(`${rootDir}/.genge`), error => {
            if(error){
                logs(`Can't create the .genge directory for your global config`, 'error');
            }
        });
    }

    // Check if that is an config.json file
    if(!fs.existsSync(path.join(`${rootDir}/.genge/globalConfig.json`))){
        logs(`Looks like you don't have an global config file, so I'm going to help you make one`, 'info');

        const data = `// Default
// I want to use Yarn as default too, but for compatibility reason (╯°□°）╯︵ ┻━┻
// But now what you can do is change it to Yarn, so you don't have to add the --yarn flat every sing fu***** times ƪ(˘⌣˘)ʃ
// That really make you feels good right? Using Yarn instead of NPM? ƪ(˘⌣˘)ʃ
// You you you don't have thinking about the life while waiting NPM to install your package? cuz Yarn just finish it right a way ƪ(˘⌣˘)ʃ

// Is this version of Genge only support NPM and Yarn
// If you change it other then that, Genge will throw an error into your face right a way, so you really don't want to do that :/
{
    "packageInstaller": "npm"
}`;

        fs.writeFile(path.join(`${rootDir}/.genge/globalConfig.json`),data ,error => {
            if(error){
                logs(`For some reason Genge can't write the config file for you? please fire an issues at GitHub`, 'error');
            }
            const configPaht = path.join(`${rootDir}/.genge/globalConfig.json`);
            editCoifgFile();
        });
    }else{
        editCoifgFile();
    }


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

                // Save the comment:
                const comment = jsonString.match(/\/\/(.*)/gi, '');

                // Loop all the comment line, and add \n at the end of each of every line
                for(let index in comment){
                    comment[index] = `${comment[index]}\n`
                }
                // Save and turn the JSON string into a JSON object
                // Didn't i just copy this code form the main index.js? Yes I did LOL
                jsonString = jsonString.replace(/\/\/(.*)/gi, '')
                jsonString = jsonString.split('\n').join('').split(' ').join('');
                const config = JSON.parse(jsonString);
                // Update the new globalConfig
                config.packageInstaller = data.packageInstaller.toLowerCase();
                // Turn the JSON into an big string with comment
                let output = '';

                // Generate the output string
                
                // Add the comment first
                for(let index in comment){
                    output += comment[index];
                }
                // Add the new config string
                output += JSON.stringify(config, null, 2);

                // Save the config back to the globalConfig.json
                fs.writeFile(path.join(`${rootDir}/.genge/globalConfig.json`), output, error => {
                    if(error){
                        logs(`For some reason, can't write new config back to the globalConfig.json, so witch mean your new changes won't be saved`, 'error');
                    }
                    logs('Your new changes are being saved', 'success');
                })
            });
        })
    }

}