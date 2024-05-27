<template>
    <div class="users">
        <table class="users__table">
            <thead>
                <tr class="users__row">
                    <th class="users__header">
                        Name
                    </th>
                    <th class="users__header">
                        Email
                    </th>
                    <th class="users__header">
                        Phone
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="user in filteredUsers"
                    :key="user.id"
                    class="users__row"
                >
                    <td class="users__cell">
                        <router-link :to="{ path: '/todos/' + user.id }">
                            {{ user.name }}
                        </router-link>
                    </td>
                    <td class="users__cell">
                        {{ user.email }}
                    </td>
                    <td class="users__cell">
                        {{ user.phone }}
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="users__controls">
            <button
                class="users__button"
                :disabled="page === 1"
                @click="prevPage"
            >
                Previous
            </button>
            <button
                class="users__button"
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
  
const props = defineProps<{
    users: Array<{ id: number; name: string; email: string; phone: string }>
    page: number
    searchQuery: string
  }>()
  
const emit = defineEmits(['update:page', 'update:searchQuery'])
  
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
  
watch(() => props.page, (newPage) => {
    page.value = newPage
})
  
watch(() => props.searchQuery, (newQuery) => {
    searchQuery.value = newQuery
})
</script>

<style lang="sass">
.users
    &__table
        width: 100%
        border-collapse: collapse
        margin-bottom: 2rem

    &__cell,
    &__header
        padding: 0.75rem
        text-align: left
        border-bottom: 1px solid #ddd
        width: 33.33%

    &__header
        background-color: #f2f2f2

    &__row:hover
        background-color: #f5f5f5

    &__button
        background-color: #4CAF50
        color: white
        border: none
        padding: 0.75rem 1.5rem
        cursor: pointer
        margin: 0 0.5rem

        &:disabled
            background-color: #ddd
            cursor: not-allowed

        &:hover:not(:disabled)
            background-color: #45a049
</style>
  