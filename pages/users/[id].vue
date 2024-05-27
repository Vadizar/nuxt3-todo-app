<template>
    <div>
        <h1>User Details</h1>
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

const router = useRouter()
const route = useRoute()
const userId = route.params.id

const user = ref<any>({})

const fetchUser = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    const data = await response.json()
    user.value = data
}

const goBack = () => {
    router.push(`/todos/${userId}`)
}

onMounted(fetchUser)
</script>
  