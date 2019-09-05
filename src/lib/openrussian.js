export default {
  words: [],
  tables: [
    'adjectives',
    // 'categories_words2', // not sure what this does
    'conjugations',
    'declensions',
    'expressions_words',
    'nouns',
    // 'sentences_words', // 43 mb!
    // 'sentences', // 48 mb!
    'translations',
    'verbs'
    // 'words_rels' // later, or just use SketchEngine
  ],
  loadTable(table) {
    return new Promise(resolve => {
      console.log(`OpenRussian: Loading table "${table}"`)
      Papa.parse(`/data/${table}.csv`, {
        download: true,
        header: true,
        complete: results => {
          this[table] = []
          if (table === 'translations') {
            results.data = results.data.filter(row => row.lang === 'en')
          }
          for (let row of results.data) {
            this[table][table === 'declensions' ? row.id : row.word_id] = row
          }
          resolve(this)
        }
      })
    })
  },
  loadWords() {
    return new Promise(resolve => {
      console.log('OpenRussian: Loading words')
      Papa.parse('/data/words.csv', {
        download: true,
        header: true,
        complete: results => {
          for (let row of results.data) {
            if (row.accented) {
              row.accented = row.accented.replace(/'/g, '́')
            }
            this.words[row.id] = row
          }
          resolve(this)
        }
      })
    })
  },
  loadTranslations() {
    return new Promise(resolve => {
      console.log('OpenRussian: Loading translations')
      Papa.parse('/data/translations.csv', {
        download: true,
        header: true,
        complete: results => {
          for (let row of results.data.filter(row => row.lang === 'en')) {
            this.translations[row.word_id] = row
          }
          resolve(this)
        }
      })
    })
  },
  load() {
    return new Promise(async resolve => {
      let promises = [this.loadWords()]
      for (let table of this.tables) {
        promises.push(this.loadTable(table))
      }
      await Promise.all(promises)
      console.log(this)
      resolve(this)
    })
  },
  augment(word) {
    for (let table of this.tables) {
      if (table !== 'declensions') {
        word[table] = this[table][word.id]
      }
    }
    if (word.nouns) {
      word.decl_sg = this.declensions[word.nouns.decl_sg_id]
      word.decl_pl = this.declensions[word.nouns.decl_pl_id]
    }
    return word
  },
  get(id) {
    return this.words[id]
  },
  lookup(text) {
    let word = this.words.find(word => word && word.bare === text)
    if (word) {
      return this.augment(word)
    }
  },
  wordForms(text) {
    let tables = [
      {
        name: 'adjectives',
        fields: [
          'incomparable',
          'short_f',
          'short_m',
          'short_n',
          'short_pl',
          'superlative'
        ]
      },
      {
        name: 'conjugations',
        fields: ['pl1', 'pl2', 'pl3', 'sg1', 'sg2', 'sg3']
      },
      {
        name: 'declensions',
        fields: ['acc', 'dat', 'gen', 'inst', 'nom', 'prep']
      },
      {
        name: 'verbs',
        fields: [
          'aspect',
          'imperative_pl',
          'imperative_sg',
          'partner',
          'past_f',
          'past_m',
          'past_n',
          'past_pl'
        ]
      }
    ]
    let forms = []
    for (let table of tables) {
      for (let index in this[table.name]) {
        let row = this[table.name][index]
        for (let field of table.fields) {
          if (row[field] && row[field].replace("'", '') === text) {
            forms.push({
              morphed: row[field],
              table: table.name,
              field: field,
              word_id: row.word_id,
              row: row
            })
          }
        }
      }
    }
    return forms
  },
  lookupFuzzy(text) {
    let words = this.words.filter(word => word && word.bare === text)
    let forms = this.wordForms(text)
    for (let form of forms) {
      let word = this.get(form.word_id)
      word.match = form
      words.push(word)
    }
    return words.map(word => this.augment(word))
  },
  randomArrayItem(array, start = 0, length = false) {
    length = length || array.length
    array = array.slice(start, length)
    let index = Math.floor(Math.random() * array.length)
    return array[index]
  },
  //https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
  randomProperty(obj) {
    var keys = Object.keys(obj)
    return obj[keys[(keys.length * Math.random()) << 0]]
  },
  random() {
    return this.augment(this.randomProperty(this.words))
  },
  stylize(name) {
    const stylize = {
      adjectives: 'adjectives',
      incomparable: 'incomparable',
      short_f: 'short feminine',
      short_m: 'short masculine',
      short_n: 'short neuter',
      short_pl: 'short plural',
      superlative: 'superlative',
      conjugations: 'conjugation',
      pl1: 'plural',
      pl2: 'plural',
      pl3: 'plural',
      sg1: 'singular',
      sg2: 'singular',
      sg3: 'singular',
      declensions: 'declension',
      acc: 'accusative',
      dat: 'dative',
      gen: 'genitive',
      inst: 'instrumental',
      nom: 'nominative',
      prep: 'prepositional',
      verbs: 'verb',
      aspect: 'aspect',
      imperative_pl: 'imperative plural',
      imperative_sg: 'imperative singular',
      partner: 'partner',
      past_f: 'past (feminine)',
      past_m: 'past (masculine)',
      past_n: 'past (neuter)',
      past_pl: 'past (plural)'
    }
    return stylize[name]
  }
}
