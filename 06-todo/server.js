const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const { getList, upsertItem, removeItem } = require('./schema');
const { createListItem } = require('./html-utils');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'njk');

const PORT = 3000;

nunjucks.configure('views', {
  express: app,
  watch: true
});

app.delete('/:id/item/:itemName', (req, res) => {
  const listId = req.params.id;
  const itemName = req.params.itemName;
  console.log(`DELETE: Remove item '${itemName} from list '${listId}',`);

  removeItem(listId, itemName);

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

app.get('/:id', async (req, res) => {
  const id = req.params.id;
  console.log(`Requested ID: ${id}`);
  const list = await getList(id);
  const todoLiElements = list !== null ? list.items.map(x => createListItem(id, x)).join('') : '';
  res.render('index', { listId: id, todo: todoLiElements });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});