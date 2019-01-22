/**
 * @description 模拟登录GitHub抓取信息
 */


const { printErr } = require('../../utils/MrPrint');
const request_origin = require('request');
const cheerio = require('cheerio');

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

const pickInfo = (html) => {
	const $ = cheerio.load(html);
	var href;
	var foldName;
	var $aLink = $('.public.source .d-inline-flex');
	var username = $('.no-underline > .css-truncate-target').text();
	let githubFold = {};
	return new Promise((resolve,reject)=>{
		$aLink.each((index, ele_a)=>{
			href = ele_a.attribs.href
			foldName = href.split('/')[href.split('/').length - 1];
			githubFold[foldName] = baseUrl + href;
			if(index === $aLink.length - 1){
				resolve({
					gitRepos: githubFold,
					username: username.replace(/\n|\s+/g, ''),
				})
			}
		})
	})
}

const userGitHubPage = async ()=>{
	const authorationToken = await getToken().then(data=>data).catch((err)=>{
		printErr(err.err_msg); 	// get authorization_name from github
	});
	const afterLoginHtml = await analogLogin(authorationToken).then(data=>data.loggedhtml).catch((err)=>{
		printErr(err.err_msg); // analogLogin
	});
	const repositories = await pickInfo(afterLoginHtml).then(data=>data);
	return repositories;
}

exports.loginGitHub = userGitHubPage;