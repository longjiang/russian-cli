<template>
  <v-popover
    offset="6"
    placement="top"
    :open="hover"
    style="display: inline-block"
  >
    <div class="word-block" @mouseover="mouseover" @mouseleave="hover = false">
      {{ text }}
    </div>
    <template slot="popover">
      <div v-if="!loading">
        <div v-for="word in words">
          <div>
            <span v-for="match in word.matches"
              >{{ OpenRussian.stylize(match.field) }}
              {{ OpenRussian.stylize(match.table) }} of </span>
            <b :data-level="word.level || 'outside'">{{
              OpenRussian.accent(word.accented)
            }}</b>
            <Speak :text="word.bare" class="ml-1" />
          </div>
          <div v-if="word.translations">
            <em>{{ word.translations.tl }}</em>
          </div>
        </div>
        <div v-if="words.length === 0" style="font-size: 2rem">🤷‍</div>
      </div>
    </template>
  </v-popover>
</template>

<script>
import OpenRussian from '@/lib/openrussian'

export default {
  props: {
    text: {
      type: String
    }
  },
  data() {
    return {
      OpenRussian,
      hover: false,
      loading: true,
      words: []
    }
  },
  methods: {
    mouseover() {
      this.hover = true
      if (this.loading === true) {
        if (this.words.length === 0) {
          this.lookup()
        }
      }
    },
    async lookup() {
      let words = (await this.$openRussian).lookupFuzzy(this.text)
      this.words = words
      this.loading = false
    }
  }
}
</script>

<style lang="scss">
.tooltip {
  display: block !important;
  z-index: 10000;

  .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
    text-align: left;
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
    $color: #ebebeb;
    border: none;

    .popover-inner {
      background: $color;
      color: black;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 20px rgba(black, 0.2);
    }

    .popover-arrow {
      border-color: $color;
    }
  }
}
</style>
