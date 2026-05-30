<template>
  <div class="mt-2 mb-3">
    <div class="flex justify-between items-baseline">
      <h4 class="font-tahoma font-bold text-sm">{{ education.institution }}</h4>
      <span class="font-trebuchet-pixel text-sm">{{ education.location }}</span>
    </div>
    <div class="flex justify-between items-baseline">
      <p class="font-trebuchet-pixel italic text-sm">{{ education.degree }}</p>
      <span class="font-trebuchet-pixel text-sm">{{ education.year }}</span>
    </div>
    <p v-if="education.details" class="font-trebuchet-pixel text-sm mt-0.5">• {{ education.details }}</p>
  </div>
</template>

<script setup>
defineProps({ education: Object })
</script>
