describe('Create a new app', () => {
    it('Sould create a new app for me', done => {
        const path = require('path');
        const terminal = require('child_process').execSync;
        const appPath = path.join(`${__dirname}/../bin/index.js`);
        const output = terminal(`node ${appPath} add app testApp --yarn`).toString();
        const fse = require('fs-extra');
        if(output.includes('Package is installed')){
            done();
        }else{
            throw new Error("fail");
        }
    });
});

describe('Installing modules via NPM', () => {
    it('Sould install all the packages at the package.json via NPM', done => {
        const path = require('path');
        const terminal = require('child_process').execSync;
        const appPath = path.join(`${__dirname}/../bin/index.js`);
        const output = terminal(`node ${appPath} add app testApp --npm`).toString();
        const fse = require('fs-extra');
        if(output.includes('Package is installed')){
            
            if(fse.existsSync(path.join(`${__dirname}/../testApp/node_modules`))){
                done();
            }else{
                throw new Error("fail");
            }

        }else{
            throw new Error("fail");
        }
    });
});

describe('Add router', () => {
    it('Sould add a new router to the testApp', done => {
        const path = require('path');
        const terminal = require('child_process').execSync;
        const appPath = path.join(`${__dirname}/../bin/index.js`);
        const output = terminal(`cd testApp && node ${appPath} add router test/test1/test2`).toString();
        if(!output.includes('ERROR')){
            done();
        }else{
            throw new Error('fail');
        }
    });
});

describe('Remove router', () => {
    it('Sould remove a router to the testApp', done => {
        const path = require('path');
        const terminal = require('child_process').execSync;
        const appPath = path.join(`${__dirname}/../bin/index.js`);
        const output = terminal(`cd testApp && node ${appPath} remove router test/test1/test2`).toString();
        if(!output.includes('ERROR')){
            done();
        }else{
            throw new Error('fail');
        }
    });
});