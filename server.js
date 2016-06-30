var express = require('express');
var app = express();
var PORT = process.env.PORT || 3030;
app.get('/', function(req,res){
res.send('TOdo API Root');
});

app.listen(PORT,function(){
	console.log('express listening on port ' +PORT + '!');
});