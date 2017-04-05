#!/usr/bin/env node
const cwd = process.cwd();
const cliColor = require('cli-color');
let runApp = false;
const logs = require('./coreModule/logs');

// Set up a default port
let port = 8080;
const cli = require('commander');
const fs = require('fs');
const path = require('path');
const packageJSON = JSON.parse(fs.readFileSync(path.join(`${__dirname}/../package.json`)));

let using = {
    router: 'router'
}

cli
    .version(packageJSON.version)
    .option('--port <port>', 'Set the application port')
    .option('--run', 'Run the app as soon as it finish')
    .option('--open', 'Open the browser once is finish installing')
    .option('--npm', '<Run app> Using NPM(Default) to install package')
    .option('--yarn', '<Run app> Using Yarn(Recommand) to install package')
    .option('--beta', 'Checking the GitHub release version instead of the NPM')
    .parse(process.argv)

if(typeof cli.port == 'undefined'){
    logs(`The default port will be ${port}`, 'warning');
}else{
    port = cli.port;
    logs(`Using port ${port}`, 'info');
}

if(typeof cli.run == 'undefined'){
    runApp = false;
}else{
    runApp = true;
}

// Check if there is an global config file
if(fs.existsSync(path.join(`${__dirname}/.genge/globalConfig.json`))){

    // There is an globalConfig file

    // Read the globalConfig file

    fs.readFile(path.join(`${__dirname}/.genge/globalConfig.json`), 'utf-8', (error, jsonString) => {
        if(error){
            logs(`Genge can't read your globalConfig.json file`, 'error');
        }
        let findInstaller = false;
        const supportedPackageInstaller = [
            'yarn',
            'npm'
        ];

        // Remove all the comment and trim down the globalConfig.json

        // @felixfong227: Hay, I didn't know I'm good at Regex ¯\_(ツ)_/¯
        // Stackoverflow || Google: Really? ¬_¬
        // BTW: https://regex101.com/ is a good tool for hacking regex ;)

        jsonString = jsonString.replace(/\/\/(.*)/gi, '')
        jsonString = jsonString.split('\n').join('').split(' ').join('');
        const config = JSON.parse(jsonString);

        supportedPackageInstaller.forEach(installerName => {
            if(config.packageInstaller == installerName){
                findInstaller = true;
            }
        });

        if(!findInstaller){
            logs(`I told you, Genge  will throw an error into your face, cuz Genge didn't konw what the hack is ${config.packageInstaller}`, 'error');
        }

        if(config.packageInstaller == "yarn"){
            cli.yarn = true;
        }else if(config.packageInstaller == 'npm'){
            cli.yarn = false;
        }

    });

}else{

    if(typeof cli.yarn == 'undefined'){
        logs(`The default package installer will be NPM, but you can use --yarn`, 'warning');
    }else{
        logs(`Using Yarn as the package installer`, 'warning');
    }

}

if(fs.existsSync(path.join(`${__dirname}/.genge/globalConfig.json`))){

    const jsonString = fs.readFileSync(path.join(`${__dirname}/.genge/globalConfig.json`), 'utf-8');
    const jsonObject = JSON.parse(jsonString);
    if(typeof jsonObject.routerdirectory !== 'undefined'){
        using.router = jsonObject.routerdirectory;
    }
}

module.exports = {
    packageJSON: packageJSON
    ,port: port
    ,runApp: runApp
    ,cli: cli,
    using: using
};

// Get the main action
const appPath = path.join(`${cwd}/${cli.args[2]}`);
switch(cli.args[0]){
    case 'add':
        // Get the secon action
        switch(cli.args[1]){
            // Creating a new app(project)
            case 'app':
                require('./create/app/app')(appPath);
            break;
            
            case 'router':
                require(`./create/${using.router}/router`)(cli.args[2])
            break;
        }
    break;

    case 'remove':
        switch(cli.args[1]){
            case 'router':
                require(`./remove/${using.router}r/router`)(cli.args[2]);
            break;
        }
    break;

    // Updating the global config for the Genge CLI

    case 'config':
        require('./config/config')(__dirname, cli.args[1]);
    break;

    case 'update':
        if(!cli.beta){
            require('./version/normal')();
        }else{
            require('./version/beta')();
        }
    break;

    default:
        logs('For more information, please use the --help flat', 'info');
        logs('Docs is also available at GitHub https://github.com/felixfong227/genge', 'info');
        logs(`Can't not find your command`, 'error');
}