module.exports = appPath =>{
    const mainObject = require('../index');
    const cliColor = require('cli-color');
    const path = require('path');
    const spawn = require('child_process').spawn;
    const fullAppPath = path.join(`${appPath}/index.js`);
    const fs = require('fs');

    const packages = [
        'express'
        ,'body-parser'
        ,'ejs'
    ]

    const color = {
        error: cliColor.red
        ,warning: cliColor.yellow
        ,success: cliColor.greenBright
        ,info: cliColor.blue
    }

    // Installing all the packages
    
    // Check if using Yarn or NPM
    console.log(`${color.info("INFO")}: Installing all the packages`);
    if(mainObject.cli.yarn){
        installPakcage('Yarn');
    }else{
        installPakcage('NPM');
    }

    function startServer(){
    
        console.log(`${color.info("INFO")}: Running express server`);
        console.log(`${color.info("INFO")}: $ node ${fullAppPath}`);
        const appRunner = spawn('node', [`${fullAppPath}`]);
        if(mainObject.cli.open){
            require('open')(`http://localhost:${mainObject.port}`);
        }

        console.log(`==== ` + `${color.info("Server Logs")}` + ` ====`);

        appRunner.stdout.on('data', function (data) {
            console.log(`${color.success("SUCCESS")}: ${data.toString()}`);
        });

        appRunner.stderr.on('data', function (data) {
            console.log(`${color.error("ERROR")}: ${data.toString()}`);
            process.exit();
        });

        appRunner.on('exit', function (code) {
            console.log(`${color.info("INFO")}: Genge Express app is closing`);
            process.exit();
        });

    }

    function installPakcage(installerName){
        const packageDotJSON = JSON.parse( fs.readFileSync(`${__dirname}/../template/JSON/package.json`, 'utf-8') );
        // Create a package.json 
        fs.writeFileSync(`${appPath}/package.json`, JSON.stringify(packageDotJSON, null, 2));
        console.log(`${color.success("SUCCESS")}: package.json has been created`);
        // Run the install command
        const command = `${installerName.toLowerCase()} install`;
        console.log(`${color.info("INFO")}: $ ${command}`);
        require('child_process').execSync(`cd ${appPath} && ${installerName.toLowerCase()} install`);
        require('child_process').exec(command, (error, data) => {
            console.log(`==== ` + `${color.info(`${installerName} Logs`)}` + ` ====`);
            console.log(data)
            console.log(`==== ` + `${color.success("Package is installed")}` + ` ====`);
            if(mainObject.runApp){
                startServer();
            }
        });

    }

}