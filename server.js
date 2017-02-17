var http = require('http');
var fs = require('fs');


var server = http.createServer(function (req, res) {
    var file = fs.createReadStream('index.html');

    file
        .on('error', function () {
            res.statusCode = 500;
            res.end('Server error');
        })
        .pipe(res)
        .on('close', function() {
            fileStream.destroy();
        });

});

module.exports = server;