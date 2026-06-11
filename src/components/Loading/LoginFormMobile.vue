<script setup>
import { useConnectionStore } from '@/stores/connectionStore'
import ProfilePicture from '@/components/ProfilePicture.vue'

const connectionStore = useConnectionStore()

const handleLogin = () => {
  new Audio('/sounds/start-windows.mp3').play().catch(() => {})
  connectionStore.login()
}
</script>

<template>
  <div @click="handleLogin" class="cursor-pointer outline-none">
    <div class="flex flex-col items-center justify-center text-white gap-4">
      <ProfilePicture class="w-28 h-28 stroke-yellow-2" />
      <h2 class="text-lg">Haris Naveed</h2>
    </div>
  </div>
</template>
