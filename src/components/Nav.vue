<template>
  <nav class="tabs">
    <router-link
      :class="{
        tab: true,
        'router-link-active':
          $route.name &&
          ($route.name === 'dictionary' ||
            $route.name === 'compare' ||
            $route.name === 'phrase' ||
            $route.name === 'levels' ||
            $route.name.startsWith('explore') ||
            $route.name === 'learn' ||
            $route.name === 'saved-words')
      }"
      :to="{ name: 'dictionary' }"
      title="Lookup and compare words"
    >
      <font-awesome-icon icon="book" />Dictionary
    </router-link>
    <router-link
      :class="{
        tab: true,
        'router-link-active':
          $route.name &&
          ($route.name === 'noun-cases' ||
            $route.name === 'endings' ||
            $route.name === 'analyzer')
      }"
      :to="{ name: 'noun-cases' }"
      title="Russian grammar tools"
    >
      <font-awesome-icon icon="list" />Grammar
    </router-link>
    <router-link
      :class="{
        tab: true,
        'router-link-active':
          $route.name &&
          ($route.name.startsWith('book') ||
            $route.name === 'library' ||
            $route.name === 'reader')
      }"
      :to="{ name: 'library' }"
      title="Improve your Russian through reading"
    >
      <font-awesome-icon icon="book-open" />Reading
    </router-link>
    <router-link
      :class="{
        tab: true,
        'router-link-active': $route.name && $route.name.startsWith('youtube')
      }"
      :to="{ name: 'youtube-browse' }"
      title="Learn Russian with audio-visual material."
    >
      <font-awesome-icon icon="video" />Audio-Visual
    </router-link>
    <router-link class="tab" :to="{ name: 'settings' }" title="Settings">
      <font-awesome-icon icon="cog" />Settings
    </router-link>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss">
.tabs {
  a svg,
  a i {
    margin-right: 0.5rem;
  }
}

.tabs {
  white-space: nowrap;
  overflow: scroll;
  overflow-y: hidden;
}

.tab {
  padding: 0.5rem 1rem;
  border-radius: 0.3rem 0.3rem 0 0;
  color: white;
  display: inline-block;
  margin-right: 0.2rem;
  border: none;
}

.tab.router-link-active,
.tab:hover {
  color: #fd4f1c;
  background: white;
  text-decoration: none;
}

.tab-saved-words.router-link-active,
.tab-saved-words:hover {
  color: #f8b61e;
}

.tab-saved-words-count[v-cloak] {
  display: none;
}

.tab-saved-words.router-link-active .tab-saved-words-count,
.tab-saved-words:hover .tab-saved-words-count {
  background: #f8b61e;
  color: white;
}
</style>
