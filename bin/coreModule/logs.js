module.exports = (message, method) => {

    const cliColor = require('cli-color');
    const color = {
        error: cliColor.red,
        warning: cliColor.yellow,
        success: cliColor.greenBright,
        info: cliColor.blue
    };
    const methodLowerCase = method.toLowerCase();
    const methodUpperCase = method.toUpperCase();
    
    const static = color[methodLowerCase](`${methodUpperCase}`);
    console.log(`${static}: ${message}`);
    if(methodLowerCase == 'error'){
        process.exit();
    }
};