import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useVolumeStore = defineStore('volume', () => {
  const volume = ref(0)

  const playAudio = (_sources) => {
    // Audio playback disabled
  }

  const unmuteAudio = () => {
    // Audio unmute disabled
  }

  return { volume, playAudio, unmuteAudio }
})
