<template>
    <div v-if="store.isLoading">
        <Loading />
    </div>
    <div v-else>
        <h1 class="headline">
            {{ store.userName }}
        </h1>
        <button
            class="button"
            @click="goBack"
        >
            Back to Users
        </button>
        <ul>
            <li
                v-for="todo in store.todos"
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
import { onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTodoStore } from '@/store'

import Loading from '~/components/Loading.vue'

const router = useRouter()
const route = useRoute()
const userId: string = route.params.userId as string

const store = useTodoStore()

const goBack = () => {
    router.push('/users')
}

onMounted(() => store.fetchAndSetTodos(userId))
</script>
