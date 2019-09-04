<template>
  <nav class="tabs">
    <router-link
      class="tab"
      :to="{ name: 'noun-cases' }"
      title="Learn how to decline Russian nouns."
      >Noun Cases</router-link
    >
    <router-link
      class="tab"
      :to="{ name: 'analyzer' }"
      title="Take a piece of russian text and figure out the case of each adjective + noun combo."
      >Case Analyzer</router-link
    >
    <router-link
      class="tab"
      :to="{ name: 'endings' }"
      title="Figure out the dictionary form and case by looking up the ending."
      >Case Ending Lookup</router-link
    >
    <router-link
      :class="{
        tab: true,
        'router-link-active': $route.name && $route.name.startsWith('youtube')
      }"
      :to="{ name: 'youtube-browse' }"
      title="Learn Chinese with audio-visual material."
    >
      <font-awesome-icon icon="video" />Audio-Visual
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
