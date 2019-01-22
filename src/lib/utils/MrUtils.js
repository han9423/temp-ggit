// 管道
exports.pipe = (...funcs) => x => funcs.reduce((previousFunc, currentFunc) => currentFunc(previousFunc));


