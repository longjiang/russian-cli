<template>
  <div class="main focus">
    <div class="jumbotron jumbotron-fluid bg-white pt-5 pb-3 mb-0">
      <div class="container focus-exclude">
        <div class="row">
          <div class="col-sm-12">
            <div class="text-center">
              <h2 class="mb-4">For the love of Russian words.</h2>
              <Loader ref="loader" class="mb-5" />
            </div>
            <SearchCompare
              :searchEntry="entry"
              class="mb-5"
              :key="`search-${args}`"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="saved()"
      class="jumbotron jumbotron-fluid pt-3 pb-3 bg-secondary"
    >
      <div class="container focus-exclude text-center text-light">
        <Paginator
          :key="`paginator-${args}`"
          :items="$store.state.savedWords"
          :findCurrent="item => item.join(',').replace(/ /g, '_') === entry.id"
          :url="
            item =>
              `#/dictionary/openrussian/${item.join(',').replace(/ /g, '_')}`
          "
          title="Saved Words"
        />
      </div>
    </div>
    <div v-if="entry">
      <div class="text-center">
        <!-- <Loader class="mt-5" /> -->
      </div>
      <div class="container mb-4">
        <div class="row">
          <div class="col-sm-12 text-center">
            <EntryHeader :entry="entry" :key="`header-${args}`"></EntryHeader>
            <DefinitionsList
              :key="`def-list-${args}`"
              v-if="entry.translations"
              class="mt-4"
              :definitions="[entry.translations.tl]"
            ></DefinitionsList>
          </div>
        </div>
      </div>

      <!-- <EntryDisambiguation> already finds some pretty good suggestions. -->
      <!-- <EntryRelated class="mb-5" :entry="entry"></EntryRelated> -->

      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <WebImages
              :key="`images-${args}`"
              class="mt-5"
              :text="entry.bare"
              :entry="entry"
              limit="10"
            />
            <EntryForms class="mt-5" :word="entry" />

            <Collocations
              :key="`collocations-${args}`"
              class="mt-5 mb-5"
              :word="entry"
              :level="entry.level"
            />
            <Concordance
              :key="`concordance-${args}`"
              class="mt-5 mb-5"
              :word="entry"
              :level="entry.level"
            />
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <EntryYouTube
              :text="entry.bare"
              class="mb-5"
            />
          </div>
        </div>
      </div>
      <!-- <InstagramButton :entry="entry" class="mb-5"></InstagramButton> -->
    </div>
  </div>
</template>

<script>
import Concordance from '@/components/Concordance.vue'
import Collocations from '@/components/Collocations.vue'
import EntryHeader from '@/components/EntryHeader.vue'
import WebImages from '@/components/WebImages.vue'
import SearchCompare from '@/components/SearchCompare.vue'
import DefinitionsList from '@/components/DefinitionsList'
import EntryForms from '@/components/EntryForms'
import Paginator from '@/components/Paginator'
import EntryYouTube from '@/components/EntryYouTube.vue'

export default {
  components: {
    SearchCompare,
    EntryForms,
    Collocations,
    Concordance,
    EntryHeader,
    DefinitionsList,
    Paginator,
    WebImages,
    EntryYouTube
  },
  props: {
    method: {
      type: String
    },
    args: {
      type: String
    }
  },
  data() {
    return {
      entry: undefined,
      characters: [],
      character: {},
      unsplashSrcs: [],
      unsplashSearchTerm: ''
    }
  },
  methods: {
    saved() {
      return false
      // return this.entry && this.$store.getters.hasSavedWord(this.entry.id)
    },
    show(entry) {
      this.entry = entry
      document.title = `${entry.bare} (${entry.english}) | Russian Zero to Hero`
    },
    async route() {
      if (this.method && this.args) {
        if (this.method === 'openrussian') {
          if (this.args === 'random') {
            this.random()
          } else {
            this.entry = await (await this.$openRussian).get(this.args)
          }
        } else {
          if (!this.entry) {
            this.random()
          }
        }
      }
    },
    async random() {
      let randomId = (await (await this.$openRussian).random()).id
      location.hash = `#/dictionary/openrussian/${randomId}`
    }
  },
  watch: {
    $route() {
      if (this.$route.name === 'dictionary') {
        this.route()
      }
    }
  },
  mounted() {
    if (this.$route.name === 'dictionary') {
      this.route()
    }
  }
}
</script>

<style></style>
