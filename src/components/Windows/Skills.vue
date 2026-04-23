<template>
  <div class="relative right-0 h-content-window flex overflow-y-auto bg-white pb-14">
    <div class="w-full font-trebuchet-pixel p-3">
      <div v-for="category in skillsData.categories" :key="category.name" class="mb-5">
        <h2 class="text-sm font-bold mb-2 pb-1 border-b border-gray-300">{{ category.name }}</h2>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="skill in category.skills"
            :key="skill"
            class="text-xs border border-gray-400 px-2 py-1 bg-gray-50 rounded"
          >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import skillsData from '@/data/skills-data.json'
</script>
