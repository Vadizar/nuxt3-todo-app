<template>
    <div>
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
    </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
/* Добавьте свои стили здесь */
header {
  background-color: #333;
  color: white;
  padding: 1rem;
}
nav {
  display: flex;
  gap: 1rem;
}
main {
  padding: 1rem;
}
</style>
