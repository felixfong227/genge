module.exports = appPath => {
    const fs = require('fs');
    const path = require('path');
    const mainObject = require('../index');
    const cliColor = require('cli-color');
    const color = {
        error: cliColor.red
        ,warning: cliColor.yellow
        ,success: cliColor.greenBright
        ,info: cliColor.blue
    }

    function throwError(fileName){
        console.log(`${color.error("ERROR")}: Something when wrong while trying to create the ${fileName} for your app entry point`);
    }


    function runApp(){
        console.log(`${color.info("INFO")}: Running express server`);
        const fullAppPath = path.join(`${appPath}/index.js`);
        console.log(`${color.info("INFO")}: $ node ${fullAppPath}`);
        const spawn = require('child_process').spawn;
        const ls = spawn('node', [`${fullAppPath}`]);
        console.log(`==== ` + `${color.info("Server Logs")}` + ` ====`);
        ls.stdout.on('data', function (data) {
            console.log(`${color.success("SUCCESS")}: ${data.toString()}`);
        });

        ls.stderr.on('data', function (data) {
            console.log(`${color.error("ERROR")}: ${data.toString()}`);
        });
    }

    fs.readFile(`${__dirname}/../template/static/index.ejs`,'utf-8', (error, ejsCode) => {
        fs.writeFile(`${appPath}/public/index.ejs`, ejsCode, error => {
            if(error){
                throwError('index.ejs')
            }else{
                console.log(`${color.success("SUCCESS")}: index.ejs has been created`);
                fs.readFile(`${__dirname}/../template/static/style.css`, 'utf-8', (error,  cssCode) => {
                    fs.writeFile(`${appPath}/public/style.css`, cssCode, error => {
                        if(error){
                            throwError('style.css');
                        }
                        console.log(`${color.success("SUCCESS")}: style.css has been created`);
                        if(mainObject.runApp){
                            runApp();
                        }
                    });
                });
            }
        });
    });
}