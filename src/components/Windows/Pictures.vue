<template>
  <div class="relative right-0 h-full flex overflow-hidden">
    <WindowLeftMenu :leftMenuType="props.leftMenuType" />
    <!-- Content of project -->
    <div class="w-full h-full bg-pictures-blue overflow-x-hidden flex flex-col">
      <!-- Carroussel -->
      <div class="flex flex-col items-center w-full flex-1 min-h-0 overflow-hidden">
        <div v-if="currentPicture" class="flex flex-col items-center flex-1 min-h-0 w-full max-w-[90%] pt-2">
          <div class="flex-1 min-h-0 flex items-center justify-center w-full">
            <img
              :src="currentPicture.src"
              :alt="currentPicture.alt"
              class="max-w-full max-h-full w-auto h-auto border border-black"
              :style="{ transform: `rotate(${rotation}deg)` }"
            />
          </div>
          <p class="font-trebuchet-pixel text-base text-black italic text-center mt-1 px-2 shrink-0">
            {{ currentPicture.description }}
          </p>
          <p class="font-trebuchet-pixel text-sm text-black text-center px-2 shrink-0">
            {{ currentPicture.location }}
          </p>
        </div>
        <p v-else>Loading...</p>
        <div class="flex py-2 shrink-0">
          <div class="flex gap-0.5">
            <button
              @click="previousPicture"
              class="flex items-center w-7 h-7 cursor-pointer rounded-sm hover:border border border-pictures-blue hover:border-gray-300 hover:shadow-header-tools p-1"
            >
              <img src="/img/icons/pictures/previous-icon.svg" :alt="$t('windows.pictures.previous')" />
            </button>
            <button
              @click="nextPicture"
              class="flex items-center w-7 h-7 cursor-pointer rounded-sm hover:border border border-pictures-blue hover:border-gray-300 hover:shadow-header-tools p-1"
            >
              <img src="/img/icons/pictures/next-icon.svg" :alt="$t('windows.pictures.next')" />
            </button>
          </div>
          <hr class="w-px mx-2 h-full bg-moon-mist" />
          <div class="flex">
            <button
              @click="rotateLeft"
              class="flex items-center w-7 h-7 cursor-pointer rounded-sm hover:border border border-pictures-blue hover:border-gray-300 hover:shadow-header-tools p-1"
            >
              <img src="/img/icons/pictures/left.svg" :alt="$t('windows.pictures.rotateLeft')" />
            </button>
            <button
              @click="rotateRight"
              class="flex items-center w-7 h-7 cursor-pointer rounded-sm hover:border border border-pictures-blue hover:border-gray-300 hover:shadow-header-tools p-1"
            >
              <img src="/img/icons/pictures/right.svg" :alt="$t('windows.pictures.rotateRight')" />
            </button>
          </div>
        </div>
      </div>
      <!-- Footer preview image -->
      <div class="w-full bg-white">
        <div class="flex w-full bg-no-repeat bg-32 bg-bottom-right-picture-menu bg-window-picture px-2 pt-1.5 pb-2 gap-4 overflow-x-auto">
          <div ref="pictureContainer" v-for="(picture, index) in pictures" :key="picture.id" class="flex-shrink-0 flex flex-col items-center">
            <img
              ref="pictureElements"
              @click="setCurrentPicture(picture)"
              :src="picture.src"
              :alt="picture.alt"
              :class="[
                'h-16 w-auto cursor-pointer object-contain',
                currentPicture && currentPicture.id === picture.id ? 'border-3 border-focus-blue' : 'border border-gray-300'
              ]"
            />
            <p
              @click="setCurrentPicture(picture)"
              :class="[
                'text-center inline-block font-trebuchet-pixel text-xxs cursor-pointer mt-1',
                currentPicture && currentPicture.id === picture.id ? 'bg-focus-blue px-1 my-px text-white' : ''
              ]"
            >
              {{ picture.title }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import WindowLeftMenu from '@/components/Windows/WindowLeftMenu.vue'
import picturesData from '@/data/pictures-data.json'

const props = defineProps({
  leftMenuType: String
})

let currentPicture = ref(null)
let currentIndex = ref(0)
const pictures = picturesData.pictures
const rotation = ref(0) // Define the rotation ref
const pictureContainer = ref(null)
const pictureElements = ref([])

onMounted(() => {
  if (pictures && pictures.length > 0) {
    setTimeout(() => {
      currentPicture.value = pictures[0]
      nextTick(() => scrollToCurrentPicture())
    }, 100)
  }
})

const setCurrentPicture = (picture) => {
  currentPicture.value = picture
  currentIndex.value = pictures.findIndex((p) => p.id === picture.id)
  nextTick(() => scrollToCurrentPicture())
}

const previousPicture = () => {
  if (currentIndex.value === 0) {
    currentIndex.value = pictures.length - 1
  } else {
    currentIndex.value--
  }
  currentPicture.value = pictures[currentIndex.value]
  nextTick(() => scrollToCurrentPicture())
}

const nextPicture = () => {
  if (currentIndex.value === pictures.length - 1) {
    currentIndex.value = 0
  } else {
    currentIndex.value++
  }
  currentPicture.value = pictures[currentIndex.value]
  nextTick(() => scrollToCurrentPicture())
}

const rotateLeft = () => {
  rotation.value -= 90
}

const rotateRight = () => {
  rotation.value += 90
}

const scrollToCurrentPicture = () => {
  const currentElement = pictureElements.value[currentIndex.value]
  if (currentElement) {
    currentElement.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }
}
</script>
