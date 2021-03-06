var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var app = express();
var PORT = process.env.PORT || 3030;
var todos = [];
var todoNextId = 1;
app.use(bodyParser.json());
app.get('/', function(req,res){
res.send('TOdo API Root');
});

app.get('/todos', function(req,res){
	res.json(todos);
});

app.get('/todos/:id', function(req,res){
	var todoID = parseInt(req.params.id,10);
	var matchedTodo = _.findWhere(todos, {id: todoID});
	// todos.forEach(function(todo){
	// 	if(todoID === todo.id){
	// 		matchedTodo = todo;;
	// 	}
	// });
	if(matchedTodo){
		res.json(matchedTodo);

	}else{
		res.status(404).send();
	}
	// res.send('Asking for todo with id of'+ req.params.id);

});
//POST
app.post('/todos', function(req,res){
 var body = _.pick(req.body,'description','completed');
 if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
  return res.status(404).send();
 }

 body.description = body.description.trim();
 body.id = todoNextId++
 todos.push(body);
 console.log('description' +body.description);
 res.json(body);
});

//delete
app.delete('/todos/:id', function(req,res){
var todoID = parseInt(req.params.id,10);
var matchedTodo = _.findWhere(todos,{id:todoID});
if(!matchedTodo){
	res.status(404).json({"error": "no id found"});
} else {
	todos = _.without(todos,matchedTodo);
	res.json(matchedTodo);
}
});

//put /todos/:id

app.put('/todos/:id', function(req,res){
var todoID = parseInt(req.params.id,10);
var matchedTodo = _.findWhere(todos,{id:todoID});
 var body = _.pick(req.body,'description','completed');
 var validAttributes = {};

 if(!matchedTodo){
 	return res.status(404).send();
 }
 if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
 	validAttributes.completed = body.completed;
 }
 else if (body.hasOwnProperty('completed')){
 	return res.ststus(400).send();;
 } 
 if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length>0){
 	validAttributes.description = body.description;
 } else if (body.hasOwnProperty('description')){
 	return res.status(400).send();
 }

  _.extend(matchedTodo, validAttributes);
  res.json(matchedTodo);
});

app.listen(PORT,function(){
	console.log('express listening on port ' +PORT + '!');
});