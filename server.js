const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    dotenv = require('dotenv'),
    config = require('./config');

dotenv.config();

const microblinkRoutes = require('./api/routes/microblink.route');
const mongoRoutes = require('./api/routes/mongo.route');

let numberOfTriesToConnect = 0;
mongoose.Promise = global.Promise;
const connectWithRetry = () => {
    mongoose.connect(config.mongodb, {
        useNewUrlParser: true,
        reconnectTries: 60,
        reconnectInterval: 2000
        })
        .then(
            () => { console.log('Mongo database connected.'); numberOfTriesToConnect = 0; },
            err => {
                console.log('Cannot connect to the Mongo database: ' + err.message);
                if (err.message && err.message.match(/failed to connect to server .* on first connect/) && numberOfTriesToConnect < 3) {
                    console.log("Initial connect to Mongo database failed, trying again...");
                    numberOfTriesToConnect++;

                    setTimeout(connectWithRetry, 5000);
                }
                else {
                    console.log("Connection with Mongo database failed.");
                    console.log("Running server anyway, but Mongo is not available.");
                }
        });
}

// Retry added if backend app and mongo app running in different docker containers
// Sometimes mongo container isn't ready/up when backend trying to connect
connectWithRetry();

const app = express();

// I think 30mb is enough?
app.use(bodyParser.json({limit: '30mb'}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
// Testing frontend<->backend localy and CORS problems were involved 
// comment this if running on different servers or docker containers or smth
app.use(cors({credentials: true, origin: 'http://localhost'}));
//app.use(cors());
app.use('/recognize/execute', microblinkRoutes);
app.use('/api/mongo', mongoRoutes);

let port = process.env.SERVER_PORT || 4000;
app.listen(port);

console.log('Server is listening on port ' + port);