import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConnectionStore = defineStore('connection', () => {
  const status = ref('idle')

  const login = () => {
    status.value = 'connected'
  }

  const disconnect = () => {
    status.value = 'disconnected'
  }

  const restart = () => {
    status.value = 'restart'
  }

  return { status, login, disconnect, restart }
})
