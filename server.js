const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const socketIo = require('socket.io');
const {
    findwordforSocket
} = require('./controllers/words');
const WordFive = require('./models/WordFive');

//load env vars
dotenv.config({ path: './config/config.env' })

//connect to databas
connectDB();

//route files
const auth = require('./routes/auth');
const dictionary = require('./routes/dictionary');
const words = require('./routes/words');

const app = express();
//app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', process.env.DOMAIN);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

//mount routes
app.use('/api/auth', auth);
app.use('/api/dictionary', dictionary);
app.use('/api/words', words);

app.use(errorHandler);



const PORT = process.env.PORT || 5000;

const server = http.Server(app);



const io = socketIo(server);
let rooms = 0;
io.on('connection', (socket) => {
    console.log("New client connected");
    console.log("room", rooms);
    socket.on('createGame', function (data) {
        socket.join('room-' + ++rooms);
        console.log(rooms, data)
        socket.emit('newGame', 'room-' + rooms); //create room
    });

    socket.on('joinGame', function (data) {
        for (let i = 0; i < rooms + 1; i++) {
            console.log("join game");              // join room
            const room = io.nsps['/'].adapter.rooms['room-' + i];
            console.log(room);
            if (room && room.length == 1) {
                console.log("if runs");
                socket.join('room-' + i);
                console.log("after join", room);
                findwordforSocket()
                    .then(res => {
                        socket.broadcast.to('room-' + i).emit('player', { room: i, word: res });
                        socket.emit('player', { room: i, word: res })
                    })
            }
            else {
                if (i == rooms) {
                    console.log("err runs");
                    socket.emit('err', 'Sorry, The room is full!');
                }
            }
        }
    });
    socket.on("leave", data => {
        console.log("leave runs")
        const room = io.nsps['/'].adapter.rooms['room-' + data.room];
        console.log("check room data", room)
        socket.leave('room-' + data.room)
        console.log("after leaving", room)
        socket.broadcast.to('room-' + data.room).emit("oponentLeft", "left");
    })
    socket.on("letters", data => {
        console.log(data);
        socket.broadcast.to('room-' + data.room).emit("letters", data.letters);
    });
    socket.on("word", data => {
        console.log(data);
        socket.broadcast.to('room-' + data.room).emit("word", data.word);
    });
    socket.on("won", data => {
        console.log(data);
        socket.broadcast.to('room-' + data.room).emit("status", data.message);
    });
    socket.on("newWord", data => {
        findwordforSocket()
            .then(res => {
                socket.broadcast.to('room-' + data).emit('newWord', { word: res });
                socket.emit('newWord', { word: res })
                //socket.broadcast.to('room-' + data).emit('player2', { word: res });
                //socket.emit('player1', { word: res });
            })
    });

    // socket.broadcast.emit("getWord", data);
    socket.on("disconnect", data => {
        console.log("Client disconnected", data);
        socket.leave('room' + data);
        socket.broadcast.to('room-' + data).emit('player_disconnected', "");

    });
});



server.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);

// handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //close server and exit process
    server.close(() => process.exit(1));
})