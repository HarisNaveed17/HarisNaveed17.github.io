<template>
  <div class="relative right-0 h-content-window overflow-auto bg-white p-4 font-trebuchet-pixel">
    <div class="flex items-center gap-4 mb-4 pb-3 border-b border-gray-200">
      <img src="/img/icons/documents/folder-docs-icon-sm.webp" alt="About Me" class="w-10 h-10" />
      <div>
        <h1 class="text-base font-bold">[YOUR NAME]</h1>
        <p class="text-xs text-gray-500">[YOUR TITLE — e.g. Machine Learning Engineer]</p>
      </div>
    </div>

    <section class="mb-4">
      <h2 class="text-sm font-bold underline mb-2">About</h2>
      <p class="text-xs leading-relaxed">
        [Write a short bio here — who you are, what you do, what you're interested in. 2–3 sentences.]
      </p>
    </section>

    <section class="mb-4">
      <h2 class="text-sm font-bold underline mb-2">Currently</h2>
      <ul class="text-xs leading-relaxed list-disc list-inside space-y-1">
        <li>[Current role or project]</li>
        <li>[Another current thing — research, side project, etc.]</li>
      </ul>
    </section>

    <section class="mb-4">
      <h2 class="text-sm font-bold underline mb-2">Interests</h2>
      <p class="text-xs leading-relaxed">
        [What do you care about outside of work? Keep it personal.]
      </p>
    </section>

    <section>
      <h2 class="text-sm font-bold underline mb-2">Links</h2>
      <div class="flex flex-wrap gap-2">
        <a href="https://github.com/HarisNaveed17" target="_blank"
           class="text-xs border border-gray-400 px-2 py-1 hover:bg-gray-100 rounded">
          GitHub
        </a>
        <a href="https://linkedin.com/in/harisnaveed" target="_blank"
           class="text-xs border border-gray-400 px-2 py-1 hover:bg-gray-100 rounded">
          LinkedIn
        </a>
        <a href="https://masalafries.substack.com" target="_blank"
           class="text-xs border border-gray-400 px-2 py-1 hover:bg-gray-100 rounded">
          Substack
        </a>
        <a href="/pdf/Naveed_Haris_resume.pdf" target="_blank"
           class="text-xs border border-gray-400 px-2 py-1 hover:bg-gray-100 rounded">
          Resume (PDF)
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
</script>
