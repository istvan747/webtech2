var express = require("express");
var bodyParser = require('body-parser');
var fs = require("fs");
var app = express();
var JSON_FILE_PATH = __dirname+"/set.json";

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/",function(req,res){
	res.send("Hello world from server.jsp!");
});

app.post("/addItem",function(req,res){
	var items = itemsReadFromJSONFile(JSON_FILE_PATH);
	var reqItem = req.body;
	var exists = false;
	for(i in items){
		var item = items[i];
		if(item.itemNumber == reqItem.itemNumber){
			exists = true;
			break;
		}
	}
	if(!exists){
		items.push(req.body);
		itemsWriteToJSONFile(items);
		console.log("Item update is successfully!");
		res.send("");
	}else{
		console.log("Item is exists!");
		res.send("");		
	}

});

app.get("/deleteitem",function(req,res){
	if(req.query == undefined){
		return;
	}
	if(req.query["itemnumber"] == undefined){
		return;
	}
	console.log("delete is run ...");
	var items = itemsReadFromJSONFile(JSON_FILE_PATH);
	items = items.filter(function(item){ return item.itemNumber != req.query['itemnumber'] });
	itemsWriteToJSONFile(items);
	console.log("Item delete is successfully!");
	res.send("");
});

app.post("/updateItem",function(req,res){
	var reqItem = req.body;
	var items = itemsReadFromJSONFile(JSON_FILE_PATH);
	for(i in items){
		var item = items[i];
		if(item.itemNumber == reqItem.itemNumber){
			item.appelation = reqItem.appelation;
			item.quantity = reqItem.quantity;
			item.storage = reqItem.storage;
			itemsWriteToJSONFile(items);
			break;		
		}
	}
	console.log("Item update is successfully!");
	res.send("");
});

app.get("/listItem",function(req,res){
	var items = JSON.parse(fs.readFileSync(__dirname+"/set.json"));
	res.send(items);	
});

function itemsWriteToJSONFile(items){
	fs.writeFile(__dirname+"/set.json",JSON.stringify(items),function(err){
		if(err){
			return console.error(err);
		}
		console.log("Data writen is successfully!");
	});	
}

function itemsReadFromJSONFile(file){
	return JSON.parse(fs.readFileSync(file));
}

var server = app.listen(8081, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("listening at http://%s:%s",host,port);
});