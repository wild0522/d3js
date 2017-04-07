var express = require('express');
var app = express();
var port = process.env.PORT || 8888;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));

app.post('/:lib', function(req, res) {
    eval('var opts='+req.body.opts);
    if(typeof(opts) !== 'object'){
        res.json({'status':false,'msg':'wrong param'})
    }
    var jsdom = require('jsdom'),
        scripts =
            [
                "http://code.jquery.com/jquery.js",
                "https://d3js.org/d3.v3.js",
                req.params.lib+'/'+req.params.lib+'.js'
            ],
        htmlStub = '<!DOCTYPE html>';

    jsdom.env({features:{QuerySelector:true}, html:htmlStub,
        FetchExternalResources: ["script",'img'],scripts:scripts, done:function(errors, window) {

        window.$('body')[req.params.lib](opts);
        
        var html = window.d3.select("svg")
            .attr("title", req.params.lib)
            .attr("version", 1.1)
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .node().parentNode.innerHTML;

        var fs = require('fs');
        
        fs.truncate(req.params.lib+'.svg', 0, function() {
            fs.writeFile(req.params.lib+'.svg', html, function(err) {
                if(err) {
                    res.json({'status':false, 'msg':'error saving document'});
                    console.log('error saving document', err)
                } else {
                    res.json({'status':true});
                }
            })
        });
    }});

    // res.json({'status':false,'msg':'unknown failed.'});
});

/**
 * 使用指令執行 node toimg.js
 */

app.listen(port);
console.log('SVG server started! At http://localhost:' + port);