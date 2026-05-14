<template>
  <MetaUpdater />
  <section
    class="h-svh w-screen overflow-hidden bg-office-pic bg-no-repeat bg-cover bg-center relative"
    @mousedown="handleOutsideClick"
    @touchstart="handleOutsideClick"
  >
    <Header
      v-if="showHeader"
      :entities="entities"
      @toggle-header="toggleHeader"
      @toggle-about="openWindow('about')"
      @toggle-myProjects="openWindow('myProjects')"
      @toggle-contact="openWindow('contact')"
      @toggle-myCV="openWindow('myCV')"
      @toggle-documents="openWindow('documents')"
      @toggle-pictures="openWindow('pictures')"
      @toggle-music="openWindow('music')"
      @toggle-minesweeper="openWindow('minesweeper')"
      @toggle-skills="openWindow('skills')"
    />
    <DesktopAppsLayout
      :entities="entities"
      @toggle-about="openWindow('about')"
      @toggle-MyProjects="openWindow('myProjects')"
      @toggle-contact="openWindow('contact')"
      @toggle-myCV="openWindow('myCV')"
      @toggle-music="openWindow('music')"
      @toggle-minesweeper="openWindow('minesweeper')"
      @toggle-skills="openWindow('skills')"
      @toggle-substack="openSubstack()"
    />
    <div v-for="window in windows" :key="window.id">
      <Window
        v-if="isWindowVisible(window.id)"
        v-show="window.visible"
        @toggle-minimize="minimizeWindow(window.id)"
        @close-window="closeWindow(window.id)"
        @mousedown="handleWindowClick(window.id)"
        :id="window.id"
        :title="window.title"
        :iconSrc="window.iconSrc"
        :initPositionX="window.initPositionX"
        :initPositionY="window.initPositionY"
        :initWidth="window.initWidth"
        :initHeight="window.initHeight"
        :minWidth="window.minWidth"
        :minHeight="window.minHeight"
        :headerToolsId="window.headerToolsId"
        :menuHeaderItemsId="window.menuHeaderItemsId"
        :resizable="window.resizable"
        :windowsHeaderLogo="window.windowsHeaderLogo"
        :isSearchVisible="window.isSearchVisible"
        :initMaximized="true"
        :style="{ zIndex: findWindowZIndex(window.id) }"
      >
        <component :is="window.component" v-bind="window.leftMenuType ? { leftMenuType: window.leftMenuType } : {}" />
      </Window>
    </div>
    <Footer :entities="windows" @toggle-header="toggleHeader" @toggle-window="handleWindowClick" />
    <ClippyModal />
  </section>
</template>

<script setup>
import { ref, shallowRef, provide, onMounted } from 'vue'
import { useWindowsStore } from '@/stores/windowsStore.js'

import MetaUpdater from '../MetaUpdater.vue'
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'

import AboutMe from '@/components/Windows/AboutMe.vue'
import Minesweeper from '@/components/Windows/Minesweeper.vue'
import MyCV from '@/components/Windows/MyCV/MyCV.vue'
import Music from '@/components/Windows/Music/Music.vue'
import ContactMe from '@/components/Windows/ContactMe.vue'
import MyProjects from '@/components/Windows/MyProjects.vue'
import Documents from '@/components/Windows/Documents/Documents.vue'
import Pictures from '@/components/Windows/Pictures.vue'
import Skills from '@/components/Windows/Skills.vue'

import DesktopAppsLayout from '@/layouts/DesktopAppsLayout.vue'
import Window from '@/layouts/Window.vue'
import windowsData from '@/data/windows-data.json'
import ClippyModal from '@/components/Modals/ClippyModal.vue'

const showHeader = ref(false)
const windows = ref([])
const windowsStore = useWindowsStore()

onMounted(() => {
  windowsStore.loadState()
})

const highestZIndex = ref(0)
const activeWindow = ref(null)

