const http = require('http');
const fs = require('fs');
const ggit = require('../ggit');
const comfortableBrowser = require('../utils/comfortableBrowser');
const { printErr, printOut } = require('../utils/MrPrint');
const { isIPv4 } = require('net');


const sparePort = 1033;
const EADDRINUSE = 'EADDRINUSE';
const ACCESS = 'ACCESS';

module.exports = (port=1031, ip='localhost') => {
    const srv = http.createServer(ggit);
    // handle used port
    const handleSrvInUsed = () => {
        printOut('1031端口已被占用, 3s后切换到' + spareIp);
        srv.listen(port, sparePort, () => {
            printErr('端口已切换到 1033');
        })
    }
    // no access
    const handleNoAccess = () => {
        printErr('访问权限被禁止win32请使用管理员权限linux请使用su/chmod')
    }
    // 3s trun to browser
    const turnToBrowser = (time, ip, port, path) => {
        const ipIsNotv4 = 'ip 地址不是v4协议';
        setTimeout(() => {
            if( !isIPv4(ip) ){ printOut(ipIsNotv4); }
            else{ comfortableBrowser(ip, port, path); }
        }, time);
    }

    srv.on('error', (err) => {
        switch( err.code ){
            case EADDRINUSE: handleSrvInUsed();break;
            case ACCESS:  handleNoAccess();break;
        }
    })
    //default 1031 localhost
    srv.listen(port, ip, () => {
        const address = srv.address();
        const addr =  address.address;
        const myPort = address.port;
        const delayTime = 3000;
        const path = '/index';
        printOut(`ggit运行在${addr}:${myPort}  ${delayTime/1000}秒后自动跳转......\n`);
        // turnToBrowser(delayTime, addr, myPort, path);
    })
}