import { defineStore } from 'pinia'
import type { Todo } from '@/types/Todo'

interface State {
    isLoading: boolean;
    userName: string;
    todos: Todo[];
}

export const useUserStore = defineStore({
    id: 'users',
    state: () => ({
        isLoading: false,
        users: [],
    }),
    actions: {
        async fetchUsers() {
            this.isLoading = true
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users')
                this.users = await response.json()
            }
            catch (error) {
                console.error(error)
                this.users = []
            }
            this.isLoading = false
        },
    }
})

export const useTodoStore = defineStore({
    id: 'todos',
    state: (): State => ({
        isLoading: false,
        userName: '',
        todos: [],
    }),
    actions: {
        async fetchUser(userId: string) {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
            return response.json()
        },
        async fetchTodos(userId: string) {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
            return response.json()
        },
        async fetchAndSetTodos(userId: string) {
            this.isLoading = true
            try {
                const [userData, todosData] = await Promise.all([
                    this.fetchUser(userId),
                    this.fetchTodos(userId)
                ])
                this.userName = userData.name
                this.todos = todosData
            } catch (error) {
                console.error(error)
                this.userName = ''
                this.todos = []
            } finally {
                this.isLoading = false
            }
        },
    }
})