const components = {
  AboutMe: shallowRef(AboutMe),
  MyProjects: shallowRef(MyProjects),
  ContactMe: shallowRef(ContactMe),
  MyCV: shallowRef(MyCV),
  Music: shallowRef(Music),
  Minesweeper: shallowRef(Minesweeper),
  Documents: shallowRef(Documents),
  Pictures: shallowRef(Pictures),
  Skills: shallowRef(Skills)
}

const entities = ref(
  windowsData.map((item) => ({
    ...item,
    component: components[item.component]
  }))
)

const toggleHeader = () => {
  showHeader.value = !showHeader.value
}

const setActiveWindow = (windowId) => {
  activeWindow.value = windowId
}

const openWindow = (windowId) => {
  const existingWindow = windows.value.find((window) => window.id === windowId)
  if (!existingWindow) {
    const entity = entities.value.find((entity) => entity.id === windowId)
    if (entity) {
      highestZIndex.value++
      windows.value.push({
        id: windowId,
        visible: true,
        component: shallowRef(entity.component),
        iconSrc: entity.iconSrc,
        title: entity.title,
        zIndex: highestZIndex.value,
        initPositionX: 0,
        initPositionY: 0,
        initWidth: entity.initWidth,
        initHeight: entity.initHeight,
        minWidth: entity.minWidth,
        minHeight: entity.minHeight,
        leftMenuType: entity.leftMenuType,
        headerToolsId: entity.headerToolsId,
        menuHeaderItemsId: entity.menuHeaderItemsId,
        resizable: entity.resizable,
        windowsHeaderLogo: entity.windowsHeaderLogo,
        isSearchVisible: entity.isSearchVisible
      })
      setActiveWindow(windowId)
      windowsStore.addWindowStore(windowId)
    }
  } else {
    handleWindowClick(windowId)
  }
}

const openSubstack = () => {
  window.open('https://masalafries.substack.com', '_blank')
}

const findWindowZIndex = (windowId) => {
  const window = windows.value.find((window) => window.id === windowId)
  return window ? window.zIndex : 0
}

const handleWindowClick = (windowId) => {
  const window = windows.value.find((window) => window.id === windowId)
  if (window) {
    if (!window.visible) {
      window.visible = true
    }
    if (window.zIndex !== highestZIndex.value) {
      highestZIndex.value++
      window.zIndex = highestZIndex.value
    }
    setActiveWindow(windowId)
  }
}

const closeWindow = (windowId) => {
  const windowIndex = windows.value.findIndex((window) => window.id === windowId)
  if (windowIndex !== -1) {
    windows.value.splice(windowIndex, 1)
    windowsStore.removeWindowStore(windowId)
  }
}

const minimizeWindow = (windowId) => {
  const window = windows.value.find((window) => window.id === windowId)
  if (window) {
    window.visible = false
    if (activeWindow.value === windowId) {
      activeWindow.value = null
    }
  }
}

const isWindowVisible = (windowId) => windows.value.some((window) => window.id === windowId)

const handleOutsideClick = (event) => {
  if (showHeader.value) {
    const headerElement = document.querySelector('.header-component')
    const startButtonElement = document.querySelector('.start-button')

    if (startButtonElement && startButtonElement.contains(event.target)) {
      return
    }

    if (headerElement && !headerElement.contains(event.target)) {
      toggleHeader()
    }
  }

  const clickedOutsideAnyWindow = windows.value.every((window) => {
    const windowElement = document.getElementById(window.id)
    return windowElement && !windowElement.contains(event.target)
  })

  if (clickedOutsideAnyWindow) {
    setActiveWindow(null)
  }
}

provide('highestZIndex', highestZIndex)
provide('activeWindow', activeWindow)
provide('openWindow', openWindow)
provide('minimizeWindow', minimizeWindow)

windowsStore.openWindowIds.forEach((windowId) => {
  openWindow(windowId)
})
</script>
