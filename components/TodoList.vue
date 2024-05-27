<template>
    <div v-show="isLoading">
        Loading...
    </div>
    <div v-show="!isLoading">
        <h2>{{ userName }}</h2>
        <button @click="goBack">
            Back to Users
        </button>
        <ul>
            <li
                v-for="todo in todos"
                :key="todo.id"
            >
                <input
                    v-model="todo.completed"
                    type="checkbox"
                    disabled
                >
                {{ todo.title }}
            </li>
        </ul>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const userId = route.params.userId

const isLoading = ref(false)
const userName = ref('')
const todos = ref([])

const fetchTodos = async () => {
    isLoading.value = true
    try {
        const userPromise = fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(response => response.json())
        const todosPromise = fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`).then(response => response.json())

        const [userData, todosData] = await Promise.all([userPromise, todosPromise])

        userName.value = userData.name
        todos.value = todosData
    } catch (error) {
        console.error(error)
    } finally {
        isLoading.value = false
    }
}

const goBack = () => {
    router.push('/users')
}

onMounted(fetchTodos)
</script>