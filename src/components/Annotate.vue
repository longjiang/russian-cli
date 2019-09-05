<template>
  <component :is="tag">
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      default: 'span'
    }
  },
  methods: {
    annotate() {
      if (this.$slots.default) {
        this.recursive(this.$slots.default[0].elm)
      }
    },
    breakSentences(text) {
      text = text.replace(/([.!?:])/g, '$1SENTENCEENDING!!!')
      let sentences = text.split('SENTENCEENDING!!!')
      return sentences
    },
    markRussianWords(text) {
      let html = text.replace(
        /([\wа-я]+)/gi,
        '<span class="word-block">$1</span>'
      )
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
    }
  },
  data() {
    return {
      annotated: undefined
    }
  },
  mounted() {
    if (!this.annotated) {
      this.annotate()
    }
  }
}
</script>
