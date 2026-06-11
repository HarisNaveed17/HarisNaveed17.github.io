<template>
  <div
    class="h-full flex flex-col overflow-hidden select-none"
    style="background:#0c0c0c; font-family:Tahoma,Arial,sans-serif;"
    @dragover.prevent
    @drop.prevent="handleDrop"
  >
    <!-- ━━ TOP BAR — dropdown menus + tabs ━━ -->
    <div class="wmp-topbar">
      <div class="wmp-arrows">
        <button class="wmp-arrow-btn" aria-label="Back">
          <svg class="wmp-arrow-glyph" viewBox="0 0 16 16">
            <polyline points="8,3 3,8 8,13" />
            <line x1="3" y1="8" x2="13" y2="8" />
          </svg>
        </button>
        <button class="wmp-arrow-btn wmp-arrow-btn--dim" aria-label="Forward">
          <svg class="wmp-arrow-glyph" viewBox="0 0 16 16">
            <polyline points="8,3 13,8 8,13" />
            <line x1="3" y1="8" x2="13" y2="8" />
          </svg>
        </button>
      </div>
      <div class="wmp-nav">
        <a href="#" class="wmp-nav-tab wmp-nav-tab--active">
          <span class="wmp-nav-tab__label">Now Playing</span>
        </a>
        <div class="wmp-nav-rest">
          <a href="#" class="wmp-nav-tab">Library</a>
          <a href="#" class="wmp-nav-tab">Rip</a>
          <a href="#" class="wmp-nav-tab">Burn</a>
          <a href="#" class="wmp-nav-tab">Sync</a>
        </div>
        <span class="wmp-nav-chevron">»</span>
      </div>
    </div>

    <!-- ━━ MAIN AREA ━━ -->
    <div class="flex flex-1 min-h-0">
      <!-- Visualization canvas -->
      <div class="flex-1 relative overflow-hidden" style="background:#000;">
        <canvas ref="canvasRef" class="absolute inset-0 w-full h-full" />
      </div>

      <!-- Right sidebar -->
      <div
        class="flex flex-col flex-shrink-0 overflow-hidden"
        style="width:178px; background:#e8e8e8; border-left:1px solid #999;"
      >
        <!-- Album art + info -->
        <div class="flex flex-col items-center py-3 px-2 flex-shrink-0 border-b border-gray-300">
          <img
            v-if="isDefaultActive"
            src="/img/album_cover.png"
            alt="Album cover"
            class="flex-shrink-0 object-cover"
            style="width:76px;height:76px;border:1px solid #bbb;border-radius:2px;"
          />
          <div
            v-else
            class="flex items-center justify-center flex-shrink-0"
            style="width:76px;height:76px;background:#cdcdcd;border:1px solid #bbb;border-radius:2px;"
          >
            <svg viewBox="0 0 24 24" fill="#999" width="38" height="38">
              <path d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3h-6z"/>
            </svg>
          </div>
          <p
            class="text-center mt-1.5 w-full overflow-hidden"
            style="color:#c87800;font-size:11px;font-weight:bold;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;"
          >
            {{ displayTitle }}
          </p>
          <!--
            ARTIST PLACEHOLDER
            Replace DEFAULT_ARTIST in the script below with the real artist name.
          -->
          <p style="color:#888;font-size:10px;text-align:center;margin-top:1px;">{{ displayArtist }}</p>
        </div>

        <!-- Playlist header -->
        <div
          class="flex items-center justify-between px-2 py-1 flex-shrink-0 border-b border-gray-300"
          style="background:#ddd;font-size:11px;"
        >
          <span style="font-weight:bold;color:#222;">Now Playing</span>
          <span style="color:#c87800;font-size:10px;">▼</span>
        </div>

        <!-- Default track entry — always visible -->
        <div
          class="px-2 py-1 flex-shrink-0 border-b border-gray-200 cursor-pointer"
          style="font-size:11px;background:#f4f4f4;"
          @click="playDefault"
        >
          <span :style="{ color: (isDefaultActive && isPlaying) ? '#0050bb' : '#555', marginRight: '3px' }">{{ isDefaultActive && isPlaying ? '▶' : '◼' }}</span>
          <span
            class="truncate"
            style="color:#0050bb;display:inline-block;max-width:140px;vertical-align:bottom;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"
          >{{ DEFAULT_TITLE }}</span>
        </div>

        <!-- Uploaded track entry — visible once a file is loaded -->
        <div
          v-if="customTrackName"
          class="px-2 py-1 flex-shrink-0 border-b border-gray-200 cursor-pointer"
          style="font-size:11px;background:#f4f4f4;"
          @click="playCustom"
        >
          <span :style="{ color: (!isDefaultActive && isPlaying) ? '#0050bb' : '#555', marginRight: '3px' }">{{ !isDefaultActive && isPlaying ? '▶' : '◼' }}</span>
          <span
            class="truncate"
            style="color:#0050bb;display:inline-block;max-width:140px;vertical-align:bottom;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"
          >{{ customTrackName }}</span>
        </div>

        <!-- Time display -->
        <div class="px-2 py-1 flex-shrink-0 border-b border-gray-200" style="font-size:10px;color:#666;background:#f4f4f4;">
          {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
        </div>

        <!-- Open file (pushed to bottom) -->
        <div class="mt-auto flex-shrink-0 px-2 py-2 border-t border-gray-300" style="background:#ddd;">
          <button @click="openFile" class="wmp-openfile-btn w-full text-left" style="font-size:10px;padding:3px 6px;">
            Open File…
          </button>
          <p style="font-size:9px;color:#999;margin-top:3px;text-align:center;">or drop audio file here</p>
        </div>
      </div>
    </div>

    <!-- ━━ REAL WM-PLAYER CONTROLS TRAY ━━ -->
    <!-- The wm-player web component provides the authentic WMP controls:        -->
    <!-- jewel play/pause button, seek slider, prev/next, stop, shuffle, loop,  -->
    <!-- mute, volume slider — all pixel-perfect SVG sprite assets.             -->
    <wm-player
      ref="wmpRef"
      data-theme="dark"
      style="display:block; width:100%; height:69px; flex-shrink:0; --max-video-height:0px; --min-video-height:0px;"
    />

    <input ref="fileInputRef" type="file" accept="audio/*" class="hidden" @change="handleFileInput" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import butterchurn from 'butterchurn'
import butterchurnPresets from 'butterchurn-presets'

const wmpRef       = ref(null)   // <wm-player> DOM element
const canvasRef    = ref(null)
const fileInputRef = ref(null)

const isPlaying       = ref(false)
const currentTime     = ref(0)
const duration        = ref(0)
const customTrackName = ref(null)
const isDefaultActive = ref(true)

const DEFAULT_TITLE  = 'Need You'
const DEFAULT_ARTIST = 'Lost Sky'
const DEFAULT_SRC    = '/sounds/Lost Sky - Need You [NCS Release].mp3'

const displayTitle  = computed(() => isDefaultActive.value ? DEFAULT_TITLE : (customTrackName.value ?? DEFAULT_TITLE))
const displayArtist = computed(() => isDefaultActive.value ? DEFAULT_ARTIST : '')

// Butterchurn (MilkDrop) visualization — random preset cycler
const PRESET_HOLD_SECS  = 15       // auto-advance interval
const PRESET_BLEND_SECS = 5.7      // crossfade duration

// Curated Alchemy-style preset subset — painterly/organic/glow-blob/persistence,
// excluding tunnels, fractals, kaleidoscopes, and sharp geometric patterns.
const ALCHEMY_PRESET_NAMES = [
  '_Aderrasi - Wanderer in Curved Space - mash0000 - faclempt kibitzing meshuggana schmaltz (Geiss color mix)',
  '_Geiss - Artifact 01',
  '_Geiss - Desert Rose 2',
  '_Geiss - untitled',
  'Aderrasi + Geiss - Airhandler (Kali Mix) - Canvas Mix',
  'Aderrasi - Potion of Spirits',
  'Aderrasi - Songflower (Moss Posy)',
  'Aderrasi - Storm of the Eye (Thunder) - mash0000 - quasi pseudo meta concentrics',
  'An AdamFX n Martin Infusion 2 flexi - Why The Sky Looks Diffrent Today - AdamFx n Martin Infusion - Tack Tile Disfunction B',
  'cope + martin - mother-of-pearl',
  'Cope - The Neverending Explosion of Red Liquid Fire',
  'Eo.S. - glowsticks v2 05 and proton lights (+Krash′s beat code) _Phat_remix02b',
  'fiShbRaiN + Flexi - witchcraft 2.0',
  'flexi + amandio c - organic [random mashup]',
  'flexi + fishbrain - neon mindblob grafitti',
  'Flexi + Martin - astral projection',
  'Flexi - alien fish pond',
  'flexi - bouncing balls [double mindblob neon mix]',
  'Flexi - infused with the spiral',
  'Flexi - mindblob [shiny mix]',
  'Flexi - mindblob mix',
  'flexi - mom, why the sky looks different today',
  'flexi - swing out on the spiral',
  'Geiss + Flexi + Martin - disconnected',
  'Geiss - Cauldron - painterly 2 (saturation remix)',
  'Geiss - Spiral Artifact',
  'Krash + Illusion - Spiral Movement',
  'martin - ghost city',
  'Martin - liquid arrows',
  'Martin - QBikal - Surface Turbulence IIb',
  'martin - stormy sea (2010 update)',
  'martin - witchcraft reloaded',
  'Zylot - Paint Spill (Music Reactive Paint Mix)',
]

let audioCtx       = null
let sourceNode     = null
let visualizer     = null
let presetTimer    = null
let rafId          = null
let currentBlobUrl = null
let presetKeys     = []
let lastPresetIdx  = -1

function pickNextPresetName() {
  if (!presetKeys.length) return null
  let idx
  do { idx = Math.floor(Math.random() * presetKeys.length) }
  while (presetKeys.length > 1 && idx === lastPresetIdx)
  lastPresetIdx = idx
  return presetKeys[idx]
}

function loadRandomPreset(blendTime = PRESET_BLEND_SECS) {
  if (!visualizer) return
  const name = pickNextPresetName()
  if (!name) return
  const allPresets = butterchurnPresets.getPresets()
  visualizer.loadPreset(allPresets[name], blendTime)
}

function setupVisualizer() {
  if (visualizer) {
    if (audioCtx?.state === 'suspended') audioCtx.resume()
    return
  }
  const canvas  = canvasRef.value
  const videoEl = wmpRef.value?.shadowRoot?.querySelector('video')
  if (!canvas || !videoEl) return

  audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  audioCtx.resume()

  const dpr = window.devicePixelRatio || 1
  const W   = canvas.parentElement.clientWidth
  const H   = canvas.parentElement.clientHeight
  canvas.width  = Math.max(1, Math.floor(W * dpr))
  canvas.height = Math.max(1, Math.floor(H * dpr))

  visualizer = butterchurn.createVisualizer(audioCtx, canvas, {
    width:      canvas.width,
    height:     canvas.height,
    pixelRatio: dpr,
  })

  // MediaElementSource can be created only once per element — own it here and
  // route it both to the speakers and into butterchurn for analysis.
  sourceNode = audioCtx.createMediaElementSource(videoEl)
  sourceNode.connect(audioCtx.destination)
  visualizer.connectAudio(sourceNode)

  const allPresets = butterchurnPresets.getPresets()
  presetKeys = ALCHEMY_PRESET_NAMES.filter(name => name in allPresets)
  if (presetKeys.length === 0) presetKeys = Object.keys(allPresets)
  loadRandomPreset(0)
  presetTimer = setInterval(() => loadRandomPreset(), PRESET_HOLD_SECS * 1000)
}

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas?.parentElement) return
  const dpr = window.devicePixelRatio || 1
  const W   = canvas.parentElement.clientWidth
  const H   = canvas.parentElement.clientHeight
  canvas.width  = Math.max(1, Math.floor(W * dpr))
  canvas.height = Math.max(1, Math.floor(H * dpr))
  if (visualizer) visualizer.setRendererSize(canvas.width, canvas.height)
}

