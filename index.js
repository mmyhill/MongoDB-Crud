var express = require("express");
var colors = require("colors");
var mongoose = require("mongoose");
const  bodyParser = require("body-parser")

var snowSchema = mongoose.Schema({
	inches : Number,
	date: Date,
	location: String
});


var Snow = mongoose.model('Snow', snowSchema);

var promise = mongoose.connect('mongodb://localhost',{
 useMongoClient: true
}, function(err){
	if(err){
		throw err;
	}else{
		console.log("Database connection successful".trap.rainbow);
	}
});

var app = express();
app.use(bodyParser.urlencoded({extended: true }));
app.get('/', function(req, res){
	res.sendFile(__dirname+ "/index.html");
});

//Create

app.post("/create", function(req, res){
	console.log(req.body)
	Snow.create({inches : req.body.inches, date : req.body.date, location: req.body.location}, function(err,data){
		if(err) throw err;
	})
	res.redirect("/")
});

//Read

app.post('/read', function(req, res) {
	Snow.find({location: req.body.location}, function(err, data){
		if(err){
			throw err;
		}else{
			var toReturn = "";
			for(toFind of data){
				toReturn += "Location: " + toFind.location + " Date: " + toFind.date + " Inches: "
				+ toFind.inches + "<br>";
			}
		}
		res.send(toReturn);
	})
})

//Update
  app.post('/update', function(req, res) {
		Snow.update({location: req.body.location, date: req.body.date}, {inches : req.body.inches, location: req.body.location, date: req.body.date}, function(err, data){
			if(err){
				throw err;
			}else{
		res.redirect("/");
		}
	})
	})

	app.post('/delete', function(req, res) {
		Snow.remove({location: req.body.location, date: req.body.date}, function(err, data){
			if(err){
				throw err;
			}else{
				res.redirect("/")
			}
		}
			)
	})



// app.get('/mOARSNOW', function(req, res) {
// 	Snow.create({inches : Math.random()*45},
// 		function(err, data){
// 			if(err){
// 				throw err;
// 			}else{
// 				res.send(data.inches + " inches of snow");
// 				console.log(data);
// 			}
// 	});
// });
//
// app.get('/showSnow', function(req, res){
// 	Snow.find({}, function(err, data){
// 		if(err){
// 			throw err;
// 		}else{
// 			res.send("<h1>"+data.length+"</h1>");
// 			res.send("<p>"+data+"</p>");
// 		}
//
// 	});
// });


app.listen(8000);
