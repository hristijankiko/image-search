let mongoose = require('mongoose');

let searchLogSchema = new mongoose.Schema({
  term: String,
  when: Date
});

mongoose.model('SearchLog', searchLogSchema);