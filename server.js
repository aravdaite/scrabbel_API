const express = require("express");
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error')
const cookieParser = require('cookie-parser')
const cors = require('cors')

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
    res.append('Access-Control-Allow-Origin', 'DOMAIN');
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