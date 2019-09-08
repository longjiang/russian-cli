<template>
  <component :is="tag" v-observe-visibility="visibilityChanged">
    <slot v-if="!this.annotated"></slot>
    <v-runtime-template
      v-else
      v-for="template of annotatedSlots"
      :template="template"
    />
  </component>
</template>

<script>
import wordblock from '@/components/WordBlock'
import VRuntimeTemplate from 'v-runtime-template'

export default {
  components: {
    wordblock,
    VRuntimeTemplate
  },
  props: {
    tag: {
      default: 'span'
    }
  },
  data() {
    return {
      annotatedSlots: [],
      annotated: false
    }
  },
  methods: {
    visibilityChanged(isVisible) {
      if (isVisible && !this.annotated) {
        this.annotated = true
        this.annotate()
      }
    },
    annotate() {
      if (this.$slots.default) {
        for (let slot of this.$slots.default) {
          let $before = $(slot.elm)
          this.annotatedSlots.push($(this.recursive($before[0]))[0].outerHTML)
        }
      }
    },
    breakSentences(text) {
      text = text.replace(/([.!?:])/g, '$1SENTENCEENDING!!!')
      let sentences = text.split('SENTENCEENDING!!!')
      return sentences.filter(sentence => sentence.trim() !== '')
    },
    markRussianWords(text) {
      let html = text
        .replace(/́/g, '')
        .replace(/([\wа-яё]+)/gi, '<WordBlock>$1</WordBlock>')
      return html
    },
    recursive(node) {
      if (node.nodeType === 3) {
        // textNode
        // break setnences
        let sentences = this.breakSentences(node.nodeValue)
        for (let sentence of sentences) {
          let sentenceSpan = $(
            `<span class="sentence">${this.markRussianWords(sentence)}</span>`
          )
          $(node).before(sentenceSpan)
        }
        $(node).remove()
      } else {
        // work with child nodes
        let nodes = []
        for (let n of node.childNodes) {
          nodes.push(n)
        }
        for (let n of nodes) {
          this.recursive(n)
        }
      }
      return node
    }
  }
}
</script>
