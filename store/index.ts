import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        users: [],
        page: 1,
        searchQuery: ''
    }),
    actions: {
        async fetchUsers() {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        this.users = data;
        }
    },
    getters: {
        filteredUsers: (state) => {
            return state.users.filter(user =>
                user.name.toLowerCase().includes(state.searchQuery.toLowerCase())
            ).slice((state.page - 1) * 5, state.page * 5);
        },
        hasMoreUsers: (state) => {
            return state.users.length > state.page * 5;
        }
    }
});
