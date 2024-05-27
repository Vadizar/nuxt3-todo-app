<template>
    <h1 class="headline">
        Users
    </h1>
    <input
        v-model="searchQuery"
        class="search-input"
        placeholder="Search by name"
        @input="onSearch"
    >
    <div v-if="isLoading">
        Loading...
    </div>
    <UserTable
        v-else
        :users="users"
        :page="currentPage"
        :search-query="searchQuery"
        @update:page="onPageUpdate"
    />
</template>
  
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UserTable from '~/components/UserTable.vue'
  
const route = useRoute()
const router = useRouter()
  
const users = ref([])
const currentPage = ref(parseInt(route.query.page as string) || 1)
const searchQuery = ref(route.query.search as string || '')
const isLoading = ref(false)

const fetchUsers = async () => {
    isLoading.value = true
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    users.value = await response.json()
    isLoading.value = false
}
  
const onSearch = () => {
    currentPage.value = 1
    updateRoute()
}
  
const onPageUpdate = (newPage: number) => {
    currentPage.value = newPage
    updateRoute()
}
  
const updateRoute = () => {
    router.push({ query: { page: currentPage.value.toString(), search: searchQuery.value } })
}
  
watchEffect(fetchUsers)
watchEffect(() => {
    currentPage.value = parseInt(route.query.page as string) || 1
    searchQuery.value = route.query.search as string || ''
})
</script>

<style lang="sass">
.search-input
    box-sizing: border-box
    width: 100%
    padding: 10px
    border: 1px solid #ccc
    border-radius: 4px
    margin: 10px 0
</style>
