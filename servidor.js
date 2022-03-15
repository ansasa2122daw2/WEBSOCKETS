const app = require('http').createServer(onRequest);
const io = require('socket.io')(app);

const fs = require('fs');
const url = require("url");

console.log('servidor iniciat');
app.listen(8888);