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

async function getList(listName) {
  try {
    return await List.findOne({ id: listName });
  } catch (error) {
    console.error('Error retrieving lists:', error);
  }
}

async function upsertItem(listName, newItem) {
  try {
    const updatedList = await List.findOneAndUpdate(
      { id: listName },
      { $push: { items: newItem } },
      { new: true, upsert: true }
    );

    return updatedList;
  } catch (error) {
    console.error('Error adding item to list or creating list:', error);
  }
}

async function removeItem(listName, itemToRemove) {
  try {
    const list = await getList(listName);
    const newItems = list.items.filter(x => x !== itemToRemove);

    const updatedList = await List.findOneAndUpdate(
      { id: listName }, 
      { $set: { items: newItems } },
      { new: true } 
    );

    return updatedList;

  } catch (error) {
    console.error('Error deleting item from list:', error);
  }
}

module.exports = { getList, upsertItem, removeItem }