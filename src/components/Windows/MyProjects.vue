<script setup>
import { ref, reactive, watch, computed, onUnmounted, defineAsyncComponent } from 'vue'
import { marked } from 'marked'
import { useGoBackStore } from '@/stores/goBackStore'

import projectData from '@/data/projects-data.json'
import WindowLeftMenu from '@/components/Windows/WindowLeftMenu.vue'

marked.setOptions({ breaks: true, gfm: true })

// Per-project Vue components are opt-in: drop a file at
// src/components/Windows/MyProjects/<ComponentName>.vue and reference it via
// the project's `componentName` field in projects-data.json. If the file does
// not exist (or `componentName` is omitted), the JSON description/Retro is
// rendered through marked instead.
const projectComponentModules = import.meta.glob('./MyProjects/*.vue')

function renderMarkdown(src) {
  if (!src) return ''
  return marked.parse(src)
}

const props = defineProps({
  leftMenuType: String
})

const goBackStore = useGoBackStore()

onUnmounted(() => {
  goBackStore.currentActiveProject = null
})

const categories = ref(
  projectData.categories.map((category) => ({
    ...category,
    projects: category.projects.map((project) => ({ ...project, isFocus: false, isActive: false }))
  }))
)

const state = reactive({
  selectedProject: null
})

const focusProject = (project) => {
  if (project.isFocus) {
    return
  }

  project.isFocus = !project.isFocus

  categories.value.forEach((category) => {
    category.projects.forEach((p) => {
      if (p.name !== project.name) {
        p.isFocus = false
      }
    })
  })
  state.selectedProject = project
}

const toggleProject = (project) => {
  closeAllProjects()
  project.isActive = true
  state.selectedProject = project
  goBackStore.currentActiveProject = project
}

const closeAllProjects = () => {
  categories.value.forEach((category) => {
    category.projects.forEach((project) => {
      project.isActive = false
    })
  })
}

// Resolve componentName → async Vue component, or null if no matching file exists
const selectedComponent = computed(() => {
  const name = goBackStore.currentActiveProject?.componentName
  if (!name) return null
  const path = `./MyProjects/${name}.vue`
  const loader = projectComponentModules[path]
  return loader ? defineAsyncComponent(loader) : null
})

const renderedDescription = computed(() =>
  renderMarkdown(goBackStore.currentActiveProject?.description)
)
const renderedRetro = computed(() =>
  renderMarkdown(goBackStore.currentActiveProject?.Retro)
)

const getLocalizedCategoryName = (category) => category.name

const localizedTitle = computed(() => goBackStore.currentActiveProject?.name || '')

const localizedSubtitle = computed(() => goBackStore.currentActiveProject?.subtitle || '')

const localizedDate = computed(() => goBackStore.currentActiveProject?.date || '')

watch(
  () => goBackStore.currentActiveProject,
  (newProject) => {
    if (!newProject) {
      closeAllProjects()
    }
  },
  { immediate: true }
)

window.addEventListener('click', (e) => {
  if (!e.target.closest('.project-card') && state.selectedProject) {
    state.selectedProject.isFocus = false
    state.selectedProject = null
  }
})
</script>

