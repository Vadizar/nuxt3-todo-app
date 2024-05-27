<template>
    <div v-show="isLoading">
        Loading...
    </div>
    <div v-show="!isLoading">
        <h1
            class="headline"
            @click="navigateToUser()"
        >
            {{ userName }}
        </h1>
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

import type { Ref } from 'vue'
import type { Todo } from '@/types/Todo'
import type { User } from '@/types/User'

const router = useRouter()
const route = useRoute()
const userId = route.params.userId as string

const isLoading: Ref<boolean> = ref(false)
const userName: Ref<string> = ref('')
const todos: Ref<Todo[]> = ref([])

const fetchTodos = async () => {
    isLoading.value = true
    try {
        const userPromise: Promise<User> = fetch(`https://jsonplaceholder.typicode.com/users/${userId}`).then(response => response.json())
        const todosPromise: Promise<Todo[]> = fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`).then(response => response.json())

        const [userData, todosData] = await Promise.all([userPromise, todosPromise])

        userName.value = userData.name
        todos.value = todosData
    } catch (error) {
        console.error(error)
    } finally {
        isLoading.value = false
    }
}

const navigateToUser = () => {
    router.push(`/users/${userId}`)
}

const goBack = () => {
    router.push('/users')
}

onMounted(fetchTodos)
</script>
