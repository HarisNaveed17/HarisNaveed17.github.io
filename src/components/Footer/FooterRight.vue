<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import CurrentTime from './CurrentTime.vue'

// Initialize refs
const isFullScreen = ref(false)
const originalTitle = ref('Full screen mode')

const enterFullScreen = () => {
  if (isFullScreen.value) {
    document.exitFullscreen()
    originalTitle.value = 'Full screen mode'
    isFullScreen.value = false
  } else {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen()
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen()
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen()
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen()
    }
    originalTitle.value = 'Exit full screen mode'
    isFullScreen.value = true
  }
}
</script>

<template>
  <div class="absolute right-0 text-white h-full flex items-center px-1.5 sm:px-3 gap-0.5 bg-footer-right-component footer-left-shadow select-none">
    <img class="w-4 h-4 cursor-pointer" src="/img/icons/full-screen-icon-sm.webp" alt="Full screen mode" :title="originalTitle" @click="enterFullScreen" />
    <CurrentTime />
  </div>
</template>
