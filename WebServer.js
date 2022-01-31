var FileManager = require('./FileManager.js');
var WebServer = {

    startWebServer: function () {

        var http = require('http'); // Import Node.js core module

        var server = http.createServer(function (req, res) {   //create web server
            if (req.url == '/') { //check the URL of the current request
                serveStartpage(req, res);

            }
            else if (req.url.includes("/report/")) {
                getSpecificReport(req, res);
            }
            else if (req.url == "/report") {
                getusedUnusedReports(req, res);
            }


            else if (req.url == "/admin") {

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('<html><body><p>This is admin Page.</p></body></html>');
                res.end();

            }
            else
                res.end('Invalid Request!');

        });

        server.listen(5000); //6 - listen for any incoming requests

        console.log('Node.js web server at port 5000 is running..')

    }
};

function serveStartpage(req, res){

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(FileManager.getHtml());
    res.end();
}

function getusedUnusedReports(req, res){

    res.writeHead(200, { 'Content-Type': 'application/json' });
    let filesArray = FileManager.getAllFileinFolder('./output/');
    res.write(JSON.stringify(filesArray));
    res.end();
}

function getSpecificReport(req, res){
    let fileName = req.url.slice(8, req.url.length);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(FileManager.getUsageReport(fileName));
    res.end();
}

module.exports = WebServer