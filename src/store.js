import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    savedWords: JSON.parse(localStorage.getItem('savedOpenRussianWords')) || []
  },
  mutations: {
    ADD_SAVED_WORD(state, wordForms) {
      if (
        !state.savedWords.find(item => {
          if (item && Array.isArray(item)) {
            return item.join(',') === wordForms.join(',')
          }
        })
      ) {
        state.savedWords.push(wordForms)
        localStorage.setItem(
          'savedOpenRussianWords',
          JSON.stringify(state.savedWords)
        )
      }
    },
    REMOVE_SAVED_WORD(state, wordForm) {
      const keepers = state.savedWords.filter(item => !item.includes(wordForm))
      state.savedWords = keepers
      localStorage.setItem('savedOpenRussianWords', JSON.stringify(keepers))
    },
    REMOVE_ALL_SAVED_WORDS(state) {
      localStorage.removeItem('savedOpenRussianWords')
      state.savedWords = []
    }
  },
  actions: {
    addSavedWord({ commit, dispatch }, wordForms) {
      commit('ADD_SAVED_WORD', wordForms)
      dispatch('updateSavedWordsDisplay')
    },
    removeSavedWord({ commit, dispatch }, wordForm) {
      commit('REMOVE_SAVED_WORD', wordForm)
      dispatch('updateSavedWordsDisplay')
    },
    removeAllSavedWords({ commit, dispatch }) {
      commit('REMOVE_ALL_SAVED_WORDS')
      dispatch('updateSavedWordsDisplay')
    },
    blinkedSavedWordsButton() {
      $('.tab-saved-words').removeClass('blink')
      setTimeout(() => {
        $('.tab-saved-words').addClass('blink')
      }, 500)
    },
    updateSavedWordsDisplay({ dispatch, getters }) {
      dispatch('blinkedSavedWordsButton')
    }
  },
  getters: {
    hasSavedWord: state => text => {
      let yes = state.savedWords.find(item => item.includes(text))
      return yes
    },
    savedWordCount: state => () => {
      return state.savedWords.length
    }
  }
})
