const request_origin = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const baseUrl = 'https://github.com';
const request = request_origin.defaults({jar: true});

const getToken = () => {
	return new Promise((resolve, reject)=>{
		request.get(baseUrl + '/session', (err, response, body) => {
			if(err){ reject({code: 0, err_msg: err}) };
			if(body){
				const $ = cheerio.load(body);
				const authorationToken = $('form[action="/session"]').children('input[name=authenticity_token]').val();
				resolve(authorationToken);
			}else{
				reject({code: 0, err_msg: 'no network'});
			}
		})
	})
}

const analogLogin = (token)=>{
	const options = {
		url: baseUrl + '/session',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		form: {
			'login': 'sewerganger',
			'password': 'outlook9423',
			'authenticity_token': token,
			'utf8': encodeURIComponent('✓'),
			'commit': encodeURIComponent('Sign+in')
		},
	}
	return new Promise((resolve, reject)=>{
		request(options, (err_a, response_a)=>{
			if(err_a) { reject({code: 0, err_msg: err_a.toString()}) }
			const cookie_session = response_a.headers['set-cookie'];
			request.get({
				url: baseUrl + '/session',
				headers: {
					Cookie:  cookie_session,
				}
			}, (err_b, response_b, body)=>{
				if(err_b) { reject({code: 0, err_msg: err_b.toString()}) }
				resolve({ code: 1, loggedhtml: body});
			})
		})
	})
}

const gitPage = async ()=>{
	const authorationToken = await getToken().then((data)=>{
		return data;
	}).catch((err)=>{
		console.log(err.err_msg);
	});
	const afterLogin = await analogLogin(authorationToken).then((data) => {

	}).catch((err)=>{
		
	});
}
gitPage();

