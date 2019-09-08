<template>
  <div>
    <nav
      class="secondary-menu text-center"
      v-if="
        $route.name &&
          ($route.name === 'dictionary' ||
            $route.name === 'compare' ||
            $route.name === 'phrase' ||
            $route.name === 'levels' ||
            $route.name === 'learn' ||
            $route.name === 'saved-words' ||
            $route.name.startsWith('explore'))
      "
    >
      <router-link class="secondary-menu-item" :to="{ name: 'dictionary' }">
        <font-awesome-icon icon="font" />Lookup Words
      </router-link>
      <router-link class="secondary-menu-item" :to="{ name: 'saved-words' }">
        <font-awesome-icon icon="star" />Saved
        <span class="saved-words-count" v-cloak>{{ savedWordsCount() }}</span>
      </router-link>
    </nav>

    <nav
      class="secondary-menu text-center"
      v-if="$route.name && $route.name.startsWith('youtube')"
    >
      <router-link class="secondary-menu-item" :to="{ name: 'youtube-browse' }">
        <font-awesome-icon :icon="['fab', 'youtube']" />YouTube Transcript
      </router-link>
    </nav>

    <nav
      class="secondary-menu text-center"
      v-if="
        $route.name &&
          ($route.name === 'noun-cases' ||
            $route.name === 'analyzer' ||
            $route.name === 'endings')
      "
    >
      <router-link
        class="secondary-menu-item"
        :to="{ name: 'noun-cases' }"
        title="Learn how to decline Russian nouns."
        >Noun Cases</router-link
      >
      <router-link
        class="secondary-menu-item"
        :to="{ name: 'analyzer' }"
        title="Take a piece of russian text and figure out the case of each adjective + noun combo."
        >Case Analyzer</router-link
      >
      <router-link
        class="secondary-menu-item"
        :to="{ name: 'endings' }"
        title="Figure out the dictionary form and case by looking up the ending."
        >Case Ending Lookup</router-link
      >
    </nav>

    <nav
      class="secondary-menu text-center"
      v-if="
        ($route.name &&
          ($route.name.startsWith('book') || $route.name === 'library')) ||
          $route.name === 'reader'
      "
    >
      <router-link class="secondary-menu-item" :to="{ name: 'library' }">
        <font-awesome-icon icon="book-open" />Library
      </router-link>
      <router-link class="secondary-menu-item" :to="{ name: 'reader' }">
        <font-awesome-icon icon="file-alt" />Text Reader
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    savedWordsCount() {
      let count = this.$store.getters.savedWordCount()
      // eslint-disable-next-line vue/no-parsing-error
      return count < 100 ? count : '多'
    }
  }
}
</script>

<style scoped>
a svg,
a i {
  margin-right: 0.5rem;
}
.secondary-menu {
  white-space: nowrap;
  overflow: scroll;
  overflow-y: hidden;
  padding-left: 1rem;
  padding-right: 1rem;
}

.saved-words-count {
  background: #666;
  border-radius: 100%;
  font-size: 0.8rem;
  color: white;
  font-weight: bold;
  display: inline-block;
  width: 1.3rem;
  height: 1.3rem;
  line-height: 1.4rem;
  text-align: center;
  position: relative;
  top: -0.1rem;
}

.router-link-active .saved-words-count {
  color: #fd4f1c;
  background: white;
}

.secondary-menu-item {
  padding: 0.5rem 1rem;
  margin: 0.2rem;
  border-radius: 0.3rem;
  color: #666;
  display: inline-block;
}

.secondary-menu-item:hover {
  text-decoration: none;
  color: inherit;
  background-color: #f7f7f7;
}

.secondary-menu-item.router-link-active {
  background: #fd4f1c;
  color: white;
}
</style>
