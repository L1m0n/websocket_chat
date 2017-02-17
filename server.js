var WebsocketServer = new require('ws');
var wss = new WebsocketServer.Server({port : 8081});
var clients = [];

wss.on('connection', function (ws) {
    var id = clients.length;
    clients[id] = ws;
    console.log('New connection #' + id);

    for (var key in clients) {
        if (key != id) {
            console.log('send');
            clients[key].send(JSON.stringify({
                type : 'info',
                message : 'New user connected'
            }))
        }
    }

    ws.on('message', function (message) {
        console.log('New message recived ' + message);
        for (var key in clients) {
            clients[key].send(JSON.stringify({
                type : 'message',
                message : message,
                author : id
            }))
        }
    });

    ws.on('close', function (err) {
        delete clients[id];
    })
});

