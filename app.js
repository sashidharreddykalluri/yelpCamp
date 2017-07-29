var express = require('express'),
    bodyparser = require('body-parser'),
    // steps for setting up mongoose
    mongoose = require('mongoose'),
    app = express(),
    campground = require("./models/campground");
    
mongoose.connect('mongodb://localhost/yelpcamp_app');

app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({encoded: true}));


// campground.create(
//     {name: 'acadia national park', image: 'http://i.telegraph.co.uk/multimedia/archive/01439/camp-family_1439761c.jpg', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
//     {name: 'yellowstone', image: 'http://www.campsitesmn.com/img/fpo-camp.jpg', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
//     // {name: 'yosemite', image: 'http://static.materialicious.com/images/wooden-shelters-and-campsites-on-the-danish-coast-o.jpg'},
//     // {name: 'arkansas', image: 'https://cdn.vox-cdn.com/thumbor/-JoPdcgAuLTUsWiDZ62CX4wb33k=/0x0:5225x3479/1200x800/filters:focal(2195x1322:3031x2158)/cdn.vox-cdn.com/uploads/chorus_image/image/54137643/camping_tents.0.jpg'},
//     // {name: 'Phill creek', image: 'http://www.camprate.com/wp-content/uploads/cg2-0-SeashoreCmpg2.jpg'}
//     , function(err, res){
//     if(err){
//         console.log('****Something Went Wrong!!!****')
//         console.log(err);
//     }else{
//         console.log('****Successfully saved all campgrounds');
//     }
// });

                        
app.get('/', function(req, res){
    res.render('home');
});

// shows list of campgrounds
app.get('/campgrounds', function(req, res){
    campground.find({}, function(err, campgrounds){
        if(err){
            res.render("something went wrong, database didn't retrieve anything");
        }else{
                res.render('index', {campgrounds: campgrounds});
        }
    });
});

//gets post request with new campground information
app.post('/campgrounds', function(req, res){
    var imageName = req.body.imageName;
    var imageUrl = req.body.imageUrl;
    var imageDescription = req.body.description;
    
    var newCampground = {name: imageName, image: imageUrl, description: imageDescription};
    campground.create(newCampground, function(err, res){
        if(err){
            console.log('Could not insert this new campground');
            console.log(err);
        }else{
            console.log('successfully inserted new campground');
        }
    });
    
    res.redirect('/campgrounds');
});

//page to add new campgrounds
app.get('/campgrounds/new', function(req, res) {
    res.render('new');
});

//SHOW: show the details of clicked image
app.get('/campgrounds/:id', function(req, res) {
   //find the :id of the image clicked
   var id = req.params.id;
   
   campground.findById(id,function(err, result){
       if(err){
           res.render('Something went wrong');
           console.log(err);
       }else{   
           // render the show page with clicked image details
           res.render('show', {campground: result});
       }
   });

});

//Setting port information
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server is listening');
});