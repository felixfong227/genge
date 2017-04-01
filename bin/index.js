#!/usr/bin/env node
const cwd = process.cwd();
const cliColor = require('cli-color');
let runApp = false;
const color = {
    error: cliColor.red
    ,warning: cliColor.yellow
    ,success: cliColor.greenBright
    ,info: cliColor.blue
}

// Set up a default port
let port = 8080;
const cli = require('commander');
const fs = require('fs');
const path = require('path');
const packageJSON = JSON.parse(fs.readFileSync(path.join(`${__dirname}/../package.json`)));

cli
    .version(packageJSON.version)
    .option('--port <port>', 'Set the application port')
    .option('--run', 'Run the app as soon as it finish')
    .option('--open', 'Open the browser once is finish installing')
    .parse(process.argv)

if(typeof cli.port == 'undefined'){
    console.log(`${color.warning("WARNING")}: The default port will be ${port}`);
}else{
    port = cli.port;
    console.log(`${color.info("INFO")}: Using port ${port}`);
}

if(typeof cli.run == 'undefined'){
    runApp = false;
}else{
    runApp = true;
}

module.exports = {
    packageJSON: packageJSON
    ,port: port
    ,runApp: runApp
    ,cli: cli
};

// Get the main action
switch(cli.args[0]){
    case 'create':
        // Get the secon action
        switch(cli.args[1]){
            // Creating a new app(project)
            case 'app':
                require('./create/app')(path.join(`${cwd}/${cli.args[2]}`));
            break;
        }
    break;
}