const express = require('express')
const app = express()
const http = require("http")
const cors = require('cors')
const {Server} = require("socket.io")
const db = require('./database/db.js')

app.use(cors());
app.use(express.json())
app.use(express.urlencoded())

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with id: ${socket.id} joined the room ${data}`)
    })
    socket.on("send_message", (data) => {
        socket.to(data.room).emit("received_message", data)
    })
    socket.on("disconnect", () => {
        console.log("User disconnected: ", socket.id)
    })
})
app.post("/login", (req, res) => {
    const {username, password} = req.body;
    db.query("select passwordHash from users where username = ?;", [username], (err, result) => {
        if (err) throw err;
        else{
            if (result[0].passwordHash === password) res.send(true);
            else res.send(false)
        }
    }
    )
})

server.listen(5000,() => {
    console.log("SERVER RUNNING");
});
