<template>
  <div class="main pt-5 pb-5">
    <div class="container mt2 mb2">
      <div class="row">
        <div class="col-sm-12">
          <h4>Reader</h4>
          <p>
            Write or paste in some Russian text, and annotated text will show up
            below the textbox. You can also use
            <b>Markdown or HTML tags</b>. Everything is autosaved to your
            browser’s <code>localStorage</code>, so even if you refresh your
            browser everything you entered is still here.
          </p>
          <div class="mt-4 mb-5">
            <textarea
              id="reader-textarea"
              class="form-control"
              cols="30"
              rows="5"
              placeholder="Enter your Russian text here. Markdown and HTML also supported."
              v-model="text"
            ></textarea>
          </div>
          <Loader class="mb-5" />
          <div
            v-if="text.length > 0"
            :key="readerKey"
            id="reader-annotated"
            class="focus"
          >
            <Annotate
              tag="div"
              v-for="line of marked
                .trim()
                .replace(/<(div|p|li|h1|h2|h3|h4|h5|h6)/g, '\n<$1')
                .split('\n')"
              v-if="line.trim().length > 0"
              class="mb-3"
              ><div v-html="line.trim()"
            /></Annotate>
          </div>
        </div>
      </div>
      <hr />
      <div class="row mt-5">
        <div class="col-sm-12">
          <h5 class="mb-3">Not sure what to read?</h5>
          <p>Try these resources:</p>
          <ul>
            <li>
              Look for Russian music lyrics on 
              <a href="http://www.megalyrics.ru/lyric/kino/gruppa-krovi.htm">Megalyrics</a>.
            </li>
            <li>
              Read books from various Russian sources directly in our
              <a href="#/library">Library</a>.
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- .container -->

    <!-- ANCHOR img/anchors/learn-this.png -->
    <div class="container-fluid learn-this-bar">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 text-center"></div>
        </div>
      </div>
    </div>
    <!-- .container-fluid -->
  </div>
</template>

<script>
import $ from 'jquery'
import Helper from '@/lib/helper'
import Marked from 'marked'

const Reader = {
  get() {
    return localStorage.getItem('rzhReaderText')
  },
  save(text) {
    localStorage.setItem('rzhReaderText', text)
  }
}

export default {
  template: '#reader-template',
  data() {
    return {
      text: '',
      annotated: false,
      readerKey: 0, // used to force re-render this component
      savedWordsKey: 0
    }
  },
  computed: {
    marked() {
      return (
        Marked(this.text.replace(/^ {4,}/gm, '')) || this.text // 4 spaces in a row would emit <code>!
      )
    }
  },
  watch: {
    $route() {
      if (this.$route.name === 'reader') {
        this.$store.dispatch('updateSavedWordsDisplay')
        this.route()
      }
    },
    text() {
      this.readerKey++
      Reader.save(this.text)
    }
  },
  mounted() {
    if (this.$route.name === 'reader') {
      this.$store.dispatch('updateSavedWordsDisplay')
      this.route()
    }
  },
  methods: {
    startClick() {
      if (this.text) {
        Reader.save(this.text)
        this.readerKey++
      }
    },
    show() {
      const marked = Marked(this.text) || this.text
      if (marked) {
        $('#reader-annotated').html(marked)
      }
    },
    route() {
      let method = this.$route.params.method
      let arg = this.$route.params.arg
      if (method) {
        if (method === 'md-url') {
          Helper.proxy(arg, md => {
            this.text = md
            // this.show()
          })
        }
        if (method === 'html-url') {
          Helper.scrape(arg, (html, response, text) => {
            this.text = text
            // this.show()
          })
        }
        if (method === 'md') {
          this.text = arg
          // this.show()
        }
        if (method === 'html') {
          this.text = arg
          // this.show()
        }
        if (method === 'txt') {
          this.text = arg.replace(/\n/g, '<br>')
          // this.show()
        }
      } else {
        if (!this.text) {
          const text = Reader.get()
          if (text) {
            this.text = text
            // this.show()
          }
        }
      }
    }
  }
}
</script>
