<template>
    <div>
        <h2>{{ userName }}</h2>
        <button @click="goBack">Back to Users</button>
        <ul>
            <li v-for="todo in todos" :key="todo.id">
                <input type="checkbox" v-model="todo.completed" disabled />
                {{ todo.title }}
            </li>
        </ul>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const userId = route.params.userId;

const userName = ref('');
const todos = ref([]);

const fetchTodos = async () => {
    const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const userData = await userResponse.json();
    userName.value = userData.name;

    const todosResponse = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`);
    const todosData = await todosResponse.json();
    todos.value = todosData;
};

const goBack = () => {
    router.push('/users');
};

onMounted(fetchTodos);
</script>
  