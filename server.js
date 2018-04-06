var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Event = require('./models/event')

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

router.route('/events')
    .post(function (req, res) {
        var event = new Event();
        event.name = req.body.name;
        event.start = new Date(req.body.start);
        event.finish = new Date(req.body.finish);
        event.description = req.body.description;

        event.save(function (err) {
            if (err)
                res.send(err);

            res.json({message: 'Event created!'});
        });
    })
    .get(function (req, res) {
        Event.find(function (err, events) {
            if (err)
                res.send(err);

            res.json(events);
        });
    });

router.route('/events/future')
    .get(function (req, res) {
        Event.find({"start": {"$gte": new Date()}}, function (err, events) {
            if (err)
                res.send(err);

            res.json(events);
        });
    });

router.route('/events/:event_id')
    .get(function (req, res) {
        Event.findById(req.params.event_id, function (err, event) {
            if (err)
                res.send(err);
            res.json(event);
        });
    })
    .put(function (req, res) {
        Event.findById(req.params.event_id, function (err, event) {
            if (err)
                res.send(err);

            event.name = req.body.name;
            event.start = new Date(req.body.start);
            event.finish = new Date(req.body.finish);
            event.description = req.body.description;

            event.save(function (err) {
                if (err)
                    res.send(err);

                res.json({message: 'Event updated'});
            });
        });
    })
    .delete(function (req, res) {
        Event.remove({
            _id: req.params.event_id
        }, function (err, event) {
            if (err)
                res.send(err);

            res.json({message: 'Successfully deleted'});
        });
    });

// Register routes
app.use('/api', router);

// Start server
app.listen(port);
console.log('Magic happens on port ' + port);