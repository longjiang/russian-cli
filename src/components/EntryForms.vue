<template>
  <div id="entry-morphology">
    <div class="widget-title">Word forms of “{{ word.bare }}”</div>
    <div class="jumbotron-fluid bg-light p-4">
      <div class="row">
        <div
          class="col-sm-12 col-md-6 col-lg-4 mb-4"
          v-for="(table, tableName) in tables"
        >
          <h6>
            {{
              tableName === 'verbs'
                ? Helper.ucFirst(
                    table.find(field => field.field === 'aspect').form
                  )
                : ''
            }}
            {{ Helper.ucFirst(OpenRussian.stylize(tableName)) }}
            {{
              tableName === 'adjectives'
                ? parseInt(
                    table.find(field => field.field === 'incomparable').form
                  ) === 0
                  ? ' (Comprable)'
                  : ' (Incomprable)'
                : ''
            }}
          </h6>
          <hr class="mt-0 mb-3" />
          <table>
            <tbody>
              <tr
                v-for="row in table"
                v-if="row.field !== 'aspect' && row.field !== 'incomparable'"
              >
                <td>
                  {{ OpenRussian.stylize(row.field) }}
                </td>
                <td>
                  <b :data-level="word.level || 'outside'" class="ml-2"
                    >{{ OpenRussian.accent(row.form)
                    }}{{ row.field.startsWith('imperative') ? '!' : '' }}</b
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OpenRussian from '@/lib/openrussian'
import Helper from '@/lib/helper'

export default {
  props: {
    word: {
      type: Object
    }
  },
  data() {
    return {
      Helper,
      OpenRussian,
      tables: []
    }
  },
  async mounted() {
    // https://www.consolelog.io/group-by-in-javascript/
    Array.prototype.groupBy = function(prop) {
      return this.reduce(function(groups, item) {
        const val = item[prop]
        groups[val] = groups[val] || []
        groups[val].push(item)
        return groups
      }, {})
    }
    this.tables = (await this.$openRussian)
      .wordForms(this.word)
      .groupBy('table')
    console.log(this.tables)
  }
}
</script>
