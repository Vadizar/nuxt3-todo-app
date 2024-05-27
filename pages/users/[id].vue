<template>
    <div>
        <h1 class="headline">
            User Details
        </h1>
        <button @click="goBack">
            Back to Todos
        </button>
        <p>Name: {{ user.name }}</p>
        <p>Email: {{ user.email }}</p>
        <p>Phone: {{ user.phone }}</p>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { User } from '@/types/User'

const router = useRouter()
const route = useRoute()
const userId = route.params.id as string

const user = ref<User | null>(null)

const fetchUser = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    const data: User = await response.json()
    user.value = data
}

const goBack = () => {
    router.push(`/todos/${userId}`)
}

onMounted(fetchUser)
</script>
