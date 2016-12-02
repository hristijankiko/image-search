let express = require('express');
let app = express();

app.get('/', function(req, res){
  res.send("test");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Listening at port 3000");
});