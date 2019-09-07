<template>
  <!-- v-observe-visibility="visibilityChanged" -->
  <v-popover
    offset="6"
    placement="top"
    :open="hover"
    style="display: inline-block"
  >
    <div
      :class="{
        'word-block': true,
        saved: saved
      }"
      :data-hover-level="
        words && words.length > 0 ? words[0].level || 'outside' : 'outside'
      "
      @mouseover="mouseover"
      @mouseleave="hover = false"
      @click="click"
    >
      <slot></slot>
    </div>
    <template slot="popover">
      <div v-for="word in words" class="tooltip-entry">
        <div>
          <div v-for="match in word.matches" style="color: #999">
            <b>{{ match.field }} {{ match.number }}</b>
            {{ match.table !== 'declension' ? match.table : '' }}
            of
          </div>
          <b :data-level="word.level || 'outside'" style="font-size: 1.5rem">{{
            word.accented
          }}</b>
          <Speak :text="word.bare" class="ml-1" />
        </div>
        <div v-if="word.translations">
          <em>{{ word.translations.tl }}</em>
        </div>
      </div>
      <div v-if="loading === true">
        💭 Thinking...
      </div>
      <div v-if="words.length === 0 && loading === false">
        🤷‍ No clue
      </div>
    </template>
  </v-popover>
</template>

<script>
import Helper from '@/lib/helper'

export default {
  data() {
    return {
      hover: false,
      loading: true,
      text: this.$slots.default[0].text,
      saved: this.$store.getters.hasSavedWord(this.$slots.default[0].text),
      words: []
    }
  },
  methods: {
    async stylize(name) {
      let result = await (await this.$openRussian).stylize(name)
      // return result
    },
    async accent(accented) {
      let result = await (await this.$openRussian).accent(accented)
      // return result
    },
    visibilityChanged(isVisible) {
      if (isVisible && this.loading === true) {
        if (this.words.length === 0) {
          this.lookup()
        }
      }
    },
    mouseover() {
      this.hover = true
      if (this.loading === true) {
        if (this.words && this.words.length === 0) {
          this.lookup()
        }
      }
    },
    async allForms() {
      let forms = [this.text.toLowerCase()]
      if (this.words.length > 0) {
        for (let word of this.words) {
          let wordForms = (await (await this.$openRussian).wordForms(word)) || []
          wordForms = wordForms
            .map(form => form.form.replace(/'/g, '').toLowerCase())
            .filter(form => form !== '' && form !== '0' && form !== '1')
          forms = forms.concat(wordForms)
        }
      }
      return Helper.unique(forms)
    },
    async click() {
      // [ [...all word forms, lowercase] ]
      if (this.saved) {
        this.$store.dispatch('removeSavedWord', this.text)
      } else {
        this.speak(this.text)
        this.$store.dispatch('addSavedWord', await this.allForms())
      }
      this.saved = !this.saved
    },
    async lookup() {
      let words = await (await this.$openRussian).lookupFuzzy(this.text)
      if (words) {
        for (let word of words) {
          if (word.matches) {
            for (let match of word.matches) {
              match.field = await (await this.$openRussian).stylize(match.field)
              match.number = await (await this.$openRussian).stylize(
                match.number
              )
              match.table = await (await this.$openRussian).stylize(match.table)
            }
          }
        }
      }
      this.words = words
      this.loading = false
    },
    speak(text) {
      if (!speechSynthesis.speaking) {
        this.utterance = new SpeechSynthesisUtterance(text)
        this.utterance.lang = 'ru'
        speechSynthesis.speak(this.utterance)
      }
    }
  }
}
</script>

<style lang="scss">
.word-block {
  cursor: pointer;
}

.word-block.saved {
  font-weight: bold;
}

.tooltip-entry {
  color: #666;
}

.tooltip-entry + .tooltip-entry {
  margin-top: 1rem;
  border-top: 1px solid #ccc;
  padding-top: 1rem;
}

.tooltip {
  display: block !important;
  z-index: 10000;

  .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    text-align: left;
    max-width: 30rem;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
  }

  &[x-placement^='top'] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^='bottom'] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^='right'] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^='left'] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
  }

  &.popover {
    $color: white;
    border: none;

    .popover-inner {
      background: $color;
      color: black;
      padding: 1rem;
      border-radius: 5px;
      box-shadow: 0 5px 20px rgba(black, 0.2);
    }

    .popover-arrow {
      border-color: $color;
    }
  }
}
</style>
