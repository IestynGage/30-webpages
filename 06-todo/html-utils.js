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

module.exports = { createListItem }