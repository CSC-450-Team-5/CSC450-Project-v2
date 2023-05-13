const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const http = require('http');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully.');
});

const server = http.createServer(app);
const io = socketIO(server);

const userRouter = require('./routes/users');
const studySetRouter = require('./routes/studysets');
const authRouter = require('./routes/auth');
const quizRouter = require('./routes/quiz')(io);

app.use('/users', userRouter);
app.use('/studysets', studySetRouter);
app.use('/auth', authRouter);
app.use('/quiz', quizRouter);

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});