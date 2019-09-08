<template>
  <div :id="id || `collocation-${type}`">
    <h6>{{ title }}</h6>
    <hr class="mt-0 mb-2" />
    <div v-if="collocation">
      <ul class="collapsed gramrel pl-0" data-collapse-target>
        <li v-for="line in lines" class="gramrel-item list-unstyled">
          <Annotate><span v-html="line"/></Annotate>
        </li>
      </ul>
      <ShowMoreButton
        :data-bg-level="level"
        :length="collocation.Words.length"
        :min="4"
      />
    </div>
    <div v-else>No collocation.</div>
  </div>
</template>

<script>
import Helper from '@/lib/helper'

export default {
  props: {
    word: {
      type: Object
    },
    level: {
      type: String
    },
    type: {
      type: String
    },
    title: {
      type: String
    },
    collocation: {
      type: Object
    },
    id: {
      default: undefined
    }
  },
  data() {
    return {
      Helper,
      forms: [],
      lines: []
    }
  },
  async beforeMount() {
    if (this.word) {
      let forms = (await (await this.$openRussian).wordForms(this.word)).map(
        form => form.form.replace(/'/g, '')
      )
      this.forms = forms
    } else {
      this.forms = [this.word.bare]
    }
    if (this.collocation && this.collocation.Words) {
      this.collocation.Words = this.collocation.Words.sort(
        (a, b) => a.cm.length - b.cm.length
      )
        .filter(Word => !Word.cm.match(/(。|？)/))
        .slice(0, 20)
      let lines = []
      for (let Word of this.collocation.Words) {
        if (Word.cm) {
          lines.push(
            Helper.highlightMultiple(
              Word.cm,
              this.forms,
              this.level || 'outside'
            )
          )
        }
      }
      this.lines = lines
    }
  }
}
</script>
