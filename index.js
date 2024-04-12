const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth/auth.route');
const customLogger = require('./logger');
const cors = require('cors');
const morgan = require('morgan');

const userRouter = require('./routes/notes_manipulation/notes.route');
const app = express();


app.use(express.json());        // Middleware that parses the recieved request body into json.
app.use(cors());                // To prevent : Access to XMLHttpRequest at 'http://localhost:3000/auth/login' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource

app.use(customLogger());

const password = "iMpmtWPWciVciMuX";
const clusterName = "Cluster0";
const dbName = "NotesDB";
const mongoUrl = `mongodb+srv://rishiqwerty01:${password}@${clusterName}.ewhvozy.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=${clusterName}`;    // backtick is used for string interpolation


app.use('/auth', authRouter);
app.use('/user', userRouter);


mongoose.connect(mongoUrl)
.then(() => {
    console.log('DB connected !');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });

}).catch(() => {
    console.log('DB connection failed');
});
