<template>
  <div class="relative right-0 h-full bg-white">
    <div class="w-full h-full overflow-auto px-4 py-3">

      <ProfileHeader :profile="cvData.profile" />

      <hr class="my-2 border-black" />

      <section class="mb-3">
        <h2 class="font-tahoma text-sm font-bold uppercase tracking-widest mb-1">Education</h2>
        <EducationItem v-for="(edu, i) in cvData.education" :key="i" :education="edu" />
      </section>

      <hr class="my-2 border-black" />

      <section class="mb-3">
        <h2 class="font-tahoma text-sm font-bold uppercase tracking-widest mb-1">Experience</h2>
        <WorkExperienceItem v-for="(exp, i) in cvData.workExperience" :key="i" :workExperience="exp" />
      </section>

      <hr class="my-2 border-black" />

      <section class="mb-3">
        <h2 class="font-tahoma text-sm font-bold uppercase tracking-widest mb-1">Publications</h2>
        <p v-for="(pub, i) in cvData.publications" :key="i" class="font-trebuchet-pixel text-sm mt-1 font-bold">
          {{ pub.citation }}
        </p>
      </section>

      <hr class="my-2 border-black" />

      <section class="mb-3">
        <h2 class="font-tahoma text-sm font-bold uppercase tracking-widest mb-1">Projects</h2>
        <div v-for="(proj, i) in cvData.projects" :key="i" class="mt-2 mb-3">
          <p class="font-tahoma font-bold text-sm">
            {{ proj.title }} <span class="font-normal italic">| {{ proj.stack }}</span>
          </p>
          <ul class="font-trebuchet-pixel list-none pl-2 text-sm mt-1 space-y-0.5">
            <li v-for="(pt, j) in proj.points" :key="j">∗ {{ pt }}</li>
          </ul>
        </div>
      </section>

      <hr class="my-2 border-black" />

      <section class="mb-3">
        <h2 class="font-tahoma text-sm font-bold uppercase tracking-widest mb-1">Skills</h2>
        <p class="font-trebuchet-pixel text-sm"><span class="font-bold">Programming Languages/Frameworks:</span> {{ cvData.skills.languages }}</p>
        <p class="font-trebuchet-pixel text-sm"><span class="font-bold">Tools:</span> {{ cvData.skills.tools }}</p>
        <p class="font-trebuchet-pixel text-sm"><span class="font-bold">Libraries:</span> {{ cvData.skills.libraries }}</p>
      </section>

    </div>
  </div>
</template>

<script setup>
import cvData from '@/data/cv-data.json'
import ProfileHeader from './ProfileHeader.vue'
import EducationItem from './EducationItem.vue'
import WorkExperienceItem from './WorkExperienceItem.vue'
</script>
