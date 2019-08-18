<template>
  <div>
    <div class="container main mt-5 mb-5">
      <div class="row">
        <div class="col-sm-12">
          <h3 class="mb-5">Lookup Russian Case Ending</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4" role="form">
          <div class="input-group mb-3">
            <input
              type="text"
              id="search-field-1"
              class="form-control"
              placeholder="ых"
              v-model="ending1"
            />
            <div class="input-group-append">
              <button id="lookup-1" class="btn btn-primary" type="botton">
                <font-awesome-icon icon="search" />
              </button>
            </div>
          </div>
          <div v-if="ending1" class="results-1">
            <p class="result-heading-1">
              A word ending in
              <b>"-{{ ending1 }}"</b> can be:
            </p>
            <ul class="result-list-1">
              <li
                class="result-item"
                v-for="(message, index) in messages1"
                v-html="message"
                :key="`m1-${mKey + index}`"
              ></li>
            </ul>
          </div>
        </div>
        <div class="col-md-4" role="form">
          <div class="input-group mb-3">
            <input
              type="text"
              id="search-field-2"
              class="form-control"
              placeholder="ках"
              v-model="ending2"
            />
            <div class="input-group-append">
              <button id="lookup-2" class="btn btn-primary" type="botton">
                <font-awesome-icon icon="search" />
              </button>
            </div>
          </div>
          <div v-if="ending2" class="results-2">
            <p class="result-heading-2">
              A word ending in
              <b>"-{{ ending2 }}"</b> can be:
            </p>
            <ul class="result-list-2">
              <li
                class="result-item"
                v-for="(message, index) in messages2"
                v-html="message"
                :key="`m1-${mKey + index}`"
              ></li>
            </ul>
          </div>
        </div>
        <div class="col-md-4" role="form">
          <div class="input-group mb-3">
            <input
              type="text"
              id="search-field-3"
              class="form-control"
              v-model="preposition"
              placeholder="по"
            />
            <div class="input-group-append">
              <button id="lookup-3" class="btn btn-success" type="botton">
                <font-awesome-icon icon="search" />
              </button>
            </div>
          </div>
          <div v-if="preposition" class="results-3">
            <p class="result-heading-3">
              Prepositions matching
              <b>"{{ preposition }}"</b>:
            </p>
            <ul class="result-list-3">
              <li
                class="result-item"
                v-for="(message, index) in prepositionMessages"
                v-html="message"
                :key="`mp-${mKey + index}`"
              ></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    loadAllCsvsThen(files => {
      this.files = files
      // attachIndexEventListeners()
    })
  },
  data() {
    return {
      ending1: '',
      ending2: '',
      files: undefined,
      preposition: '',
      mKey: 0
    }
  },
  computed: {
    messages1() {
      // return [this.ending1]
      return lookup(this.ending1, this.files)
    },
    messages2() {
      // return [this.ending2]
      return lookup(this.ending2, this.files)
    },
    prepositionMessages() {
      // return [this.ending2]
      return lookupPrepositions(this.preposition, this.files)
    }
  }
}
</script>
