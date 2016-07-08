var express = require('express');
var bodyParser = require('body-parser');
var lowdb = require('lowdb');
var uuid = require('uuid');
var server = express();

var port = process.env.PORT || 8080;
var db = lowdb('db.json');

//Database Initialization
db.defaults({tools: []})
  .value(); //The .value() will run the above commands
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

server.get('/tools', function(request, response){
  // response.send('GET todos');
  var tools = db.get('tools')
                .value();
  response.send(tools);
});


server.get('/tools/:id', function(request, response){
  //response.send('GET todos :id');
  //console.log(request.params);
  var tool = db.get('tools')
                 .find({id: request.params.id})
                 .value();
  response.send(tool);
});

server.get('/tools/shelf/:shelfID', function(request, response){
  var toolsOnShelf = db.get('tools')
                      .find({shelfID: request.params.shelfID})
                      .value();
  response.send(toolsonShelf);
});



server.post('/tools', function(request, response){
  var newTool = {
                id: uuid.v4(),
                class: request.body.class,
                brand: request.body.brand,
                tradeName: request.body.tradeName,
                description: request.body.description,
                material: request.body.material,
                howConstructed: request.body.howConstructed,
                type: request.body.type,
                shelfID: request.body.shelfID,
                drawerID: request.body.drawerID,
                isBroken: false
              };
  var result = db.get('tools')
                 .push(newTool)
                 .last()
                 .value();
  response.send(result);
});

server.put('/tools/:id', function(request, response){
  console.log(request.body);
  //response.send('PUT todos :id');
  var updatedToolInfo = {
                          class: request.body.class,
                          brand: request.body.brand,
                          tradeName: request.body.tradeName,
                          description: request.body.description,
                          material: request.body.material,
                          howConstructed: request.body.howConstructed,
                          type: request.body.type,
                          shelfID: request.body.shelfID,
                          drawerID: request.body.drawerID,
                          isBroken: request.body.isBroken
                       };
  var updatedTool = db.get('tools')
                      .find({id: request.params.id})
                      .assign(updatedToolInfo)
                      .value();
  response.send(updatedTool);
});

server.delete('/tools/:id', function(request, response){
  //response.send('GET tools :id');
  //console.log(request.params);
  var tool = db.get('tools')
                 .remove({id: request.params.id})
                 .value();
  response.send(tool);
});

server.listen(port, function(){
  console.log('Now listening on port...' + port);
});
