const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser"),
      mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {useUnifiedTopology: true, useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Eagle Point", 
//     image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"
// }, function(err, campground){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("newly created campground");
//         console.log(campground);
//     }
// });


app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds", {campgrounds: allCampgrounds});
        }
    });
    //res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    //get data from form & add to campgrounds array
    const name = req.body.name;
    const image = req.body.image;
    const newCampground = {name: name, image: image};
    // Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }
        else{
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

app.listen(3000);
console.log("The YelpCamp Server Started!!!");