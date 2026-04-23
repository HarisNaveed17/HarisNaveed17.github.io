<template>
  <ContentCenter class="bg-color-load-blue radial-gradient-loading">
    <template #top>
      <div class="absolute bg-color-load-header-blue w-full md:h-32 h-1/6 top-0 down-stroke-white-2" />
    </template>

    <template #center>
      <div class="flex w-full flex-col items-center gap-6">
        <img src="/img/winlogo.png" alt="Windows XP" class="w-16 h-16" />
        <LoginForm />
      </div>
    </template>

    <template #bottom>
      <div class="absolute bg-color-load-header-blue w-full md:h-48 h-1/5 bottom-0 up-stroke-green-2">
        <div class="flex flex-col justify-center items-center h-full gap-3">
          <div class="flex text-white md:text-sm text-xs font-bold">
            <h4>{{ $t('message.explainer') }}</h4>
          </div>
          <p class="text-white text-xs opacity-60 font-franklin">
            Best experienced on desktop
          </p>
        </div>
      </div>
    </template>
  </ContentCenter>
</template>

<script setup>
import LoginForm from '@/components/Loading/LoginForm.vue'
import ContentCenter from '@/layouts/ContentCenter.vue'
</script>
