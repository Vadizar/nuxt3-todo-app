<template>
    <header>
        <nav>
            <NuxtLink to="/">
                Home
            </NuxtLink>
            <NuxtLink to="/users">
                Users
            </NuxtLink>
        </nav>
    </header>
    <main>
        <NuxtPage />
    </main>
</template>

<script lang="ts" setup>
</script>

<style lang="sass">
body
    font-family: Arial, sans-serif
    margin: 0
    padding: 0
    box-sizing: border-box

header
    background-color: #333
    color: white
    padding: 1rem

nav
    display: flex
    gap: 1rem

main
    padding: 1rem

button
    cursor: pointer
</style>
