const mongoose = require('mongoose');

const dbURL = 'mongodb://localhost:27017/mydb';
mongoose.connect(dbURL, {})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const todoItems = new mongoose.Schema({
  id: String,
  items: { 
    type: [String],
    required: true,
  },
});

const List = mongoose.model('List', todoItems);

module.exports = { List }