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
  props: {
    word: {
      type: Object
    },
    text: {
      type: String
    }
  },
  data() {
    return {
      id: Helper.uniqueId(),
      Helper
    }
  },
  methods: {
    async allForms() {
      let wordForms =
        (await (await this.$openRussian).wordForms(this.word)) || []
      wordForms = wordForms
        .map(form => form.form.replace(/'/g, '').toLowerCase())
        .filter(form => form !== '' && form !== '0' && form !== '1')
      return Helper.unique([this.word.bare.toLowerCase()].concat(wordForms))
    },
    saved() {
      let saved = this.$store.getters.hasSavedWord(
        this.word ? this.word.bare.toLowerCase() : this.text.toLowerCase()
      )
      return saved
    },
    saveWordClick() {
      this.$store.dispatch(
        'addSavedWord',
        this.word ? this.allForms() : [this.text.toLowerCase()]
      )
    },
    removeWordClick() {
      this.$store.dispatch(
        'removeSavedWord',
        this.word ? this.word.bare.toLowerCase() : this.text.toLowerCase()
      )
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
