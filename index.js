const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const fs = require('fs');
const path = require('path');
const crypto = require("crypto");
//const Datastore = require('nedb');

let PORT = process.env.PORT || 3000;

//Init dataBase
//let userDb = new Datastore({filename : 'data/users'});
//userDb.loadDatabase();

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {

    socket.on('add message', data => {
        socket.broadcast.emit('send message', {
            message: data.message,
            userid: data.userid,
            color: data.color,
            nickname: data.nickname,
            time: data.time
        });

    });

   /* socket.on('register user', dataU => {

        userDb.find({nickname: dataU.nickname}, function (err, docs) {
            console.log(typeof []);

            if (docs.length == 0) {
                var userPassword = crypto.randomBytes(20).toString('hex');

                userDb.insert({
                            userid: dataU.userid,
                            nickname: dataU.nickname, 
                            password: userPassword
                        });
                socket.emit('status', {
                    statusCode: 0,
                    passwordUser: userPassword
                });
            } else {
                socket.emit('status', {
                    statusCode: 1,
                });
            }
        });
    });*/

    /*socket.on('login user', dataU => {

        userDb.find({nickname: dataU.nickname, password: dataU.password}, (err, docs) => {
            if (docs.length == 0) {
                socket.emit('status login', {
                    statusCode: 2
                });
            } else {
                socket.emit('status login', {
                    nickname: dataU.nickname,
                    password: dataU.password,
                    userid: docs[0].userid,
                    statusCode: 0
                });
                
                console.log(`Success login: ${docs[0].userid}`)
            }
        });
    });*/
});

server.listen(PORT, () => {
	console.log(`Port - ${PORT}`);
});
