<template>
    <header class="header">
        <nav class="header__nav">
            <NuxtLink
                class="header__link"
                to="/"
            >
                Home
            </NuxtLink>
            <NuxtLink
                class="header__link"
                to="/users"
            >
                Users
            </NuxtLink>
        </nav>
    </header>
    <main class="main">
        <NuxtPage />
    </main>
</template>

<style lang="sass">
body
    font-family: Arial, sans-serif
    margin: 0
    padding: 0
    box-sizing: border-box

button
    cursor: pointer

.header
    background-color: #333
    color: white
    padding: 1rem
    &__nav
        display: flex
        gap: 1rem
    &__link
        color: white
        text-decoration: none
        &:hover
            text-decoration: underline

.main
    padding: 1rem

.headline
    font-size: 2rem
    margin: 10px 0
    color: #333
    font-weight: 400
</style>
