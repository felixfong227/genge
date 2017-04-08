module.exports = appPath => {
    
    const path = require('path');
    const fs = require('fs');
    const fse = require('fs-extra');
    const logs  = require('../../coreModule/logs');
    if(fs.existsSync(path.join(`${appPath}`))){
        // Check for that directory is contain .genge

        fs.readdir(path.join(`${appPath}`), (error, files) => {
            if(error){
                logs(`Can't not read that directory`);
            }else{

                if(fs.existsSync(path.join(`${appPath}/.genge`))){

                    fse.remove(path.join(`${appPath}`), error => {
                        if(error){
                            logs(`Can't not reamove your app`, 'error');
                        }else{
                            logs('Your app is been removed', 'success');
                        }
                    });

                }else{
                    logs('That is not an valid Genge app', 'error');
                }

            }
        });

    }else{
        logs('That directory is not exists', 'error');
    }

}