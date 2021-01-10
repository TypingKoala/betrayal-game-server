import express from 'express';
import http from 'http';

const app = express();
const PORT = 8000;

app.use(express.static("/public"))
app.get('/', (req, res) => res.send('Express + TypeScript Server'));

let server = http.createServer(app);
let io = require('socket.io')(server);

io.on('connection', (socket: any) => {
  console.log("User connected");
})

server.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
})