function renderFrame() {
  rafId = requestAnimationFrame(renderFrame)
  if (visualizer) visualizer.render()
}

function openFile() { fileInputRef.value?.click() }

function handleFileInput(e) {
  const file = e.target.files?.[0]
  if (file) loadFile(file)
}

function handleDrop(e) {
  const file = e.dataTransfer?.files?.[0]
  if (file?.type.startsWith('audio/')) loadFile(file)
}

function playSrc(src) {
  const wmp = wmpRef.value
  if (!wmp) return
  setupVisualizer()
  const onCanPlay = () => {
    wmp.removeEventListener('canplay', onCanPlay)
    wmp.play()
  }
  wmp.addEventListener('canplay', onCanPlay)
  wmp.setAttribute('src', src)
}

function loadFile(file) {
  if (currentBlobUrl) URL.revokeObjectURL(currentBlobUrl)
  currentBlobUrl = URL.createObjectURL(file)
  customTrackName.value = file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ')
  isDefaultActive.value = false
  playSrc(currentBlobUrl)
}

function playDefault() {
  isDefaultActive.value = true
  playSrc(DEFAULT_SRC)
}

function playCustom() {
  if (!currentBlobUrl) return
  isDefaultActive.value = false
  playSrc(currentBlobUrl)
}

function formatTime(s) {
  if (!s || isNaN(s)) return '0:00'
  const m = Math.floor(s / 60), sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

let ro = null

onMounted(() => {
  resizeCanvas()
  renderFrame()

  ro = new ResizeObserver(resizeCanvas)
  if (canvasRef.value?.parentElement) ro.observe(canvasRef.value.parentElement)

  const wmp = wmpRef.value
  if (wmp) {
    // Set the default track
    wmp.setAttribute('src', DEFAULT_SRC)

    // Remove the fullscreen button — it would fullscreen only the tray, not the canvas
    const fsBtn = wmp.shadowRoot?.querySelector('.fullscreen')
    if (fsBtn) fsBtn.style.display = 'none'

    // setupVisualizer() is called on first play — the user click on the jewel button
    // provides the user gesture required to create the AudioContext
    wmp.addEventListener('play', () => {
      setupVisualizer()
      isPlaying.value = true
    })
    wmp.addEventListener('pause',           () => { isPlaying.value = false })
    wmp.addEventListener('ended',           () => { isPlaying.value = false; currentTime.value = 0 })
    wmp.addEventListener('timeupdate',      () => { currentTime.value = wmp.currentTime || 0 })
    wmp.addEventListener('durationchange',  () => { duration.value = wmp.duration || 0 })
    wmp.addEventListener('loadedmetadata',  () => { duration.value = wmp.duration || 0 })
  }
})

onUnmounted(() => {
  if (rafId)          cancelAnimationFrame(rafId)
  if (presetTimer)    clearInterval(presetTimer)
  if (audioCtx)       { audioCtx.close(); audioCtx = null }
  if (ro)             ro.disconnect()
  if (currentBlobUrl) URL.revokeObjectURL(currentBlobUrl)
})
</script>

<style scoped>
/* ── Top bar ── */
.wmp-topbar {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding: 0 10px;
  flex-shrink: 0;
  height: 36px;
  background:
    linear-gradient(180deg,
      #555E75 0%,
      #555E75 40%,
      #2a2f3a 50%,
      #111116 60%,
      #111116 100%);
  box-shadow:
    inset 0 1px 0 #3D444F,
    inset 0 -1px 0 #3D444F,
    0 0 16px 3px rgba(61, 68, 79, 1),
    0 0 28px 6px rgba(61, 68, 79, 0.7);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Left: back / forward jewel arrow buttons (same sprite as the Play jewel) */
.wmp-arrows {
  display: flex;
  align-items: center;
  gap: 4px;
}
.wmp-arrow-btn {
  all: unset;
  position: relative;
  display: inline-block;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;
  /* Layered gradient:
       1. small bottom specular reflection (glass)
       2. vertical body: light cyan top → deep navy bottom */
  background:
    radial-gradient(ellipse 60% 22% at 50% 92%,
      rgba(195, 235, 255, 0.55) 0%,
      rgba(120, 200, 255, 0.16) 60%,
      transparent 100%),
    linear-gradient(180deg,
      #a5d6f4 0%,
      #5fb2e8 18%,
      #2c84cf 40%,
      #0f57a7 65%,
      #073077 88%,
      #021d56 100%);
  box-shadow:
    /* dark outer rim */
    inset 0 0 0 1.5px #04143e,
    /* bright cyan inner halo just inside the rim */
    inset 0 0 0 3px rgba(80, 180, 235, 0.55),
    /* top inner glow */
    inset 0 2px 3px rgba(255, 255, 255, 0.45),
    /* bottom inner shadow */
    inset 0 -3px 4px rgba(0, 12, 45, 0.55),
    /* drop shadow */
    0 2px 3px rgba(0, 0, 0, 0.55);
}
/* Upper hemisphere glossy highlight */
.wmp-arrow-btn::before {
  content: '';
  position: absolute;
  top: 3px;
  left: 4.5px;
  right: 4.5px;
  height: 11px;
  border-radius: 50% / 100% 100% 0 0;
  background: linear-gradient(180deg,
    rgba(255, 255, 255, 0.78) 0%,
    rgba(225, 245, 255, 0.45) 50%,
    rgba(255, 255, 255, 0) 100%);
  pointer-events: none;
}
.wmp-arrow-btn:hover {
  background:
    radial-gradient(ellipse 60% 22% at 50% 92%,
      rgba(220, 245, 255, 0.65) 0%,
      rgba(160, 220, 255, 0.22) 60%,
      transparent 100%),
    linear-gradient(180deg,
      #c2e6fb 0%,
      #82c6ef 18%,
      #3e98d9 40%,
      #1568b8 65%,
      #0a3d8a 88%,
      #042867 100%);
}
.wmp-arrow-btn:active {
  background:
    radial-gradient(ellipse 60% 22% at 50% 92%,
      rgba(150, 210, 245, 0.45) 0%,
      rgba(80, 160, 220, 0.15) 60%,
      transparent 100%),
    linear-gradient(180deg,
      #5fa8d8 0%,
      #2c7bba 25%,
      #0f4f93 55%,
      #042460 90%,
      #01133e 100%);
  box-shadow:
    inset 0 0 0 1.5px #04143e,
    inset 0 0 0 3px rgba(80, 180, 235, 0.4),
    inset 0 2px 4px rgba(0, 10, 35, 0.55),
    0 1px 1px rgba(0, 0, 0, 0.4);
}
.wmp-arrow-btn--dim        { filter: brightness(0.7) saturate(0.85); }
.wmp-arrow-btn--dim:hover  { filter: brightness(0.92) saturate(0.95); }

.wmp-arrow-glyph {
  position: absolute;
  inset: 0;
  margin: auto;
  width: 14px;
  height: 14px;
  pointer-events: none;
  fill: none;
  stroke: #ffffff;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.55));
}

/* Right: navigation tabs */
.wmp-nav {
  display: flex;
  flex: 1;
  align-items: center;
  height: 100%;
  padding-left: 16px;
  gap: 12px;
}
.wmp-nav-rest {
  display: flex;
  flex: 1;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}
.wmp-nav-tab {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 12px;
  background: transparent;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: #d8dde2;
  cursor: pointer;
  text-decoration: none;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);
  position: relative;
}
.wmp-nav-tab:hover {
  color: #b8e0ff;
}

.wmp-nav-tab--active {
  align-self: center;
  height: 28px;
  padding: 0 22px;
  background: linear-gradient(180deg,
    #6582CF 0%,
    #6582CF 25%,
    #1B3AA4 45%,
    #1B3AA4 70%,
    #52BFE6 85%,
    #52BFE6 100%);
  border: 1px solid #9fe0ff;
  border-radius: 5px;
  color: #ffffff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.75);
  box-shadow:
    0 0 6px rgba(120, 200, 255, 0.7),
    inset 0 1px 0 rgba(255, 255, 255, 0.30);
}
.wmp-nav-tab--active:hover {
  color: #ffffff;
}
.wmp-nav-tab__label {
  position: relative;
}
/* Down chevron centered below the label */
.wmp-nav-tab--active::after {
  content: '';
  position: absolute;
  bottom: 1px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid rgba(220, 240, 255, 0.95);
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.4));
}

.wmp-nav-chevron {
  display: flex;
  align-items: center;
  padding-left: 10px;
  font-size: 18px;
  font-weight: bold;
  color: #6fa6da;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.85);
}

.wmp-openfile-btn {
  background: #c8c8c8;
  border: 1px solid #aaa;
  color: #333;
  border-radius: 2px;
  cursor: pointer;
  transition: background 0.1s;
  display: block;
}
.wmp-openfile-btn:hover { background: #b8b8b8; }

</style>
