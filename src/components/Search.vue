<template>
  <div class="search-wrapper">
    <div class="input-group" v-cloak>
      <input
        @keyup.enter="lookupKeyupEnter"
        @focus="active = true"
        @blur="cancel"
        v-model="text"
        type="text"
        class="form-control lookup"
        :placeholder="placeholder"
      />
      <a
        v-if="random"
        class="btn btn-secondary btn-random ml-2"
        href="#/dictionary/openrussian/random"
      >
        <font-awesome-icon icon="random" />
        <span> Random</span>
      </a>
      <div class="input-group-append">
        <button
          class="btn btn-danger lookup-button"
          v-on:click="lookupButtonClick"
          type="button"
          title="Search"
        >
          <font-awesome-icon icon="search" />
        </button>
      </div>
    </div>
    <div
      class="suggestions"
      :key="suggestionsKey"
      v-cloak
      v-if="active && text && text.length > 0"
    >
      <a
        class="suggestion"
        v-for="suggestion in suggestions"
        :href="hrefFunc(suggestion)"
      >
        <span>
          <span
            class="suggestion-word font-weight-bold mr-1"
            data-level="outside"
            >{{ text }}</span
          >
          <span class="mr-1" v-if="suggestion.match"
            >{{ suggestion.match.field }} of <b>{{ suggestion.bare }}</b></span
          >
          <span
            class="suggestion-english"
            v-if="suggestion.english"
            v-html="Helper.highlight(suggestion.english, text)"
          ></span>
        </span>
      </a>
      <div
        class="suggestion"
        v-if="suggestions.length === 0 && type === 'dictionary'"
      >
        <span class="suggestion-not-found">
          <b>&ldquo;{{ text }}&rdquo;</b> is not in
          <a href="https://en.openrussian.org/dictionary">OpenRussian.org</a>.
          Try looking it up in
          <a
            :href="`https://en.wiktionary.org/w/index.php?search=${text}`"
            target="blank"
            >Wiktionary</a
          >,
          <a
            :href="`https://en.wikipedia.org/w/index.php?search=${text}`"
            target="blank"
            >Wikipedia</a
          >, or
          <a :href="`https://www.google.com/search?q=${text}`" target="blank"
            >Google.</a
          >
        </span>
      </div>
      <div
        class="suggestion"
        v-if="suggestions.length === 0 && type === 'generic'"
      >
        <span class="suggestion-not-found">
          Search for <b>“{{ text }}”</b>...
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from 'timers'
import Helper from '@/lib/helper'

export default {
  props: {
    term: {
      default: ''
    },
    type: {
      default: 'dictionary' // can also be 'generic'
    },
    entry: {
      default: undefined
    },
    hrefFunc: {
      type: Function,
      default: function(entry) {
        if (entry) {
          return `#/dictionary/openrussian/${entry.id}`
        }
      }
    },
    defaultURL: {
      type: Function,
      default: () => `#/di`
    },
    placeholder: {
      default: 'Look up words here...'
    },
    random: {
      default: false
    }
  },
  data() {
    return {
      Helper,
      suggestions: [],
      dEntry: this.entry,
      text: this.entry ? this.entry.bare : this.term,
      active: false,
      suggestionsKey: 0
    }
  },
  watch: {
    $route() {
      this.active = false
    },
    entry() {
      if (this.entry) {
        this.dEntry = this.entry
        this.text = this.dEntry.bare
      }
    },
    async text() {
      if (this.type === 'dictionary') {
        this.suggestions = await (await this.$openRussian).lookupFuzzy(this.text, 30)
      }
    }
  },
  methods: {
    lookupKeyupEnter() {
      const url =
        $('.suggestion:first-child').attr('href')
      if (url) window.location = url
    },
    lookupButtonClick() {
      const url =
        $('.suggestion:first-child').attr('href')
      if (url) {
        this.suggestions = []
        window.location = url
      }
    },
    cancel() {
      setTimeout(() => {
        if (this.suggestions[0]) this.dEntry = this.suggestions[0]
        this.active = false
      }, 300) // Set time out, otherwise before click event is fired the suggestions are already gone!
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.suggestions {
  position: absolute;
  z-index: 3;
  border-radius: 0.3rem;
  overflow: hidden;
  border: 1px solid #ccc;
  width: 100%;
  top: 2.9rem;
}

.suggestion,
a.suggestion {
  display: block;
  background: white;
  padding: 0.3rem 1rem;
  border: 1px solid #f3f3f3;
  color: #7b7b7b;
  text-decoration: none;
  display: flex;
  align-items: top;
  padding: 0.5rem 1rem;
}

.suggestion:hover,
.suggestion:first-child:not(:hover) {
  background: #ececec;
}

.suggestion-english {
  font-style: italic;
  color: #aaa;
}

.search-wrapper {
  position: relative;
}

.suggestion-word {
  font-size: 1.5em;
  line-height: 1;
}

.suggestion-english >>> .highlight {
  font-weight: bold;
  color: #999;
}
</style>
