(()=>{
    new function FuncList1(){
        var list1 =    '<li class="funcList1">' +
                            '<div class="icon1"></div>'+
                            '<span class="createRepo">新建一个仓库</span>'+
                        '</li>'
        $('.container ul').append(list1);
    }
    $('.funcList1').click(function(){
        if(!$('body').hasClass('informed')){
            $.get('html/inform.htm',function(data){
                $('footer').after(data)
            })
            $('body').addClass('informed')
        }
    })
})()
const request_origin = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

const baseUrl = 'https://github.com';

const request = request_origin.defaults({jar: true});


const randomUserAgent = ()=>{
	const userAgents = [
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36 OPR/57.0.3098.116',
		'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:64.0) Gecko/20100101 Firefox/64.0',
	]
	const randomNum = Math.floor(Math.random() * 3);
	return userAgents[randomNum];
}

const getToken = () => {
	return new Promise((resolve, reject)=>{
		request.get(baseUrl + '/session', (err, response, body) => {
			if(err){ reject({code: 0, err_msg: err}) };
			// console.log(response.headers['set-cookie']);
			if(body){
				const $ = cheerio.load(body);
				const token_a = $('form[action="/session"]').children('input[name=authenticity_token]').val();
				const cookie_a  = response.headers['set-cookie'];
				resolve({token: token_a, cookie: cookie_a });
			}else{
				reject({code: 0, err_msg: 'no network'});
			}
		})
	})
}

const analogLogin = (ct)=>{
	const { token, cookie } = ct
	const cookie_string = cookie.join(';');
	const cookie_b = request.jar().setCookie(cookie_string, baseUrl);
	const options = {
		url: baseUrl + '/session',
		method: 'POST',
		headers: {
			'User-Agent': randomUserAgent(),
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		form: {
			'login': 'sewerganger',
			'password': 'outlook9423',
			'authenticity_token': token,
			'utf8': encodeURIComponent('✓'),
			'commit': encodeURIComponent('Sign+in')
		},
		jar: cookie_b
	}
	return new Promise((resolve, reject)=>{
		request(options, (err, response, body)=>{
			if(err) { reject({code: 0, err_msg: err.toString()}) }
			console.log(body);

			// const cookieWithSession = response.headers['set-cookie'];

			// delete options.form;
			// options.jar =cookieWithSession.join(';');
			// console.log(body)
			// request(options, (err_a, response_a, body_a)=>{
				// console.log(body_a);
			// })
		})
		// .pipe(fs.createWriteStream('./demo.html'));
	})
}

const gitPage = async ()=>{
	const cookieAndToken = await getToken().then((data)=>{
		return data;
	}).catch((err)=>{
		console.log(err.err_msg);
	});
	const afterLogin = await analogLogin(cookieAndToken);
}

gitPage();



// <div class="width-full text-bold">
//         <a class="d-inline-flex flex-items-baseline f5 mb-2 dashboard-underlined-link width-fit" data-hydro-click="{&quot;event_type&quot;:&quot;dashboard.click&quot;,&quot;payload&quot;:{&quot;event_context&quot;:&quot;REPOSITORIES&quot;,&quot;target&quot;:&quot;REPOSITORY&quot;,&quot;record_id&quot;:162129222,&quot;dashboard_context&quot;:&quot;user&quot;,&quot;dashboard_version&quot;:2,&quot;user_id&quot;:45007226,&quot;client_id&quot;:&quot;208858682.1540649198&quot;,&quot;originating_request_id&quot;:&quot;9889:25E0:3C6ED9:578EB0:5C41367E&quot;,&quot;originating_url&quot;:&quot;https://github.com/&quot;}}" data-hydro-click-hmac="59010358341132cfc615d3cf0b7f73903efa6c5aec6f9fc31355a69c6ddad4d2" data-ga-click="Dashboard, click, Repo list item click - context:user visibility:public fork:false" data-hovercard-type="repository" data-hovercard-url="/sewerganger/ggit-gitgui-tool/hovercard" href="/sewerganger/ggit-gitgui-tool" aria-describedby="hovercard-aria-description">
//           <div class="text-gray-light mr-2">
//               <svg aria-label="Repository" class="octicon octicon-repo flex-shrink-0" viewBox="0 0 12 16" version="1.1" width="12" height="16" role="img"><path fill-rule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z"></path></svg>
//           </div>

//           <span class="flex-shrink-0 css-truncate css-truncate-target" title="sewerganger">sewerganger</span>/<span class="css-truncate css-truncate-target" style="max-width: 260px" title="ggit-gitgui-tool">ggit-gitgui-tool</span>
// </a>      </div>