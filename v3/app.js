const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser"),
      mongoose   = require("mongoose"),
      Campground = require("./models/campground"),
      seedDB     = require("./seeds");

seedDB();      
mongoose.connect("mongodb://localhost:27017/yelp_camp", {useUnifiedTopology: true, useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// Campground.create({
//     name: "Eagle Point", 
//     image: "https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
//     description: "This is an eagle point, no bathrooms. No water. Beautiful eagle point"

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

//INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
    //res.render("campgrounds", {campgrounds: campgrounds});
});

//CREATE - add new campgrounds to DB
app.post("/campgrounds", function(req, res){
    //get data from form & add to campgrounds array
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const newCampground = {name: name, image: image, description: desc};
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

//NEW - show form to create new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

//SHOW - more info about campground
app.get("/campgrounds/:id", function(req, res){
    //Find the campground with the provided ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }
        else{
            //render show template with that campground
            res.render("show", {campground: foundCampground });
        }
    });
});

app.listen(3000);
console.log("The YelpCamp Server Started!!!");