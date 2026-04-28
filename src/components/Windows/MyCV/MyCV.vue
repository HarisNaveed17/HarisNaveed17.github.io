<template>
  <div class="relative right-0 h-full bg-white">
    <iframe
      v-if="!pdfMissing"
      :key="maximized"
      :src="iframeSrc"
      class="w-full h-full border-0"
      title="CV"
    />
    <div v-else class="absolute inset-0 flex flex-col items-center justify-center text-sm text-gray-500 font-trebuchet-pixel gap-2">
      <p>CV not found.</p>
      <p class="text-xs">Add your PDF to <code>public/pdf/Naveed_Haris_resume.pdf</code></p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted } from 'vue'

const pdfMissing = ref(false)
const maximized = inject('windowMaximized', ref(false))

const iframeSrc = computed(() =>
  `/pdf/Naveed_Haris_resume.pdf${maximized.value ? '#zoom=125' : ''}`
)

onMounted(async () => {
  try {
    const res = await fetch('/pdf/Naveed_Haris_resume.pdf', { method: 'HEAD' })
    if (!res.ok) pdfMissing.value = true
  } catch {
    pdfMissing.value = true
  }
})
</script>
