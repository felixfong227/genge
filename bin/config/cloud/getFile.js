module.exports = rootDir => {
    // Get the url
    const url = process.argv[4];
    const request = require('request');
    const logs = require('../../coreModule/logs');
    const fs = require('fs');
    const path = require('path');

    // Get the content of that URL
    request(url, (error, response, body) => {

        try{

            const jsonObject = JSON.parse(body);

            logs('Your old config file: ', 'info');
            fs.readFile(path.join(`${rootDir}/.genge/globalConfig.json`), 'utf-8', (error, data) => {
                if(error){
                    logs(`Can't not read the globalConfig.json file`, 'error');
                }else{
                    console.log(data)
                    logs('Your new config file:', 'info');
                    console.log(body);
                    logs(`Start updating the config`, 'info');
                    fs.writeFile(path.join(`${rootDir}/.genge/globalConfig.json`), body, error => {
                        if(error){
                            logs(`Can't not update yoru config file`, 'error');
                        }else{
                            logs(`You config is been updated`, 'success');
                        }
                    })
                }
            })
            

        }catch(e){
            if(e.message.includes('JSON at position')){
                logs(`That is not an valid JSON object`, 'error');
            }else{
                logs(e.message, 'error');
            }
        }
    });
}