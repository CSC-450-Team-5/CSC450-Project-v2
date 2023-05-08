const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const verifyToken = require('./utils/verifyToken');
const logout = require('./utils/logout');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully.")
})

const userRouter = require('./routes/users');
const studySetRouter = require('./routes/studysets');
const authRouter = require('./routes/auth');
const quizRouter = require('./routes/quiz');

// Example route that requires a valid token
app.get('/protected-route', verifyToken, (req, res) => {
  console.log(req); // Log the request object
  // res.send('You have access to the protected route!');
});

// Example route that does not require a token
app.get('/public-route', (req, res) => {
  // res.send('You can access the public route without a token!');
});

app.get('/logout', (req, res) => {
  logout();
  res.redirect('/login');
});


app.use('/users', userRouter);
app.use('/studysets', studySetRouter);
app.use('/auth', authRouter);
app.use('/quiz', quizRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})