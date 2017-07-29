var mongoose = require("mongoose");

// SCHEME SETUP
var campground_schema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

// MODEL SETUP
module.exports = mongoose.model('Campground', campground_schema);
