<template>
  <div class="min-h-screen bg-gray-50 text-gray-900" style="font-family: 'Trebuchet MS', sans-serif">

    <!-- Header -->
    <header class="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-10">
      <div class="flex justify-between items-center max-w-lg mx-auto">
        <span class="font-bold text-base">[YOUR NAME]</span>
        <div class="flex gap-3 text-xs">
          <a href="https://github.com/HarisNaveed17" target="_blank" class="text-blue-600 underline">GitHub</a>
          <a href="https://linkedin.com/in/[YOUR_LINKEDIN]" target="_blank" class="text-blue-600 underline">LinkedIn</a>
          <a href="https://masalafries.substack.com" target="_blank" class="text-blue-600 underline">Substack</a>
        </div>
      </div>
    </header>

    <main class="max-w-lg mx-auto px-6 py-8 space-y-10">

      <!-- About -->
      <section>
        <h1 class="text-xl font-bold mb-1">[YOUR NAME]</h1>
        <p class="text-sm text-gray-500 mb-3">[YOUR TITLE — e.g. Machine Learning Engineer]</p>
        <p class="text-sm leading-relaxed text-gray-700">
          [Write a short bio here — who you are, what you do, what you're interested in. 2–3 sentences.]
        </p>
        <div class="flex flex-wrap gap-2 mt-4">
          <a href="/pdf/cv.pdf" target="_blank"
             class="text-xs border border-gray-400 bg-white px-3 py-1.5 rounded hover:bg-gray-100">
            Resume (PDF)
          </a>
          <a href="mailto:[YOUR_EMAIL]"
             class="text-xs border border-gray-400 bg-white px-3 py-1.5 rounded hover:bg-gray-100">
            Email Me
          </a>
        </div>
      </section>

      <hr class="border-gray-200" />

      <!-- Experience -->
      <section>
        <h2 class="text-sm font-bold uppercase tracking-wide text-gray-400 mb-4">Experience</h2>
        <div class="space-y-5">
          <div>
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm font-semibold">[JOB TITLE]</p>
                <p class="text-xs text-gray-500">[Company Name]</p>
              </div>
              <p class="text-xs text-gray-400 whitespace-nowrap ml-2">[Date Range]</p>
            </div>
            <ul class="mt-2 text-xs text-gray-600 space-y-1 list-disc list-inside">
              <li>[Key responsibility or achievement]</li>
              <li>[Key responsibility or achievement]</li>
            </ul>
          </div>
          <div>
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm font-semibold">[JOB TITLE]</p>
                <p class="text-xs text-gray-500">[Company Name]</p>
              </div>
              <p class="text-xs text-gray-400 whitespace-nowrap ml-2">[Date Range]</p>
            </div>
            <ul class="mt-2 text-xs text-gray-600 space-y-1 list-disc list-inside">
              <li>[Key responsibility or achievement]</li>
              <li>[Key responsibility or achievement]</li>
            </ul>
          </div>
        </div>
      </section>

      <hr class="border-gray-200" />

      <!-- Education -->
      <section>
        <h2 class="text-sm font-bold uppercase tracking-wide text-gray-400 mb-4">Education</h2>
        <div class="space-y-4">
          <div>
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm font-semibold">[DEGREE TITLE]</p>
                <p class="text-xs text-gray-500">[Institution Name]</p>
              </div>
              <p class="text-xs text-gray-400 whitespace-nowrap ml-2">[Year Range]</p>
            </div>
          </div>
          <div>
            <div class="flex justify-between items-start">
              <div>
                <p class="text-sm font-semibold">[DEGREE TITLE]</p>
                <p class="text-xs text-gray-500">[Institution Name]</p>
              </div>
              <p class="text-xs text-gray-400 whitespace-nowrap ml-2">[Year Range]</p>
            </div>
          </div>
        </div>
      </section>

      <hr class="border-gray-200" />

      <!-- Projects -->
      <section>
        <h2 class="text-sm font-bold uppercase tracking-wide text-gray-400 mb-4">Projects</h2>
        <div class="space-y-4">
          <div class="border border-gray-200 rounded p-3 bg-white">
            <p class="text-sm font-semibold">[Project Name]</p>
            <p class="text-xs text-gray-500 mt-1">[Short description of what this project does]</p>
            <div class="flex flex-wrap gap-1 mt-2">
              <span class="text-xs bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded">[Tech 1]</span>
              <span class="text-xs bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded">[Tech 2]</span>
            </div>
            <a href="https://github.com/HarisNaveed17/placeholder" target="_blank"
               class="text-xs text-blue-600 underline mt-2 inline-block">GitHub →</a>
          </div>
          <div class="border border-gray-200 rounded p-3 bg-white">
            <p class="text-sm font-semibold">[Project Name]</p>
            <p class="text-xs text-gray-500 mt-1">[Short description of what this project does]</p>
            <div class="flex flex-wrap gap-1 mt-2">
              <span class="text-xs bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded">[Tech 1]</span>
              <span class="text-xs bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded">[Tech 2]</span>
            </div>
            <a href="https://github.com/HarisNaveed17/placeholder" target="_blank"
               class="text-xs text-blue-600 underline mt-2 inline-block">GitHub →</a>
          </div>
        </div>
      </section>

      <hr class="border-gray-200" />

      <!-- Skills -->
      <section>
        <h2 class="text-sm font-bold uppercase tracking-wide text-gray-400 mb-4">Skills</h2>
        <div class="space-y-3">
          <div>
            <p class="text-xs font-semibold text-gray-600 mb-1">Machine Learning & AI</p>
            <div class="flex flex-wrap gap-1">
              <span class="text-xs bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded">[Framework 1]</span>
              <span class="text-xs bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded">[Framework 2]</span>
              <span class="text-xs bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded">[Framework 3]</span>
            </div>
          </div>
          <div>
            <p class="text-xs font-semibold text-gray-600 mb-1">MLOps & Infrastructure</p>
            <div class="flex flex-wrap gap-1">
              <span class="text-xs bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded">[Tool 1]</span>
              <span class="text-xs bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded">[Tool 2]</span>
            </div>
          </div>
          <div>
            <p class="text-xs font-semibold text-gray-600 mb-1">Programming Languages</p>
            <div class="flex flex-wrap gap-1">
              <span class="text-xs bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded">[Language 1]</span>
              <span class="text-xs bg-gray-100 border border-gray-200 px-1.5 py-0.5 rounded">[Language 2]</span>
            </div>
          </div>
        </div>
      </section>

      <hr class="border-gray-200" />

      <!-- Writing -->
      <section>
        <h2 class="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">Writing</h2>
        <a href="https://masalafries.substack.com" target="_blank"
           class="flex items-center gap-2 text-sm text-blue-600 underline">
          masalafries.substack.com →
        </a>
      </section>

    </main>

    <!-- Footer -->
    <footer class="border-t border-gray-200 px-6 py-4 mt-10 text-center">
      <p class="text-xs text-gray-400">
        Want the full experience?
        <a href="/" class="text-blue-600 underline">View desktop version</a>
      </p>
    </footer>

  </div>
</template>

<script setup>
</script>
