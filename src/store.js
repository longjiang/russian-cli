import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    savedWords: JSON.parse(localStorage.getItem('savedOpenRussianWords')) || []
  },
  mutations: {
    ADD_SAVED_WORD(state, id) {
      if (!state.savedWords.find(item => item === id)) {
        state.savedWords.push(id)
        localStorage.setItem(
          'savedOpenRussianWords',
          JSON.stringify(state.savedWords)
        )
      }
    },
    REMOVE_SAVED_WORD(state, id) {
      const keepers = state.savedWords.filter(item => item !== id)
      state.savedWords = keepers
      localStorage.setItem('savedOpenRussianWords', JSON.stringify(keepers))
    },
    REMOVE_ALL_SAVED_WORDS(state) {
      localStorage.removeItem('savedOpenRussianWords')
      state.savedWords = []
    }
  },
  actions: {
    addSavedWord({ commit, dispatch }, id) {
      // id = 'traditional,pinyin,index'
      commit('ADD_SAVED_WORD', id)
      dispatch('updateSavedWordsDisplay')
    },
    removeSavedWord({ commit, dispatch }, id) {
      commit('REMOVE_SAVED_WORD', id)
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
    hasSavedWord: state => id => {
      let yes = state.savedWords.find(item => item === id)
      return yes
    },
    savedWordCount: state => () => {
      return state.savedWords.length
    }
  }
})
