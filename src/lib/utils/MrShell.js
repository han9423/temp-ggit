const { spawn } = require('child_process');
const { red } = require('chalk');

/**
	* @return stdout stderr
	* @param {Array} argv
	*/

exports.mrSpawn = (cmd, argv, options) => {
	const shellApp = spawn(cmd, argv, options);
	return new Promise(( resolve, reject ) => {
		shellApp.stdout.on('data', ( data ) => {
			resolve({ code: 1, msg: data.toString()});
		})
		shellApp.stderr.on('data', ( data ) => {
			reject({ code: 0, err_msg: data.toString() });
		})
	})
}


// exports.doSpawn = (cmd, argv, options, type = 'async') => {
// new Promise((resolve, reject) => {
// if(type === 'async'){

// }
// }
// }


// exports.doSpawnSync = () => {

// }

// if type is 'async'
// if arguments.length is 1
// cmd = spawn(cmd)
// else
// cmd = spawn(cmd, argv, options)
// else
// cmd = spawnSync(cmd, argv, options)

// cmd.stdout.on('data', (data) ->
// resolve { code: 1, data: data.toString() }
// )
// cmd.stderr.on('data', (err) ->
// reject { code: 0, err_msg: err.toString() }
// )
// )
