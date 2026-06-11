<template>
  <Transition name="balloon">
    <div
      v-if="visible"
      class="wmp-balloon font-trebuchet-pixel"
      role="alert"
    >
      <!-- Close button -->
      <button class="wmp-balloon__close" @click="dismiss" aria-label="Close">✕</button>

      <!-- Title row -->
      <div class="wmp-balloon__title">
        <img src="/img/icons/mediaplayer/wmp_icon.png" alt="" class="w-4 h-4 flex-shrink-0" />
        <span>Windows Media Player</span>
      </div>

      <!-- Body -->
      <p class="wmp-balloon__body">
        Windows Media Player is only available on desktop computers. Please visit this site on a PC or Mac to play music.
      </p>

      <!-- Tail pointing down-right toward taskbar -->
      <div class="wmp-balloon__tail" />
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)
let autoTimer = null

function show() {
  visible.value = true
  autoTimer = setTimeout(dismiss, 15000)
}

function dismiss() {
  visible.value = false
  clearTimeout(autoTimer)
}

defineExpose({ show })
</script>

<style scoped>
.wmp-balloon {
  position: fixed;
  bottom: 52px;
  right: 12px;
  width: 220px;
  background: #fffde7;
  border: 1px solid #b0a060;
  border-radius: 6px;
  padding: 8px 24px 8px 8px;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.35);
  z-index: 9999;
}

.wmp-balloon__close {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 16px;
  height: 16px;
  font-size: 9px;
  line-height: 1;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
.wmp-balloon__close:hover { color: #cc0000; }

.wmp-balloon__title {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  font-weight: bold;
  color: #1a1a7a;
  margin-bottom: 5px;
  border-bottom: 1px solid #c8b870;
  padding-bottom: 4px;
}

.wmp-balloon__body {
  font-size: 11px;
  color: #333;
  line-height: 1.4;
  margin: 0;
}

/* Tail pointing down toward the taskbar */
.wmp-balloon__tail {
  position: absolute;
  bottom: -8px;
  right: 20px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 0px solid transparent;
  border-top: 8px solid #b0a060;
}
.wmp-balloon__tail::after {
  content: '';
  position: absolute;
  bottom: 1px;
  left: -7px;
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 0px solid transparent;
  border-top: 7px solid #fffde7;
}

/* Transition */
.balloon-enter-active,
.balloon-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.balloon-enter-from,
.balloon-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
