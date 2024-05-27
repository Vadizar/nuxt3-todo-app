<template>
    <div>
        <input v-model="searchQuery" placeholder="Search by name" @input="fetchUsers" />
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in filteredUsers" :key="user.id" @click="navigateToTodos(user.id)">
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.phone }}</td>
            </tr>
            </tbody>
        </table>
        <button @click="prevPage" :disabled="page === 1">Previous</button>
        <button @click="nextPage" :disabled="!hasMoreUsers">Next</button>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const users = ref([]);
const page = ref(1);
const searchQuery = ref('');

const fetchUsers = async () => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const data = await response.json();
    users.value = data;
};

const filteredUsers = computed(() => {
    return users.value.filter(user =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    ).slice((page.value - 1) * 5, page.value * 5);
});

const hasMoreUsers = computed(() => {
    return users.value.length > page.value * 5;
});

const nextPage = () => {
    if (hasMoreUsers.value) {
    page.value++;
    }
};

const prevPage = () => {
    if (page.value > 1) {
    page.value--;
    }
};

const navigateToTodos = (userId: number) => {
    router.push(`/todos/${userId}`);
};

onMounted(fetchUsers);
</script>
  