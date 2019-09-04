<template>
  <div class="toggle-saved-word focus-exclude">
    <button
      class="star remove-word"
      v-if="saved()"
      v-on:click="removeWordClick"
      title="Remove word"
    >
      <font-awesome-icon icon="star" />
    </button>
    <button
      class="star add-word"
      v-if="!saved()"
      v-on:click="saveWordClick"
      title="Add word"
    >
      <font-awesome-icon :icon="['far', 'star']" />
    </button>
  </div>
</template>

<script>
import Helper from '@/lib/helper'

export default {
  props: ['word'],
  data() {
    return {
      id: Helper.uniqueId(),
      Helper
    }
  },
  methods: {
    saved() {
      return this.$store.getters.hasSavedWord(this.word.id)
    },
    saveWordClick() {
      this.$store.dispatch('addSavedWord', this.word.id)
    },
    removeWordClick() {
      this.$store.dispatch('removeSavedWord', this.word.id)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.toggle-saved-word {
  display: inline-block;
  position: relative;
  padding: 0;
  margin: 0;
  background: none;
  border: none;
  color: #ffe597;
}

.star {
  background: none;
  border: none;
  color: #f8b61e;
  padding: 0;
}
</style>
