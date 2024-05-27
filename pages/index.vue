<template>
    <UserTable />
</template>
  
<script lang="ts" setup>
import { useUserStore } from '~/store'

const userStore = useUserStore()
userStore.fetchUsers()
</script>