<template>
  <div class="relative right-0 h-full flex overflow-hidden">
    <WindowLeftMenu :leftMenuType="props.leftMenuType" />
    <!-- Content of project -->
    <div v-if="goBackStore.currentActiveProject" class="flex-1 min-h-0 bg-white overflow-auto overflow-x-hidden pb-8 md:pb-5">
      <div class="m-2">
        <div class="w-full gap-4 mb-3">
          <h2 class="text-lg md:text-xl">{{ localizedTitle }}</h2>
          <p v-if="localizedSubtitle" class="text-sm text-gray-500 mt-0.5">{{ localizedSubtitle }}</p>
          <div class="flex items-center text-sm gap-0.5 mt-1" v-if="goBackStore.currentActiveProject.date">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
              <path
                fill="#000000"
                d="M9 10v2H7v-2zm4 0v2h-2v-2zm4 0v2h-2v-2zm2-7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h1V1h2v2h8V1h2v2zm0 16V8H5v11zM9 14v2H7v-2zm4 0v2h-2v-2zm4 0v2h-2v-2z"
              />
            </svg>
            <h2 class="text-sm md:text-base">{{ localizedDate }}</h2>
          </div>
          <div class="flex gap-2 mt-2">
            <a v-if="goBackStore.currentActiveProject.Code"
              :href="goBackStore.currentActiveProject.Code" target="_blank"
              class="text-sm border border-gray-400 px-4 py-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer">Code</a>
            <a v-if="goBackStore.currentActiveProject.Paper"
              :href="goBackStore.currentActiveProject.Paper" target="_blank"
              class="text-sm border border-gray-400 px-4 py-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer">Paper</a>
            <a v-if="goBackStore.currentActiveProject.githubUrl"
              :href="goBackStore.currentActiveProject.githubUrl" target="_blank"
              class="text-sm border border-gray-400 px-4 py-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer">Code</a>
            <a v-if="goBackStore.currentActiveProject.Blog"
              :href="goBackStore.currentActiveProject.Blog" target="_blank"
              class="text-sm border border-gray-400 px-4 py-1.5 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer">Blog</a>
          </div>
        </div>
        <div
          v-if="goBackStore.currentActiveProject.description"
          class="project-prose text-base mb-3"
          v-html="renderedDescription"
        />
        <div v-if="goBackStore.currentActiveProject.images && goBackStore.currentActiveProject.images.length" class="mb-3 flex flex-col gap-4">
          <figure v-for="(img, i) in goBackStore.currentActiveProject.images" :key="i" class="m-0 max-w-2xl">
            <img :src="img.src" :alt="img.caption || ''" class="w-full rounded border border-gray-200" />
            <figcaption v-if="img.caption" class="text-sm text-gray-500 mt-1.5 leading-snug">{{ img.caption }}</figcaption>
          </figure>
        </div>
        <div v-if="goBackStore.currentActiveProject.Retro" class="text-base mb-3">
          <p class="text-sm font-bold mb-1">Retro</p>
          <div class="project-prose" v-html="renderedRetro" />
        </div>
        <component v-if="selectedComponent" :is="selectedComponent" :project="goBackStore.currentActiveProject" class="mt-2" />
        <div v-if="goBackStore.currentActiveProject.techStack && goBackStore.currentActiveProject.techStack.length" class="mb-3">
          <p class="text-xs font-bold mb-1">Tech Stack:</p>
          <div class="flex flex-wrap gap-1">
            <span v-for="tech in goBackStore.currentActiveProject.techStack" :key="tech"
              class="text-xs border border-gray-400 px-2 py-0.5 bg-gray-50 rounded">{{ tech }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- Content window Foreach categories and projects -->
    <div v-else class="flex flex-col flex-1 min-h-0 bg-white overflow-auto pt-0.5">
      <div v-for="category in categories" :key="category.name" class="relative group mb-3">
        <h1 class="text-xs font-semibold px-3">{{ getLocalizedCategoryName(category) }}</h1>
        <div class="absolute left-[-12px] top-5 w-80 h-px bg-gradient-to-r from-blue-300 to-white"></div>

        <!-- Content for the projects -->
        <div class="flex flex-wrap gap-2 pt-2 md:pt-3 pb-3 w-full">
          <div
            v-for="project in category.projects"
            :key="project.name"
            @click="focusProject(project)"
            @dblclick="toggleProject(project)"
            class="flex items-center px-4 pb-2 gap-2.5 cursor-pointer project-card"
            :class="{ active: project.isFocus }"
          >
            <img :src="'/img/icons/' + project.icon" alt="project" class="w-10 h-10" :style="{ opacity: project.isFocus ? 0.5 : 1 }" />
            <p
              class="text-xs font-tahoma font-medium"
              :style="{
                backgroundColor: project.isFocus ? '#0B61FF' : 'transparent',
                color: project.isFocus ? 'white' : 'black'
              }"
            >
              {{ project.name }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.project-prose :deep(h1) { font-size: 1.05rem; font-weight: 700; margin: 0.8rem 0 0.3rem; }
.project-prose :deep(h2) { font-size: 1rem;    font-weight: 700; margin: 0.7rem 0 0.3rem; }
.project-prose :deep(h3) { font-size: 0.95rem; font-weight: 600; margin: 0.6rem 0 0.25rem; }
.project-prose :deep(p)  { margin: 0 0 0.6rem; }
.project-prose :deep(ul),
.project-prose :deep(ol) { margin: 0 0 0.6rem 1.25rem; }
.project-prose :deep(ul) { list-style: disc; }
.project-prose :deep(ol) { list-style: decimal; }
.project-prose :deep(li) { margin: 0.1rem 0; }
.project-prose :deep(a)  { color: #0B61FF; text-decoration: underline; }
.project-prose :deep(code) {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 0.88em;
  background: #f1f1f1;
  padding: 0 3px;
  border-radius: 2px;
}
.project-prose :deep(strong) { font-weight: 700; }
.project-prose :deep(em)     { font-style: italic; }
</style>
