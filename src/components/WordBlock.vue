<template>
  <v-popover
    placement="top"
    :open="hover"
    trigger="manual"
    :open-group="'id' + _uid"
    :id="id"
    style="display: inline-block"
  >
    <span
      :class="{
        'word-block': true,
        saved: saved
      }"
      :data-hover-level="
        words && words.length > 0 ? words[0].level || 'outside' : 'outside'
      "
      @click="click"
      @mouseover="mouseover"
      @mouseout="mouseout"
      ><span v-if="saved && words && words.length > 0"
        ><span v-if="words[0].matches && words[0].matches.length > 0">{{
          matchCase(words[0].matches[0].form)
        }}</span
        ><span v-else>{{ matchCase(words[0].accented) }}</span></span
      ><span v-else><slot></slot></span
    ></span>
    <template slot="popover">
      <div
        class="tooltip-images"
        :key="`tooltip-images-${text}`"
        v-cloak
        v-if="images && images.length > 0"
      >
        <img
          alt
          class="image-wall-image"
          v-for="(image, index) in images"
          :key="`web-images-${text}-${index}`"
          :src="`${Config.imageProxy}?${image.src}`"
        />
      </div>
      <div v-for="word in words" class="tooltip-entry">
        <div v-if="word">
          <div v-for="match in word.matches" style="color: #999">
            <b>{{ match.field }} {{ match.number }}</b>
            {{ match.table !== 'declension' ? match.table : '' }}
            of
          </div>
          <a :href="`#/dictionary/openrussian/${words[0].id}`"
            ><b
              :data-level="word.level || 'outside'"
              style="font-size: 1.5rem"
              >{{ word.accented }}</b
            ></a
          ><span
            v-if="word.level"
            :data-bg-level="word.level"
            class="pl-1 pr-1 ml-1 rounded d-inlin-block"
            style="font-size: 0.8em; position:relative; bottom: 0.2rem;"
            >{{ word.level }}</span
          >
          <Speak :text="word.bare" :mp3="word.audio" class="ml-1" />
        </div>
        <div>
          <span
            class="word-type"
            v-if="word.type !== 'other'"
            style="color: #999"
            >{{ word.verbs ? abbreviate(word.verbs.aspect) : '' }}
            {{ abbreviate(word.type) }}
          </span>
          <span class="word-translation" v-if="word.translations">
            <em>{{ word.translations.tl }}</em>
          </span>
        </div>
      </div>
      <div v-if="loading === true">
        💭 Thinking...
      </div>
      <div v-if="words.length === 0 && loading === false">
        🤷‍ No clue.<br />
        <a
          :href="`https://www.google.com/search?q=${this.text}`"
          target="_blank"
          >Google</a
        >
        |
        <a :href="`https://en.wiktionary.org/wiki/${this.text}`" target="_blank"
          >Wiktionary</a
        >
        |
        <a :href="`https://en.openrussian.org/ru/${text}`" target="_blank"
          >OpenRussian.org</a
        >
        |
        <a
          :href="`https://www.russiandict.net/translate/${text}`"
          target="_blank"
          >RussianDict</a
        >
      </div>
    </template>
  </v-popover>
</template>

<script>
import Helper from '@/lib/helper'
import Config from '@/lib/config'
import WordPhotos from '@/lib/word-photos'

export default {
  data() {
    return {
      id: `wordblock-${Helper.uniqueId()}`,
      hover: false,
      loading: true,
      text: this.$slots.default[0].text,
      saved: this.$store.getters.hasSavedWord(this.$slots.default[0].text),
      images: [],
      words: [],
      Config
    }
  },
  methods: {
    matchCase(text) {
      if (this.text.match(/^[\wА-ЯЁ]/)) {
        if (this.text.match(/^.[\wА-ЯЁ]/)) {
          return text.toUpperCase()
        } else {
          return Helper.ucFirst(text)
        }
      } else {
        return text
      }
    },
    mouseover() {
      if (this.loading === true) {
        if (this.words && this.words.length === 0) {
          this.lookup()
        }
      }
      setTimeout(() => {
        if ($('.popover:hover').length === 0) {
          this.hover = true
        }
      }, 300) // Allow user to interact with previous popover
    },
    mouseout() {
      setTimeout(() => {
        // Allow user to interact with popover
        if ($('.popover:hover').length === 0) {
          this.hover = false
        }
      }, 300)
    },
    async allForms() {
      let forms = [this.text.toLowerCase()]
      if (this.words.length > 0) {
        for (let word of this.words) {
          let wordForms =
            (await (await this.$openRussian).wordForms(word)) || []
          wordForms = wordForms
            .map(form => form.form.replace(/'/g, '').toLowerCase())
            .filter(form => form !== '' && form !== '0' && form !== '1')
          forms = forms.concat(wordForms)
        }
      }
      return Helper.unique(forms)
    },
    async click(e) {
      // [ [...all word forms, lowercase] ]
      this.hover = true
      if (this.saved) {
        this.$store.dispatch('removeSavedWord', this.text)
      } else {
        this.speak(this.text)
        this.$store.dispatch('addSavedWord', await this.allForms())
      }
      this.saved = !this.saved
      return false
    },
    async lookup() {
      let words = await (await this.$openRussian).lookupFuzzy(this.text)
      if (words) {
        for (let word of words) {
          if (word && word.matches) {
            for (let match of word.matches) {
              match.form = await (await this.$openRussian).accent(match.form)
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
      this.images = (await WordPhotos.getGoogleImages(this.text)).slice(0, 5)
    },
    abbreviate(type) {
      let abb = {
        noun: 'n.',
        adjective: 'adj.',
        verb: 'v.',
        pronoun: 'pron.',
        perfective: 'perf.',
        imperfective: 'imperf.'
      }
      return abb[type] || type
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
.tooltip-images {
  width: 3rem;
  float: right;
  margin-left: 0.5rem;
}

.tooltip-images img {
  width: 3rem;
  height: auto;
  margin: 0.2rem 0;
}

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

  .tooltip-inner {
    border-radius: 1rem;
    text-align: left;
    max-width: 30rem;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
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
      overflow: scroll;
      max-height: 15rem;
      min-width: 15rem;
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
