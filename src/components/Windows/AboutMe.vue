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
        <li>ML Engineer @ Simppl (Volunteer) (Oct '24 - Present)</li>
      </ul>
    </section>

    <section class="mb-4">
      <h2 class="text-base font-bold underline mb-2">Formerly</h2>
      <ul class="text-sm leading-relaxed list-disc list-inside space-y-1">
        <li>Graduate Teaching Assistant @ NYU for Responsible Data Science (Jan '25 - May '25)</li>
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

    <section class="mb-4 mt-4">
      <h2 class="text-base font-bold underline mb-2">About This Website</h2>
      <div class="text-sm leading-relaxed space-y-3">
        <p>I've had an XP themed website on my to-do list for a year now, and (with a little help from Claude) it's finally live!</p>
        <p>I wanted more than just a professional portfolio. I wanted a website that gave people a feel for the kind of person I am, and allowed them to explore a familiar setting on their own terms. An XP-themed desktop seemed like the perfect fit since it gives me the freedom to add as many sections as I want, in addition to being the first operating system most people in my generation used.</p>
        <p>Of course, this would've been entirely impossible without the work of other developers who created XP-themed website templates. I've linked the repos I used below:</p>
        <ul class="list-disc list-inside space-y-1 pl-2">
          <li><a href="https://github.com/UnMugViolet/portfolio" target="_blank" class="text-blue-700 underline hover:text-blue-900">github.com/UnMugViolet/portfolio</a></li>
          <li><a href="https://github.com/firwer/winxpsite" target="_blank" class="text-blue-700 underline hover:text-blue-900">github.com/firwer/winxpsite</a></li>
        </ul>
        <p>The Windows Media Player is my unique addition to this portfolio, but the bottom control bar relies on the excellent work done by David Cobbs in <a href="https://github.com/DavidJCobb/wmp-svg/" target="_blank" class="text-blue-700 underline hover:text-blue-900">github.com/DavidJCobb/wmp-svg</a>.</p>
        <p>Anyone who thinks frontend is finished with AI has clearly not tried to recreate a slightly complicated frontend design with no code reference.</p>
        <p>Feel free to share feedback and thoughts through the contact form. I hope you enjoy it!</p>
      </div>
    </section>

  </div>
</template>

<script setup>
import { inject } from 'vue'

const openWindow = inject('openWindow')
</script>
