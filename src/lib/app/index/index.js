const index = Symbol('index');
const { printErr } = require('../../utils/MrPrint'); 
const { mrSpawn } = require('../../utils/MrShell');
const { get } = require('http');
const { 
    repository, 
    title, 
    author, 
    name, 
    version, 
    description,
    update,
    license,
    homepage
} = require('../../../../package.json');

// check if exist git
const testIfHaveGit = () => {
    return mrSpawn('git').then((shell)=>{
        return shell
    }).catch((err) => {
        printErr(err.err_msg);
    })
}
//  judge  if connect web
const isConnectWeb = (cb) => {
    const b = get('http://www.baidu.com', (res)=>{
        res.on('data', (data)=>{}).on('end', ()=>{
            cb(true);
        })
    });
    b.on('error', ()=>{
        cb(false);
    })
}

const defualtOptions = {
    repoAddress: repository.url,
    jqueryPath: 'javascripts/libs/jquery.min.js',
    webSiteTitle: title, 
    author: author,
    appName: name,
}

// render indexPager
const indexPageRenderOptions = Object.assign({
    mainAppCssPath: 'css/index.css',
    utilsAppCssPath: 'css/utils.css',
    mainAppPath: 'javascrtips/index.js',
}, defualtOptions);

// render no-git.pug
const noGitOptions = Object.assign({
    cssPath: 'css/uninstallgit.css',
    noGitScripts: 'javascripts/uninstallgit.js'
},defualtOptions)





/**
 * @classdesc 首页渲染
 */
class Index{
    //判断是否有git 返回界面
    async indexPage(req, res) {
       await testIfHaveGit().then(( data ) => {
           if( 1 === data.code ){
               res.render('index.pug', indexPageRenderOptions);
           }
       }).catch((err) => {
           if( 0 === err.code ){
               res.render('no-git.pug', noGitOptions);
           }
       })
    }
    // 软件信息 package.json 配置
    aboutPage(req, res){
        const aboutApp = {
            '软件名': name,
            '版本': version, 
            '更新日期': update,
            '开源协议': license,
            '软件描述': description,
            '作者主页': homepage,
        }    
        res.json(aboutApp);
        res.end();
    }

    onLineStatus(req, res){
        isConnectWeb(function(a){
            res.end(a.toString());
        })
    }
}

// export unique indexpage 
if(!global[index]){
    global[index] = new Index();
}
module.exports = global[index];