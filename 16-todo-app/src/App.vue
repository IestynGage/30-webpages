<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center">
    <h1 class="text-2xl font-bold text-gray-800 mb-4">Vue TODO App</h1>
    <div class="flex gap-2 mb-4">
      <input v-model="newTask" @keyup.enter="addTask" placeholder="Add a new task"
        class="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
      <button @click="addTask" class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Add</button>
    </div>
    <ul class="space-y-2">
      <li v-for="(task, index) in tasks" :key="index" :class="{ 'line-through text-gray-500': task.completed }"
        class="flex justify-between items-center p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
        <span @click="toggleTask(index)">{{ task.text }}</span>
        <button @click="removeTask(index)"
          class="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: '',
      tasks: []
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== '') {
        this.tasks.push({ text: this.newTask, completed: false });
        this.newTask = '';
      }
    },
    toggleTask(index) {
      this.tasks[index].completed = !this.tasks[index].completed;
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    }
  }
};
</script>

<style>
@import 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
</style>
