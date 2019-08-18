<template>
  <nav class="tabs">
    <router-link
      class="tab"
      :to="{ name: 'noun-cases' }"
      title="Learn how to decline Russian nouns."
    >Noun Cases</router-link>
    <router-link
      class="tab"
      :to="{ name: 'analyzer' }"
      title="Take a piece of russian text and figure out the case of each adjective + noun combo."
    >Case Analyzer</router-link>
    <router-link
      class="tab"
      :to="{ name: 'endings' }"
      title="Figure out the dictionary form and case by looking up the ending."
    >Case Ending Lookup</router-link>
  </nav>
</template>

<script>
export default {}
</script>

<style>
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
}

.tab.router-link-active,
.tab:hover {
  color: #343a40;
  background: white;
  text-decoration: none;
}
</style>