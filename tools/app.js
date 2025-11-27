var fs = require('fs');
const debugMaker = function(moduleName) {
    return function(message) {
        console.log(`[${moduleName}] ${message}`);
    };
}

var path = require('path');

debug = debugMaker('leetcode_tools');

var express = require('express');

var bodyParser = require('body-parser');

var app = express();

console.log( Object.keys(bodyParser));

app.use(bodyParser.urlencoded({ extended : true }));
var root = path.join(__dirname, '..');
var template = path.join(__dirname, './template.js');

/**
 * Example curl command:
 * curl -X POST http://localhost:1337/task \
 *   -H "Content-Type: application/x-www-form-urlencoded" \
 *   -d "name=MyTask&taskname=mytask&content=console.log('Hello World');"
 */
app.post('/task', function(req, resp, next) {
    debug('init task');
    resp.end(JSON.stringify({ status : 'ok' }));

    /**
     * @type {Object}
     * @property {string} name
     * @property {string} taskname
     * @property {string} content
     */
    var body = req.body;
    console.log( body );
    var task_path = path.join( root, body.taskname + '.ts');

    if( !fs.existsSync(task_path)  ){

      var tpl = fs.readFileSync(template, 'utf8');
      var res = tpl.replace(/{{([^}]+)}}/g, function( $, $1) {
         return body[$1];
      });

      fs.writeFileSync( task_path, res );
    }
});


app.listen(1337);