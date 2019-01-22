const { platform } = require('os');
const { exec } = require('child_process');

module.exports = (ip, port, path) => {
    var terminal;
    switch (platform()) {
        case 'linux':
            terminal = 'xdg-open';
            break;
        case 'win32':
            terminal = 'start';
            break;
        case 'darwin':
            terminal = 'open';
            break;
        default:
            return '不支持此平台';
    }
    return exec(`${terminal} http://${ip}:${port}/${path}`);
};
