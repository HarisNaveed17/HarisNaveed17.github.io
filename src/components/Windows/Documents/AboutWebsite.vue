<template>
  <section>
    <div class="flex justify-between">
      <h1 class="text-lg font-semibold">{{ $t('windows.documents.aboutWebsite.title') }}</h1>
    </div>
    <hr class="mt-2 mb-2 border-t-1 border-black" />
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
</template>
