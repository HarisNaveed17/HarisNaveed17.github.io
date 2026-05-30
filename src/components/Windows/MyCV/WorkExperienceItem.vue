<template>
  <div class="mt-2 mb-3">
    <div class="flex justify-between items-baseline">
      <h4 class="font-tahoma font-bold text-sm">{{ workExperience.jobTitle }}</h4>
      <span class="font-trebuchet-pixel text-sm">{{ workExperience.year }}</span>
    </div>
    <div class="flex justify-between items-baseline">
      <p class="font-trebuchet-pixel italic text-sm">{{ workExperience.company }}</p>
      <span class="font-trebuchet-pixel text-sm">{{ workExperience.location }}</span>
    </div>
    <ul class="font-trebuchet-pixel list-disc pl-4 text-sm mt-1 space-y-0.5">
      <li v-for="(r, i) in workExperience.responsibilities" :key="i">{{ r }}</li>
    </ul>
  </div>
</template>

<script setup>
defineProps({ workExperience: Object })
</script>
