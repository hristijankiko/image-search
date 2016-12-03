let express = require('express');
let app = express();
let axios = require('axios');
let mongoose = require('mongoose');
require('./models/db.js');
let SearchLog = mongoose.model('SearchLog');

app.get('/', function(req, res){
  res.send("test");
});

app.get('/api/logs', function(req, res){
  SearchLog.find(function(err, log){
    res.json(log.reverse());
  });
});

app.get('/api/imagesearch/:search', function(req, res){
  let date = new Date();
  SearchLog.create({
    term: req.params.search,
    when: date.toISOString()
  }, function(err, searchLog){
    if(err){
      console.log(err)
    }
  });

  let offset = req.query.offset * 10 || 1;
  if(offset >= 90 || offset < 0) {
    offset = 89;
  }
  axios.get('https://www.googleapis.com/customsearch/v1?key=AIzaSyAcFVAk3moyes4gABG5LrFl_60vS5n-vaQ&cx=009810781965235648955:uncn-ysrcl8&q=' + req.params.search + '&searchType=image' + '&start=' + offset)
  .then(function(images){
    let response = [];
    images.data.items.forEach(function(image){
      response.push({
        url: image.link,
        thumbnail: image.image.thumbnailLink,
        snippet: image.snippet,
        context: image.image.contextLink
      });
    });
    res.json(response);
    //Use this to get search results
    //res.json(images.data.items);
  })
  .catch(function(err){
    res.send("Daily api limit reached");
    console.log(err);
  });
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Listening at port 3000");
});