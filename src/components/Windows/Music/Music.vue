<template>
  <div class="relative right-0 h-full flex overflow-y-auto bg-white pb-14">
    <div class="w-full font-trebuchet-pixel p-3">
      <div class="flex items-center gap-3 mb-4 pb-2 border-b border-gray-200">
        <img src="/img/icons/music/logo_spotify.svg" alt="Spotify" class="w-10" />
        <div>
          <h2 class="text-lg font-bold">My Playlists</h2>
          <p class="text-sm text-gray-500">Hand - curated, thematic playlists with some of my favorite music</p>
        </div>
      </div>
      <div v-for="playlist in playlists" :key="playlist.id" class="mb-3">
        <div class="flex items-center gap-3 p-2 hover:bg-blue-50 rounded cursor-pointer" @click="openPlaylist(playlist.spotifyUrl)">
          <img :src="playlist.coverUrl" :alt="playlist.name" class="w-12 h-12 rounded" />
          <div class="flex-1">
            <p class="text-base font-bold">{{ playlist.name }}</p>
            <p class="text-sm text-gray-500">{{ playlist.description }}</p>
          </div>
          <button class="flex items-center gap-1 text-sm border border-gray-300 px-2 py-1 rounded hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
              <path fill="#1DB954" d="M17.9 10.9C14.7 9 9.35 8.8 6.3 9.75c-.5.15-1-.15-1.15-.6c-.15-.5.15-1 .6-1.15c3.55-1.05 9.4-.85 13.1 1.35c.45.25.6.85.35 1.3c-.25.35-.85.5-1.3.25m-.1 2.8c-.25.35-.7.5-1.05.25c-2.7-1.65-6.8-2.15-9.95-1.15c-.4.1-.85-.1-.95-.5s.1-.85.5-.95c3.65-1.1 8.15-.55 11.25 1.35c.3.15.45.65.2 1m-1.2 2.75c-.2.3-.55.4-.85.2c-2.35-1.45-5.3-1.75-8.8-.95c-.35.1-.65-.15-.75-.45c-.1-.35.15-.65.45-.75c3.8-.85 7.1-.5 9.7 1.1c.35.15.4.55.25.85M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"/>
            </svg>
            Open in Spotify
          </button>
        </div>
        <div class="w-full h-px bg-gray-100 mt-2"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import playlistData from '@/data/playlist-data.json'

const playlists = playlistData

function openPlaylist(url) {
  window.open(url, '_blank')
}
</script>
