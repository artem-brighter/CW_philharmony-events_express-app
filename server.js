var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// DB connect
var mongoose = require('mongoose');
mongoose.connect('mongodb://root:root@ds261745.mlab.com:61745/cherkasy-philharmony');

// configure app to use bodyParser()
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Set port from .env or use 8080
var port = process.env.PORT || 8080;

// Router
var router = express.Router();

// Routes
router.get('/', function (req, res) {
    res.json({message: 'API is ok'});
});

// Register routes
app.use('/api', router);

// Start server
app.listen(port);
console.log('Magic happens on port ' + port);