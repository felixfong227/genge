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
    
    const jsFile = path.basename(appPath);
    routerPath = path.join(appPath.split(jsFile)[0]);

    // Check the appPath is instead a Genge app
    if(!fs.existsSync(`${cwd}/.genge`)){
        console.log(`${color.error("ERROR")}: This is not an Genge app`);
        console.log(`${color.info("INFO")}: Please making sure you are using Genge CLI to create a new app`);
        console.log(`${color.info("INFO")}: For more information please visit https://github.com/felixfong227/genge`);
        process.exit();
    }

    const workingRouterPath = path.join(`${cwd}/router/${routerPath}`)
    if(!fs.existsSync( workingRouterPath )){
        fse.mkdirp( workingRouterPath , error => {
            if(error){
                console.log(`${color.error("EREOR")}: Something when wrong while trying to creating the router for you`);
            }
            console.log(`${color.success("SUCCESS")}: /router/${appPath} is created`);
            updateTheIndexJS();
        });
    }else{
        console.log(`${color.info("INFO")}: /router/${appPath} is already exists`);
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
                    console.log(`${color.error("EREOR")}: Something when wrong while trying to updating the index.js`);
                }

                // Get the router.js into the user router directory
                fs.readFile(`${__dirname}/../../template/webpage/createRouter.ejs`, 'utf-8', (error, ejsCode) => {
                    fs.writeFile(path.join(`${workingRouterPath}/${jsFile}.js`), ejs.render(ejsCode,{path: `/${jsFile}`}), error => {
                        if(error){
                            console.log(`${color.error("EREOR")}: Something when wrong while trying to creating the ${jsFile}.js at the router session`);
                        }
                        console.log(`${color.success("SUCCESS")}: /router/${appPath} is available now`);     
                    });
                });
            });

        });
    }

}