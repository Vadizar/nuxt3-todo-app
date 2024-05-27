<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="user in filteredUsers"
                    :key="user.id"
                    @click="navigateToTodos(user.id)"
                >
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.phone }}</td>
                </tr>
            </tbody>
        </table>
        <div>
            <button
                :disabled="page === 1"
                @click="prevPage"
            >
                Previous
            </button>
            <button
                :disabled="!hasMoreUsers"
                @click="nextPage"
            >
                Next
            </button>
        </div>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
  
const props = defineProps<{
    users: Array<{ id: number; name: string; email: string; phone: string }>
    page: number
    searchQuery: string
  }>()
  
const emit = defineEmits(['update:page', 'update:searchQuery'])
const router = useRouter()
  
const page = ref(props.page)
const searchQuery = ref(props.searchQuery)
  
const filteredUsers = computed(() => {
    return props.users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    ).slice((page.value - 1) * 5, page.value * 5)
})
  
const hasMoreUsers = computed(() => {
    return props.users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    ).length > page.value * 5
})
  
const nextPage = () => {
    if (hasMoreUsers.value) {
        page.value++
        emit('update:page', page.value)
    }
}
  
const prevPage = () => {
    if (page.value > 1) {
        page.value--
        emit('update:page', page.value)
    }
}
  
const navigateToTodos = (userId: number) => {
    router.push(`/todos/${userId}`)
}
  
watch(() => props.page, (newPage) => {
    page.value = newPage
})
  
watch(() => props.searchQuery, (newQuery) => {
    searchQuery.value = newQuery
})
</script>
  