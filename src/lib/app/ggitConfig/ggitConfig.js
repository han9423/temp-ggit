const os = require('os');
const fs =  require('fs');
const  { exec, execSync } = require('child_process');
const { printErr } = require('../../utils/MrPrint');
const ggitConfig = Symbol('ggitConfig');
const { mrSpawn } = require('../../utils/MrShell');




class Config{
    constructor(){
        this.initGit = this.initGit.bind(this);
    }
    // 初始化git设置
    initGit(req, res){
        mrSpawn('git', ['config', '--list']).then((data)=>{
            const username = data.msg.indexOf('user.name') >  0 ? 1 : 0;
            const email = data.msg.indexOf('user.email') > 0 ? 1 : 0;
            if(email && username){
                res.json({ code: 1, srv_msg: '已初始化', data_msg: data.msg });
            }else{
                res.json({ code: 0, srv_msg: '未初始化 请先选择全局设置' });
            }
        }).catch((err)=>{printErr(err)})
    }

    configInformation(req, res){

    }

}


if(!global[ggitConfig]){
    global[ggitConfig] = new Config();
}

module.exports = global[ggitConfig];