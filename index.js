const request = require('request'),
      crypto = require('crypto');
const http = require('http');
const fs   = require('fs');
const url = require('url');
const path = require('path');
const qs = require('querystring')
const mime = {
  ".html": "text/html",
  ".css":  "text/css",
  ".js":  "text/javascript",
  // 読み取りたいMIMEタイプはここに追記
};
const requestUrl = 'https://api.twitter.com/oauth/request_token';
const callbackUrl = 'http://localhost:3000/';
const consumer_key = "JKAxjdMHXNuMsdsexdLa8DBb2";
const consumer_secret = "6FsjKzN42vKumPjT9jWzGOujcxtUJsW4ZvE2rBny8WSgfHZEeg";
const keyOfSign = encodeURIComponent(consumer_secret) + "&";

let data_params = {
    oauth_callback: callbackUrl,
    oauth_consumer_key: consumer_key,
    oauth_signature_method: 'HMAC-SHA1',
    oauth_timestamp: (()=>{
        const date = new Date();
        return Math.floor( date.getTime() / 1000 ) ;
    })(),
    oauth_nonce: (()=>{
        const date = new Date();
        return date.getTime();
    })(),
    oauth_version: '1.0'
};

let tmp_body = {};

const http_server = new http.createServer(function(req, res) {
  //request.post(options, function(error, response, body){});
  if (res.url == '/') {
    filePath = '/index.html';
  } else {
    filePath = res.url;
  }
  const fullPath = __dirname + filePath;
  res.writeHead(200, {"Content-Type": mime[path.extname(fullPath)] || "text/plain"});
  fs.readFile(fullPath, function(err, data) {
    if (err) {
      // エラー時の応答
    } else {
      res.end(data, 'UTF-8');
    }
  });
  if(req.method=='POST') {
    req.on('data', function (data) {
      console.log(data+'');
      const s_data = data + '';

      if(s_data==='request_token'){
        let data_req = new RequestMethodClass(s_data, data_params);
        data_req.requestToken(data_params);
        setTimeout(function(){
          console.log(tmp_body.oauth_token);
        },500);
      } else {
      }
    });
    // req.on('end',function(){
    // });
  } else if(req.method=='GET') {
  }
}).listen(3000);
console.log('Server running at http://localhost:3000/');

let RequestMethodClass = function(req, params) {
  if(!(this instanceof RequestMethodClass)) {
      return new RequestMethodClass(req, params);
  }
  if(!req &&  req === 'request_token'){
      this.requestToken = params;
  } else if(!req &&  req ==='get'){
      this.send = text;
  }
};

const cl_req = RequestMethodClass.prototype;

cl_req.requestToken = function(params) {
  Object.keys(params).forEach(item => {
    params[item] = encodeURIComponent(params[item]);
  });

  let requestParams = Object.keys(params).map(item => {
    return item + '=' + params[item];
  });

  requestParams.sort((a,b) => {
    if( a < b ) return -1;
    if( a > b ) return 1;
    return 0;
  });
  requestParams = encodeURIComponent(requestParams.join('&'));

  const dataOfSign = (()=>{
    return encodeURIComponent('POST') + '&' + encodeURIComponent(requestUrl) + '&' + requestParams;
  })();

  const signature = (()=>{
    return crypto.createHmac('sha1', keyOfSign).update(dataOfSign).digest('base64');
  })();

  params['oauth_signature'] = encodeURIComponent(signature);

  let headerParams = Object.keys(params).map(item => {
      return item + '=' + params[item];
  });

  headerParams = headerParams.join(',');

  const header = {
      'Authorization': 'OAuth ' + headerParams
  };

  //オプションを定義
  const options = {
      url: requestUrl,
      headers: header,
      dataType: 'json'
  };
  //リクエスト送信
  request.post(options, function (error, response, body) {
      //return body;
      tmp_body = qs.parse(body);
      console.log(tmp_body);
  });
};