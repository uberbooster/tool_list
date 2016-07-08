var uuid = require('uuid');
//Constructor function
//How do I build this object?
function Tool(description, id){
  this.id = id || uuid.v4();
  this.description = description;
  this.isComplete = false;
  };
};

Tool.prototype.updateComplete = function(value){
  if(value.toLowerCase() === 'true'){
    this.isComplete = true;
  } else {
    this.isComplete = false;
  };



//sandbox
// var todo1 = new Todo('read my book');
// var todo2 = new Todo('practice programming');
// var todo3 = new Todo('go runnning...');
// console.log(todo1);
// todo1.updateComplete(true);
// console.log(todo1);
module.exports = Tool;
