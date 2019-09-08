import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/dictionary/'
    },
    {
      path: '/dictionary/:method?/:args?',
      name: 'dictionary',
      props: true,
      component: () => import('./views/Dictionary.vue'),
      meta: {
        title: 'Dictionary | Russian Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Look up and learn Russian words.'
          }
        ]
      }
    },
    {
      path: '/phrase/:method?/:args?',
      name: 'phrase',
      component: () => import('./views/Phrase.vue'),
      props: true,
      meta: {
        title: 'Phrase | Russian Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'See how Russian phrases are used in real context..'
          }
        ]
      }
    },
    {
      path: '/saved-words',
      name: 'saved-words',
      component: () => import('./views/SavedWords.vue'),
      meta: {
        title: 'Saved Words | Russian Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Study, manage, import, export the words you saved.'
          }
        ]
      }
    },
    {
      path: '/cases/nouns/:args?',
      name: 'noun-cases',
      props: true,
      component: () => import('./views/NounCases.vue'),
      meta: {
        title: 'Learn Russian Noun Cases | Russian Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Learn how to decline Russian nouns.'
          }
        ]
      }
    },
    {
      path: '/endings',
      name: 'endings',
      props: true,
      component: () => import('./views/Endings.vue'),
      meta: {
        title: 'Lookup Case Endings | Russian Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Figure out the dictionary form and case by looking up the ending.'
          }
        ]
      }
    },
    {
      path: '/analyzer',
      name: 'analyzer',
      props: true,
      component: () => import('./views/Analyzer.vue'),
      meta: {
        title: 'Analyze Cases in Russian Text | Russian Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Take a piece of russian text and figure out the case of each adjective + noun combo.'
          }
        ]
      }
    },
    {
      path: '/library',
      name: 'library',
      component: () => import('./views/Library.vue'),
      props: true,
      meta: {
        title: 'Library | Russian Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'Read free, open Russian books with hover dictionary and save new words for review.'
          }
        ]
      }
    },
    {
      path: '/reader/:method?/:arg?',
      name: 'reader',
      component: () => import('./views/Reader.vue'),
      meta: {
        title: 'Reader | Russian Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'Read Russian text with annotation and save new words for review.'
          }
        ]
      }
    },
    {
      path: '/book/chapter/:args?',
      name: 'book-chapter',
      component: () => import('./views/BookChapter.vue'),
      props: true,
      meta: {
        title: 'Book Chapter | Russian Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'Read free, open Russian books with hover dictionary and save new words for review.'
          }
        ]
      }
    },
    {
      path: '/book/index/:args?',
      name: 'book-index',
      component: () => import('./views/BookIndex.vue'),
      props: true,
      meta: {
        title: 'Book | Russian Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'Read free, open Russian books with hover dictionary and save new words for review.'
          }
        ]
      }
    },
    {
      path: '/book/list/:args?',
      name: 'book-list',
      component: () => import('./views/BookList.vue'),
      props: true,
      meta: {
        title: 'Books | Russian Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content:
              'Read free, open Russian books with hover dictionary and save new words for review.'
          }
        ]
      }
    },
    {
      path: '/youtube/search/:args?',
      name: 'youtube-search',
      component: () => import('./views/YouTubeSearch.vue'),
      props: true,
      meta: {
        title: 'YouTube Reader | Russian Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Watch Russian YouTube videos and study the subtitles.'
          }
        ]
      }
    },
    {
      path: '/youtube/view/:args?',
      name: 'youtube-view',
      component: () => import('./views/YouTubeView.vue'),
      props: true,
      meta: {
        title: 'YouTube Reader | Russian Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Watch Russian YouTube videos and study the subtitles.'
          }
        ]
      }
    },
    {
      path: '/youtube/browse/:args?',
      name: 'youtube-browse',
      component: () => import('./views/YouTubeBrowse.vue'),
      props: true,
      meta: {
        title: 'Study YouTube Subtitles | Russian Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Watch Russian YouTube videos and study the subtitles.'
          }
        ]
      }
    },
    {
      path: '/youtube/channel/:args?',
      name: 'youtube-channel',
      component: () => import('./views/YouTubeChannel.vue'),
      props: true,
      meta: {
        title: 'Study YouTube Subtitles | Russian Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Watch Russian YouTube videos and study the subtitles.'
          }
        ]
      }
    },
    {
      path: '/youtube/playlist/:args?',
      name: 'youtube-playlist',
      component: () => import('./views/YouTubePlaylist.vue'),
      props: true,
      meta: {
        title: 'Study YouTube Subtitles | Russian Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Watch Russian YouTube videos and study the subtitles.'
          }
        ]
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./views/Settings.vue'),
      meta: {
        title: 'Settings | Russian Zero to Hero',
        metaTags: [
          {
            name: 'description',
            content: 'Change preferences: choose a different text corpus.'
          }
        ]
      }
    }
  ]
})
