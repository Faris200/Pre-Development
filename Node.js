//import httpStatus from 'http-status';
//import { RequestHandler } from 'express';

//export const controller: RequestHandler = async (req: Request<ParamsDictionary, any, any, QueryString.ParsedQs>, res:  Response<any>) => {
 //      const isAuth = res.header('isAuth');
   //    console.log('isAuth: ', isAuth)
//};

var http = require('http');
var url = require('url');
var querystring = require ('querystring');

var server = http.createServer(function(req, res) {
    var page = url.parse(req.url).pathname;
    var params = querystring.parse(url.parse(req.url).query);
    console.log(page);
    if (page == '/' || page == 'index.htm' || page == 'order.html') {

        res.writeHead(200, {"Content-Type": "text/plain"});
    if ('surname' in params && 'name' in params) {
    if(page == '/'){
        res.write('You called' +params['surname']+ ' ' + params['name']+ '\n');
        res.write('You are at 1\'home, what can I do for you?')

    }
    else if (page == 'index.html') {
        res.write('You are in a cave, they belong to me !');
        res.write('\n you are called' + params['surename'] + ' ' + params['name']);

    }
    else if (page == 'order.html') {
        res.write('hello its not private here !');
        res.write('\n you are called' + params['surename'] + ' ' + params['name']);

    }
    }
    else {
        if (page == '/') {
            res.write('You are at home, what can I do for you?');
        }
        else if (page == 'index.html') {
            res.write('You are in a cave, they are mine!');
        }
        else if (page == 'order.html') {
            res.write('Hello, its private here !');
        }
    }
    }

     else {
         res.writeHead(404, {"Content-Type": "text/plain"});
         res.write('Error 404');
     }

     res.end();


});
server.listen(3000);