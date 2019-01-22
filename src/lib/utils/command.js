'use strict'
const packageJson = require('../../../package.json');
const { format } = require('util');
const { printErr, printSpace, printOut} = require('./MrPrint');
const generateGGit = require('../bin/start');


const HELP_LIST = {
    'start': '--开启ggit服务',
    '--version': '--查看版本信息',
    '--ggit': '--查看logo'
}

const VERSION_LIST = {
    version : 'Version/版本:' + packageJson.version,
    author :'Author/作者:' + packageJson.author,
    update: 'Date/更新日期:' + packageJson.update,
    license: 'License/开源协议:' + packageJson.license,
    description: 'Description/描述:' + packageJson.description,
    homepage: 'HomePage/个人主页:' + packageJson.homepage
}

const ggitLogo = `
    $$$$$$$$$$  $$$$$$$$$$  ##   $$
    $$          $$          ##   $$
    $$          $$              $$$$$
    $$          $$          ##   $$
    $$    $$$$  $$   $$$$$  ##   $$
    $$      $$  $$      $$  ##   $$
    $$$$$$$$$$  $$$$$$$$$$  ##   $$$$
`


const showOnTerminal = ( content, type) => {
    switch(type){
        case 'format':  
            for( let prop in content ){
                printSpace(format("%s:%s\n", prop, content[prop]));
            };
            break;
        case 'space':
            for( let prop in content ){
                printSpace(content[prop], 1, 1, 1);
            };
            break;
        case 'error':
            for( let prop in content ){
                printErr(content[prop], 1, 1, 1);
            };
            break;
        default:
            for( let prop in content ){
                printOut(content[prop], 1, 1, 1);
            };
            break;
    }
}

module.exports = (usefulArgv) => {
    usefulArgv.forEach((args) => {
        if( '--version' === args ){
            showOnTerminal( VERSION_LIST, 'space');
        }else if(args.includes('version')){
            const missStrInform = '请使用--version查看版本信息'
            showOnTerminal(missStrInform, 'error');
        }
        if( '--help' === args ){
            showOnTerminal(HELP_LIST, 'format');
        }
        if('--ggit' === args){
            showOnTerminal(ggitLogo)
        }

        if( 'start' === args ){
            // index
            const indexP = usefulArgv.findIndex(val => '-p' === val);
            const indexI = usefulArgv.findIndex(val => '-i' === val );
            // value
            
            const port = indexP > 0? usefulArgv[indexP + 1]: undefined;
            const ip = indexI > 0 ? usefulArgv[indexI + 1]: undefined;
            generateGGit(port, ip);
        }
    })
}


