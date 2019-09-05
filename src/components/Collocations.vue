<template>
  <div>
    <div class="widget-title">Collocations with “{{ word.bare }}”</div>
    <div class="jumbotron-fluid bg-light p-4">
      <div class="row">
        <div
          class="col-sm-12 col-md-6 col-lg-4"
          v-for="(description, name) in colDesc"
          v-if="
            sketch &&
              sketch.Gramrels &&
              getGramrelsByName(sketch.Gramrels, name)
          "
        >
          <Collocation
            v-if="sketch && sketch.Gramrels"
            class="mb-4"
            :word="word"
            :level="level"
            :title="colDesc[name]"
            :type="name"
            :id="`collocation-${name}`"
            :collocation="getGramrelsByName(sketch.Gramrels, name)"
          ></Collocation>
        </div>
      </div>
      <div
        v-if="sketch !== undefined && (sketch === false || !sketch.Gramrels)"
      >
        Sorry, we could not find any “{{ word.bare }}” collocations in this corpus
        (dataset). You can set a different corpus in
        <a href="#/settings">Settings</a>.
      </div>
      <hr />
      <div class="mt-2">
        <p>Collocations provided by</p>
        <a
          target="_blank"
          :href="
            `https://app.sketchengine.eu/#wordsketch?corpname=${encodeURIComponent(
              SketchEngine.corpname
            )}&tab=basic&lemma=${word.bare}&showresults=1`
          "
        >
          <img
            src="img/logo-sketch-engine.png"
            alt="Sketch Engine"
            class="ml-2 logo-small"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Collocation from '@/components/Collocation.vue'
import SketchEngine from '@/lib/sketch-engine'

export default {
  props: {
    word: {
      type: Object
    },
    level: {
      default: 'outside'
    }
  },
  components: {
    Collocation
  },
  methods: {
    update() {
      SketchEngine.wsketch(this.word.bare, response => {
        this.sketch = response
      })
      this.colDesc = SketchEngine.collocationDescription(this.word.bare)
    },
    getGramrelsByName(gramrels, name) {
      return gramrels.find(
        gram => gram.name === name && gram.Words && gram.Words.length > 0
      )
    }
  },
  data() {
    return {
      colDesc: undefined,
      sketch: undefined,
      SketchEngine
    }
  },
  beforeMount() {
    this.update()
  },
  watch: {
    word() {
      this.update()
    }
  }
}
</script>
