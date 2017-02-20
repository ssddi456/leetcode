var fs = require('fs');
var debug = require('debug');
var path = require('path');

debug = debug('leetcode_tools');

var express = require('express');

var bodyParser = require('body-parser');

var app = express();

console.log( Object.keys(bodyParser));

app.use(bodyParser.urlencoded({ extended : true }));
var root = path.join(__dirname, '..');
var template = path.join(__dirname, './template.js');

app.post('/task', function(  req, resp, next ) {
    debug('init task');
    resp.end('');

    var body = req.body;
    console.log( body );
    var tast_path = path.join( root, body.taskname + '.js');

    if( !fs.existsSync(tast_path)  ){

      var tpl = fs.readFileSync(template, 'utf8');
      var res = tpl.replace(/{{([^}]+)}}/g, function( $, $1) {
         return body[$1];
      });

      fs.writeFileSync( tast_path, res );
    }
});


app.listen(1337);