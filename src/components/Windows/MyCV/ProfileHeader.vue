<script setup>
defineProps({ profile: Object })
</script>

<template>
  <div class="mb-1">
    <div class="flex justify-between items-center">
      <div class="flex-1" />
      <h1 class="font-tahoma text-xl font-bold">{{ profile.name }}</h1>
      <div class="flex-1 flex justify-end">
        <a
          href="/pdf/Naveed_Haris_resume.pdf"
          download="Naveed_Haris_resume.pdf"
          class="h-6 text-xxs border border-twilight-blue bg-button-submit rounded-sm leading-loose px-3 hover:shadow-button-submit-hover cursor-pointer active:bg-button-clicked font-trebuchet-pixel"
        >
          Download PDF
        </a>
      </div>
    </div>
    <p class="font-trebuchet-pixel text-sm text-gray-600 text-center">
      <a :href="'mailto:' + profile.email" class="hover:underline cursor-pointer">Email</a>
      <span class="mx-1">|</span>
      <a href="https://linkedin.com/in/harisnaveed" target="_blank" rel="noopener" class="hover:underline cursor-pointer">LinkedIn</a>
      <span class="mx-1">|</span>
      <a href="https://github.com/HarisNaveed17" target="_blank" rel="noopener" class="hover:underline cursor-pointer">GitHub</a>
    </p>
  </div>
</template>
