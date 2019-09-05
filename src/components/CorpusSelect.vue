<template>
  <div class="corpus-select">
    <table class="table table-bordered table-responsive">
      <thead>
        <tr>
          <th></th>
          <th>Corpus</th>
          <th>Code</th>
          <th>Language</th>
          <th>Words</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="corpus in SketchEngine.corpra.filter(
            corpus =>
              corpus.language === 'Russian'
          )"
        >
          <td>
            <input
              type="radio"
              :value="corpus.code"
              :checked="corpus.code === SketchEngine.corpname()"
              v-model="corpname"
            />
          </td>
          <td>{{ corpus.name }}</td>
          <td>
            <code>{{ corpus.code }}</code>
          </td>
          <td>{{ corpus.language }}</td>
          <td class="text-right">
            {{ Intl.NumberFormat('en-US').format(corpus.words) }}
          </td>
          <td v-html="corpus.note"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import SketchEngine from '@/lib/sketch-engine'
export default {
  data() {
    return {
      SketchEngine,
      corpname: SketchEngine.corpname()
    }
  },
  watch: {
    corpname() {
      localStorage.setItem('rzhCorpname', this.corpname)
      location.reload() // Otherwise users won't see the new collocations and example sentences, leaving them confused.
    }
  }
}
</script>

<style></style>
