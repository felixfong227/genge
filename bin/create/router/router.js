module.exports = appPath => {
    const fs = require('fs');
    const path = require('path');
    const mainObject = require('../../index');
    const cliColor = require('cli-color');
    const cwd = process.cwd();
    let routerPath = path.join(`${cwd}/router/${appPath}`);
    const fse = require('fs-extra');
    const ejs = require('ejs');
    const url = require('url');
    const color = {
        error: cliColor.red
        ,warning: cliColor.yellow
        ,success: cliColor.greenBright
        ,info: cliColor.blue
    }
    const logs = require('../../coreModule/logs');
    
    const jsFile = path.basename(appPath);
    routerPath = path.join(appPath.split(jsFile)[0]);

    // Check the appPath is instead a Genge app
    if(!fs.existsSync(`${cwd}/.genge`)){
        logs(`This is not an Genge app`, 'error');
        logs(`Please making sure you are using Genge CLI to create a new app`, 'info');
        logs(`For more information please visit https://github.com/felixfong227/genge`, 'info');
        process.exit();
    }

    const workingRouterPath = path.join(`${cwd}/router/${routerPath}`)
    if(!fs.existsSync( path.join(`${workingRouterPath}/${jsFile}.js`) )){
        fse.mkdirp( workingRouterPath , error => {
            if(error){
                logs(`Something when wrong while trying to creating the router for you`, 'error');
            }
            logs(`/router/${appPath} is created`, 'success');
            updateTheIndexJS();
        });
    }else{
        logs(`/router/${appPath} is already exists`, 'info');
    }


    function updateTheIndexJS(){
        // The router is created, then update the index.js to start using it
        fs.readFile(`${cwd}/index.js`,'utf-8', (error, data) => {

            data += `

// Genge Router:
// https://${path.basename(cwd)}.com/${appPath}
app.use('/${routerPath}', require(\`$\{__dirname\}/router/${appPath}\`));
    `;
            fs.writeFile(`${cwd}/index.js`,data, error => {
                if(error){
                    logs(`Something when wrong while trying to updating the index.js`, 'error');
                }

                // Get the router.js into the user router directory
                fs.readFile(`${__dirname}/../../template/webpage/createRouter.ejs`, 'utf-8', (error, ejsCode) => {
                    fs.writeFile(path.join(`${workingRouterPath}/${jsFile}.js`), ejs.render(ejsCode,{path: `/${jsFile}`}), error => {
                        if(error){
                            logs(`Something when wrong while trying to creating the ${jsFile}.js at the router session`, 'error');
                        }
                        logs(`/router/${appPath} is available now`, 'success');
                    });
                });
            });

        });
    }

}