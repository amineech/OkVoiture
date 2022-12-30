const express = require('express');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');
const cors = require('cors');

// creating express application instance
const app = express();

// for environement variables
dotenv.config();

// some app configuration params
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));

// port
const port = process.env.PORT;

app.post('/cars/create', require('./Routes/CarRoutes'));

app.get('/cars/list', require('./Routes/CarRoutes'));

app.get('/cars/detail/:id', require('./Routes/CarRoutes'));

app.post('/reservations/add', require('./Routes/ReservationRoutes'));

app.get('/reservations/list', require('./Routes/ReservationRoutes'));

app.post('/reservations/delete', require('./Routes/ReservationRoutes'));

app.get('/reservations/filter/:designation', require('./Routes/ReservationRoutes'));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});