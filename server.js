var express = require("express");
var bodyParser = require('body-parser');
var fs = require("fs");
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/",function(req,res){
	res.send("Hello world from server.jsp!");
});

app.post("/addItem",function(req,res){
	var items = JSON.parse(fs.readFileSync(__dirname+"/set.json"));
	items.push(req.body);
	fs.writeFile(__dirname+"/set.json",JSON.stringify(items),function(err){
		if(err){
			return console.error(err);
		}
		console.log("Data writen is successfully!");
	});
});

app.get("/deleteItem",function(req,res){
		
});

app.get("/updateItem",function(req,res){
		
});

app.get("/listItem",function(req,res){
		
});

var server = app.listen(8081, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("listening at http://%s:%s",host,port);
});