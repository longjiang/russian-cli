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
          <div class="export-wrapper hidden text-left mt-4">
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
          <WordList :words="savedWords"></WordList>
          <a
            v-if="savedWordIds.length > 0"
            class="btn btn-warning mt-4 mb-5"
            :href="`#/learn/saved`"
          >
            <i class="glyphicon glyphicon-blackboard"></i> Learn These Words
          </a>
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
import Helper from '@/lib/helper'
import { mapState } from 'vuex'

export default {
  template: '#saved-words-template',
  components: {
    WordList
  },
  data() {
    return {
      loaded: false,
      savedWords: [],
      selectedCsvOptions: ['hangul', 'hanja', 'definitions'],
      csvOptions: [
        { text: 'Simplified', value: 'simplified' },
        { text: 'Traditional', value: 'traditional' },
        { text: 'Pinyin', value: 'pinyin' },
        { text: 'Definitions', value: 'definitions' },
        { text: 'Measure Words', value: 'measureWords' }
      ]
    }
  },
  computed: mapState({
    savedWordIds: state => state.savedWords
  }),
  watch: {
    savedWordIds() {
      this.updateWords()
    },
    selectedCsvOptions() {
      $('#export-textarea').val(this.csv())
    }
  },
  mounted() {
    this.updateWords()
  },
  methods: {
    updateWords() {
      this.savedWords = []

      Helper.loaded(LoadedKEngDic => {
        this.loaded = true
        this.savedWordIds.forEach(id => {
          this.savedWords.push(LoadedKEngDic.get(id))
        })
      })
    },
    csv() {
      if (this.savedWords.length <= 0) {
        return ''
      }

      return this.savedWords
        .map(word => {
          let textToDisplay = ''

          if (this.selectedCsvOptions.includes('hangul')) {
            textToDisplay += `${word.hangul}\t`
          }

          if (this.selectedCsvOptions.includes('hanja')) {
            textToDisplay += `${word.hanja}\t`
          }

          if (this.selectedCsvOptions.includes('definitions')) {
            const definitions = word.english

            textToDisplay += `${definitions}\t`
          }

          return textToDisplay
        })
        .join('\n')
    },
    showImportClick() {
      $('.import-wrapper').toggleClass('hidden')
    },
    showExportClick() {
      $('#export-textarea').val(this.csv())
      $('.export-wrapper').toggleClass('hidden')
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
