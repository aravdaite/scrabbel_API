const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error')
const cookieParser = require('cookie-parser')

//load env vars
dotenv.config({ path: './config/config.env' })

//connect to databas
connectDB();

//route files
const auth = require('./routes/auth');
const dictionary = require('./routes/dictionary');
const words = require('./routes/words');

const app = express();

app.use(express.json());
app.use(cookieParser());

//mount routes
app.use('/api/auth', auth);
app.use('/api/dictionary', dictionary);
app.use('/api/words', words);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
);

// handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    //close server and exit process
    server.close(() => process.exit(1));
})