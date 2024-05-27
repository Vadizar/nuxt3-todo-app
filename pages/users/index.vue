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
    <div v-if="store.isLoading">
        Loading...
    </div>
    <UserTable
        v-else
        :users="store.users"
        :page="currentPage"
        :search-query="searchQuery"
        @update:page="onPageUpdate"
    />
</template>
  
<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/store'

import UserTable from '~/components/UserTable.vue'
  
const route = useRoute()
const router = useRouter()
const store = useUserStore()
  
const currentPage = ref(parseInt(route.query.page as string) || 1)
const searchQuery = ref(route.query.search as string || '')
  
const onSearch = () => {
    currentPage.value = 1
    updateRoute()
}
  
const onPageUpdate = (newPage: number) => {
    currentPage.value = newPage
    updateRoute()
}
  
const updateRoute = () => {
    router.push({
        query: {
            page: currentPage.value.toString(),
            search: searchQuery.value,
        }
    })
}
  
watchEffect(store.fetchUsers)
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
