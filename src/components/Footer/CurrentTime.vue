<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const formattedTime = ref('')
let interval

function getCurrentTime() {
  const now = new Date()
  const hours = now.getHours() % 12 || 12
  const minutes = now.getMinutes()
  const amPm = now.getHours() >= 12 ? 'PM' : 'AM'
  return `${hours}:${minutes < 10 ? '0' : ''}${minutes} ${amPm}`
}

function updateTime() {
  formattedTime.value = getCurrentTime()
}

onMounted(() => {
  updateTime()
  interval = setInterval(updateTime, 2000)
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<template>
  <div class="flex flex-row">
    <h4 class="mx-px text-xxs md:text-xs cursor-default">{{ formattedTime }}</h4>
  </div>
</template>
