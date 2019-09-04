<template>
  <div class="main mt-4 mb-5" v-cloak>
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <h1 class="page-title mb-4">
            Settings
          </h1>
          <div>
            <h4>Text Corpus Settings</h4>
            <p>
              A
              <a
                href="https://en.wikipedia.org/wiki/Text_corpus"
                target="_blank"
                >text corpus</a
              >
              is a large collection of text written in a language, where we can
              extract collocations and example sentences.
              <a href="https://www.sketchengine.eu/">Sketch Engine</a>, our text
              corpra provider, has a number of Russian text corpra to select
              from. Depending on the corpus you choose, the example sentences
              and collocations you see will be different.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container-fluid">
      <CorpusSelect />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div class="jumbotron mt-5 p-4 bg-warning text-dark">
            Settings are <b>automatically saved</b> as soon as you make the
            change.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CorpusSelect from '@/components/CorpusSelect'

export default {
  components: {
    CorpusSelect
  },
  data() {
    return {
    }
  }
}
</script>
