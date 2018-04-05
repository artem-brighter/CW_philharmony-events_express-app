var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    finish: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Event', EventSchema);