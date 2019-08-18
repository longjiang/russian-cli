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
          <EndingLookup v-if="files" :files="files" />
        </div>
        <div class="col-md-4" role="form">
          <EndingLookup v-if="files" :files="files" />
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
import EndingLookup from '@/components/EndingLookup'

export default {
  components: {
    EndingLookup
  },
  mounted() {
    loadAllCsvsThen(files => {
      this.files = files
    })
  },
  data() {
    return {
      files: undefined,
      mKey: 0,
      preposition: ''
    }
  },
  computed: {
    prepositionMessages() {
      // return [this.ending2]
      return lookupPrepositions(this.preposition, this.files)
    }
  }
}
</script>
