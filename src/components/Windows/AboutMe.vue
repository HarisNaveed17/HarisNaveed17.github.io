<template>
  <div class="relative right-0 h-full overflow-auto bg-white p-4 font-trebuchet-pixel">
    <div class="flex items-center gap-4 mb-4 pb-3 border-b border-gray-200">
      <img src="/img/icons/documents/folder-docs-icon-sm.webp" alt="About Me" class="w-10 h-10" />
      <div>
        <h1 class="text-lg font-bold">Haris Naveed</h1>
        <p class="text-sm text-gray-500">Machine Learning Engineer</p>
      </div>
    </div>

    <section class="mb-4">
      <h2 class="text-base font-bold underline mb-2">About</h2>
      <p class="text-sm leading-relaxed">
        Pakistan - based ML Engineer with an MS in Data Science from NYU as a Fulbright Scholar.<br>
         
        My research interests are technical AI safety and algorithmic harm. At NYU, I TA'd for Dr. Emily Black's Responsible Data Science course and did my capstone project with Dr. Swapneel Mehta as part of SimPPL,
         a non-profit working to restore trust in the internet.<br>
        
        In a previous life, I was also an electrical engineering student at NUST, until I decided to exchange biasing transistors for bias-variance tradeoffs. :&#39;^)
      </p>
    </section>

    <section class="mb-4">
      <h2 class="text-base font-bold underline mb-2">Currently</h2>
      <ul class="text-sm leading-relaxed list-disc list-inside space-y-1">
        <li>Software Engineer - AI @ Motive (July '25 - Present)</li>
        <li>Research Affiliate @ Simppl (June '25 - Present)</li>
      </ul>
    </section>

    <section class="mb-4">
      <h2 class="text-base font-bold underline mb-2">Formerly</h2>
      <ul class="text-sm leading-relaxed list-disc list-inside space-y-1">
        <li>Graduate Teaching Assistant @ NYU (Jan '25 - May '25)</li>
        <li>Machine Learning Engineer @ Simppl (Oct '24 - May '25)</li>
        <li>Machine Learning Engineer @ DCube (July '21 - June '22)</li>
      </ul>
    </section>

    <section class="mb-4">
      <h2 class="text-base font-bold underline mb-2">Interests</h2>
      <p class="text-sm leading-relaxed">
        Outside of work, I'm interested in urban design, cultural evolution (especially in Pakistan) and travelling (you can
        find some pictures from my travels on this website too!)
      </p>
    </section>

    <section>
      <h2 class="text-base font-bold underline mb-2">Links</h2>
      <div class="flex flex-wrap gap-2">
        <button type="button" @click="openWindow('contact')"
           class="text-sm border border-gray-400 px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">
          Contact
        </button>
        <a href="https://github.com/HarisNaveed17" target="_blank"
           class="text-sm border border-gray-400 px-2 py-1 hover:bg-gray-100 rounded">
          GitHub
        </a>
        <a href="https://linkedin.com/in/harisnaveed" target="_blank"
           class="text-sm border border-gray-400 px-2 py-1 hover:bg-gray-100 rounded">
          LinkedIn
        </a>
        <a href="https://masalafries.substack.com" target="_blank"
           class="text-sm border border-gray-400 px-2 py-1 hover:bg-gray-100 rounded">
          Substack
        </a>
        <a href="/pdf/Naveed_Haris_resume.pdf" target="_blank"
           class="text-sm border border-gray-400 px-2 py-1 hover:bg-gray-100 rounded">
          Resume - 2026
        </a>
      </div>
    </section>


  </div>
</template>

<script setup>
import { inject } from 'vue'

const openWindow = inject('openWindow')
</script>
