const express = require('express');
const app = express();
const http = require('http').createServer(app);

require('./sockets').init(require('socket.io')(http));

app.use(express.urlencoded({ extended: true }))
    .use(require('body-parser').json())
    .set('json replacer', null)
    .set('json spaces', 4)
    .use('/assets', express.static(`${__dirname}/assets`))
    .use('/overlay', require('./overlay_routes'))
    .use(require('./routes'));

http.listen(5000, console.log("Server started on port 5000"));