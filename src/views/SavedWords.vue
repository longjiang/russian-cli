<template>
  <div class="main container mt-4 mb-4" v-cloak>
    <div class="row">
      <div class="col-sm-12">
        <h4>My Words</h4>
        <p>
          These words are stored in your browser's local storage, which persists
          unless you clear your browsing data.
        </p>
        <hr />
        <div class="my-words-tools mt-2 mb-2 text-right">
          <button
            class="upload-list btn btn-primary"
            v-on:click="showExportClick"
            :disabled="this.savedWords.length <= 0"
          >
            <i class="glyphicon glyphicon-cloud-download"></i> Export CSV</button
          >&nbsp;
          <button
            class="remove-all btn btn-danger"
            v-on:click="removeAllClick"
            :disabled="this.savedWords.length <= 0"
          >
            <i class="glyphicon glyphicon-trash"></i>
            Clear
          </button>
          <div class="export-wrapper text-left mt-4" v-if="showExport">
            <p>
              <b>Copy</b> the text below and <b>paste</b> into your spreadsheet
              program, or a flashcard app like Anki or Quizlet.
            </p>
            <b-form-group label="Inlcude:">
              <b-form-checkbox-group
                v-model="selectedCsvOptions"
                :options="csvOptions"
              ></b-form-checkbox-group>
            </b-form-group>
            <textarea
              id="export-textarea"
              class="mt-2 mb-2 form-control"
              cols="30"
              rows="10"
              v-model="csvText"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
    <!-- .row -->
    <div class="row">
      <div class="col-sm-12">
        <p
          v-if="loaded && savedWords.length <= 0"
          class="alert alert-warning no-saved-words"
        >
          You don't have any words saved yet. Save words by clicking on the
          <i class="glyphicon glyphicon-star-empty"></i> icon next to it.
        </p>
        <div>
          <Loader />
          <WordList :words="savedWords" :texts="savedTexts"></WordList>
        </div>
      </div>
    </div>
    <!-- .row -->
  </div>
  <!-- .container -->
</template>

<script>
import $ from 'jquery'
import WordList from '@/components/WordList.vue'
import { mapState } from 'vuex'

export default {
  template: '#saved-words-template',
  components: {
    WordList
  },
  data() {
    return {
      loaded: false,
      csvText: '',
      showExport: false,
      savedWords: [],
      savedTexts: [],
      selectedCsvOptions: ['russian', 'english'],
      csvOptions: [
        { text: 'Russian', value: 'russian' },
        { text: 'English', value: 'english' }
      ]
    }
  },
  watch: {
    selectedCsvOptions() {
      $('#export-textarea').val(this.csv())
    },
    stateSavedWords() {
      this.updateWords()
    }
  },
  mounted() {
    this.updateWords()
  },
  computed: mapState({
    stateSavedWords: state => state.savedWords
  }),
  methods: {
    async updateWords() {
      this.savedWords = []
      this.savedTexts = []
      for (let wordForms of this.$store.state.savedWords) {
        let word = await (await this.$openRussian).lookup(wordForms[0])
        if (word) {
          this.savedWords.push(word)
        } else {
          this.savedTexts.push(wordForms[0])
        }
      }
    },
    async csv() {
      if (this.savedWords.length <= 0) {
        return ''
      }

      let csv = ''
      for (let word of this.savedWords) {
        if (this.selectedCsvOptions.includes('russian')) {
          let a = word.accented
          csv += `${a}\t`
        }

        if (this.selectedCsvOptions.includes('english')) {
          csv += `${word.translations ? word.translations.tl : ''}\t`
        }
        csv += '\n'
      }
      return csv
    },
    showImportClick() {
      $('.import-wrapper').toggleClass('hidden')
    },
    async showExportClick() {
      this.showExport = !this.showExport
      this.csvText = this.csv()
    },
    removeAllClick() {
      const confirmed = confirm(
        'Are you sure you want to remove all your saved words?'
      )
      if (confirmed) {
        this.$store.dispatch('removeAllSavedWords')
        $('.export-wrapper').toggleClass('hidden', true)
      }
    }
  }
}
</script>
