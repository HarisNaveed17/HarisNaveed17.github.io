import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGoBackStore = defineStore('goBack', () => {
  const currentActiveProject = ref(null)
  const currentActiveDocument = ref(null)
  const currentActiveService = ref(null)

  return { currentActiveProject, currentActiveDocument, currentActiveService }
})
