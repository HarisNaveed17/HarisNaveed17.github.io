import { createRouter, createWebHistory } from 'vue-router'
import Loader from '../views/Loader.vue'
import Office from '../views/Office.vue'
import MobileView from '../views/MobileView.vue'
import { useConnectionStore } from '@/stores/connectionStore'

const isMobile = () => window.innerWidth < 768

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/mobile',
      name: 'mobile',
      component: MobileView
    },
    {
      path: '/',
      name: 'home',
      component: Loader,
      meta: {
        title: "Haris's PC",
        metaTags: [
          {
            rel: 'canonical',
            href: 'https://harisnaveed17.github.io'
          },
          {
            name: 'title',
            content: "Haris's PC"
          },
          {
            name: 'description',
            content:
              "Machine Learning Engineer portfolio"
          },
          {
            name: 'keywords',
            content: 'portfolio, machine learning, ml engineer, haris naveed'
          },
          {
            name: 'author',
            content: 'Haris Naveed'
          },
          {
            name: 'robots',
            content: 'index, follow'
          },
          {
            name: 'theme-color',
            content: '#000000'
          },
          {
            name: 'mobile-web-app-capable',
            content: 'yes'
          },
          {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black'
          },
          {
            name: 'apple-mobile-web-app-title',
            content: "Haris's PC"
          },
          {
            name: 'application-name',
            content: "Haris's PC"
          },
          {
            name: 'twitter:card',
            content: 'summary'
          },
          {
            name: 'twitter:title',
            content: "Haris's PC"
          },
          {
            name: 'twitter:description',
            content:
              "Machine Learning Engineer portfolio"
          },
          {
            name: 'twitter:image',
            content: 'https://harisnaveed17.github.io/img/logo-portfolio-black.webp'
          },
          {
            name: 'twitter:image:alt',
            content: 'Logo Portfolio Haris Naveed'
          },
          {
            property: 'og:type',
            content: 'website'
          },
          {
            property: 'og:title',
            content: "Haris's PC"
          },
          {
            property: 'og:description',
            content:
              "Machine Learning Engineer portfolio"
          },
          {
            property: 'og:site_name',
            content: "Haris's PC"
          },
          {
            property: 'og:url',
            content: 'https://harisnaveed17.github.io'
          },
          {
            property: 'og:image',
            content: 'https://harisnaveed17.github.io/img/logo-portfolio-black.webp'
          },
          {
            property: 'og:image:alt',
            content: 'Logo Portfolio Haris Naveed'
          },
          {
            property: 'og:locale',
            content: 'fr_FR'
          },
          {
            property: 'og:locale:alternate',
            content: 'en_US'
          }
        ]
      }
    },
    {
      path: '/office',
      name: 'Office',
      component: Office,
      meta: {
        title: "Haris's PC",
        metaTags: [
          {
            rel: 'canonical',
            href: 'https://harisnaveed17.github.io/office'
          },
          {
            name: 'title',
            content: "Haris's PC"
          },
          {
            name: 'description',
            content:
              "Machine Learning Engineer portfolio"
          },
          {
            name: 'keywords',
            content: 'portfolio, machine learning, ml engineer, haris naveed'
          },
          {
            name: 'author',
            content: 'Haris Naveed'
          },
          {
            name: 'robots',
            content: 'index, follow'
          },
          {
            name: 'theme-color',
            content: '#000000'
          },
          {
            name: 'mobile-web-app-capable',
            content: 'yes'
          },
          {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'black'
          },
          {
            name: 'apple-mobile-web-app-title',
            content: "Haris's PC"
          },
          {
            name: 'application-name',
            content: "Haris's PC"
          },
          {
            name: 'twitter:card',
            content: 'summary'
          },
          {
            name: 'twitter:title',
            content: "Haris's PC"
          },
          {
            name: 'twitter:description',
            content:
              "Machine Learning Engineer portfolio"
          },
          {
            name: 'twitter:image',
            content: 'https://harisnaveed17.github.io/img/logo-portfolio-black.webp'
          },
          {
            name: 'twitter:image:alt',
            content: 'Logo Portfolio Haris Naveed'
          },
          {
            name: 'og:type',
            content: 'website'
          },
          {
            name: 'og:title',
            content: "Haris's PC"
          },
          {
            name: 'og:description',
            content:
              "Machine Learning Engineer portfolio"
          },
          {
            name: 'og:site_name',
            content: "Haris's PC"
          },
          {
            name: 'og:url',
            content: 'https://harisnaveed17.github.io/office'
          },
          {
            name: 'og:image',
            content: 'https://harisnaveed17.github.io/img/logo-portfolio-black.webp'
          },
          {
            name: 'og:image:alt',
            content: 'Logo Portfolio Haris Naveed'
          },
          {
            name: 'og:locale',
            content: 'fr_FR'
          },
          {
            name: 'og:locale:alternate',
            content: 'en_US'
          }
        ]
      }
    }
  ]
})

router.beforeEach((to) => {
  const connectionStore = useConnectionStore()
  const inTransition = connectionStore.status === 'restart' || connectionStore.status === 'disconnected'
  if (isMobile() && to.name !== 'mobile' && !inTransition) {
    return { name: 'mobile' }
  }
})

export default router
