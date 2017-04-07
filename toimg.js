var jsdom = require('jsdom'),
    scripts =
        [
            "http://code.jquery.com/jquery.js", 
            "https://d3js.org/d3.v3.js",
            'rect.js',
        ],
    htmlStub = '<!DOCTYPE html>';

jsdom.env({features:{QuerySelector:true}, html:htmlStub, scripts:scripts, done:function(errors, window) {
    // var svgsrc = window.insertPie("#pie", 400, 400, [0.25,0.25,0.5]).innerHTML;

    // window.$('body').tm30_rfrg({aData:[{x:86,y:90, color: 'blue', radius: 5},{x:50,y:60, color: 'red', radius: 7},{x:55,y:65, color: 'red', radius: 7},{x:60,y:70, color: 'red', radius: 7},{x:65,y:75, color: 'red', radius: 7},{x:70,y:100, color: '#aaff11', radius: 10}]});
    
    console.log(window.$('svg').html());

    var html = window.d3.select("svg")
        .attr("title", "test2")
        .attr("version", 1.1)
        .attr("xmlns", "http://www.w3.org/2000/svg")
        .node().parentNode.innerHTML;
    
    var fs = require('fs')
        , svgsrc = window.document.innerHTML
    fs.writeFile('aaa.svg', html, function(err) {
        if(err) {
            console.log('error saving document', err)
        } else {
            console.log('The file was saved, open index.html to see the result')
        }
    })
}});
// var jsdom = require("jsdom");
//
// jsdom.env(
//     "toimg.html",
//     ["http://code.jquery.com/jquery.js", "https://d3js.org/d3.v3.js"],
//     function (err, window) {
//         console.log(window.$('#line1').html());
//         console.log("there have been", window.$("a").length - 4, "io.js releases!");
//     }
// );