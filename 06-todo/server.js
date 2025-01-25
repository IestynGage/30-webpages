const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const app = express();
const { List } = require('./schema')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'njk');

const PORT = 3000;


nunjucks.configure('views', {
  // autoescape: true,
  express: app,
  watch: true
});




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



app.delete('/:id/item/:itemName', (req, res) => {
  const listId = req.params.id;
  const itemName = req.params.itemName;
  console.log(`DELETE: Remove item '${itemName} from list '${listId}',`);

  removeItem(listId, itemName)


  res.status(200).end();
});

app.post('/:id/item', (req, res) => {
  const listId = req.params.id; 
  const todoTask = req.body.task;

  console.log(`POST: Add '${todoTask}' to list '${listId}'`);

  if (todoTask !== '') {
    upsertItem(listId, todoTask);
    res.send(createListItem(listId, todoTask));
  }

  res.status(400).send();
});

function createListItem(listId, todoTask) {
  return `
    <li id="the-id-of-the-element" class="todo-item">
      ${todoTask}
      <button 
        hx-delete="/${listId}/item/${todoTask}" 
        hx-target="#the-id-of-the-element"
        hx-swap="outerHTML" 
        class="delete-btn" 
        hx-debug="true"
        >
        Delete
      </button>
    </li>`
}


async function getList(listName) {
  try {
    return await List.findOne({ id: listName });
  } catch (error) {
    console.error('Error retrieving lists:', error);
  }
}

app.get('/:id', async (req, res) => {
  const id = req.params.id;
  console.log(`Requested ID: ${id}`);
  const list = await getList(id);
  const todoLiElements = list !== null ? list.items.map(x => createListItem(id, x)).join('') : '';
  res.render('index', { listId: id, todo: todoLiElements });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});