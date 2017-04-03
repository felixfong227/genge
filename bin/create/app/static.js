module.exports = appPath => {
    const fs = require('fs');
    const path = require('path');
    const mainObject = require('../../index');
    const cliColor = require('cli-color');
    const color = {
        error: cliColor.red
        ,warning: cliColor.yellow
        ,success: cliColor.greenBright
        ,info: cliColor.blue
    }
    const logs = require('../../coreModule/logs');
    function throwError(fileName){
        logs(`Something when wrong while trying to create the ${fileName} for your app entry point`, 'error');
    }

    fs.readFile(`${__dirname}/../../template/static/index.ejs`,'utf-8', (error, ejsCode) => {
        fs.writeFile(`${appPath}/public/index.ejs`, ejsCode, error => {
            if(error){
                throwError('index.ejs')
            }else{
                logs(`index.ejs has been created`, 'success');
                fs.readFile(`${__dirname}/../../template/static/style.css`, 'utf-8', (error,  cssCode) => {
                    fs.writeFile(`${appPath}/public/style.css`, cssCode, error => {
                        if(error){
                            throwError('style.css');
                        }
                        logs(`style.css has been created`, 'success');
                        require('../../coreModule/runApp')(appPath);
                    });
                });
            }
        });
    });
}