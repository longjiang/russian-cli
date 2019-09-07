export default {
  words: [],
  tables: [
    // 'categories_words2', // not sure what this does
    // 'expressions_words', // not sure what this does
    // 'sentences_words', // 43 mb!
    // 'sentences', // 48 mb!
    // 'words_rels' // later, or just use SketchEngine
    {
      name: 'nouns',
      fields: []
    },
    {
      name: 'translations',
      fields: []
    },
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
      fields: ['sg1', 'sg2', 'sg3', 'pl1', 'pl2', 'pl3']
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
  ],
  loadTable(table) {
    return new Promise(resolve => {
      console.log(`OpenRussian: Loading table "${table}"`)
      Papa.parse(`/data/${table}.csv.txt`, {
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
  accent(text) {
    return text.replace(/'/g, '́')
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
              row.accented = this.accent(row.accented)
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
        promises.push(this.loadTable(table.name))
      }
      await Promise.all(promises)
      resolve(this)
    })
  },
  augment(word) {
    for (let table of this.tables) {
      if (table.name !== 'declensions') {
        word[table.name] = this[table.name][word.id]
      }
    }
    if (word.nouns) {
      word.decl_sg = this.declensions[word.nouns.decl_sg_id]
      word.decl_pl = this.declensions[word.nouns.decl_pl_id]
    }
    return word
  },
  get(id) {
    return this.augment(this.words[id])
  },
  lookup(text) {
    let word = this.words.find(word => word && word.bare === text)
    if (word) {
      return this.augment(word)
    }
  },
  wordForms(word) {
    let forms = []
    for (let table of this.tables.concat([
      {
        name: 'decl_pl',
        fields: ['acc', 'dat', 'gen', 'inst', 'nom', 'prep']
      },
      {
        name: 'decl_sg',
        fields: ['acc', 'dat', 'gen', 'inst', 'nom', 'prep']
      }
    ])) {
      for (let field of table.fields) {
        if (word[table.name]) {
          for (let form of word[table.name][field].split(',')) {
            forms.push({
              table: table.name,
              field: field,
              form: form.trim()
            })
          }
        }
      }
    }
    return forms
  },
  matchForms(text) {
    let matches = []
    for (let table of this.tables) {
      for (let index in this[table.name]) {
        let row = this[table.name][index]
        for (let field of table.fields) {
          if (
            row[field] &&
            row[field].replace(/ё/gi, 'е').replace("'", '') ===
              text.replace(/ё/gi, 'е')
          ) {
            let numbers = []
            if (table.name === 'declensions') {
              let word = this.augment(this.get(row.word_id))
              if (word.decl_sg && row[field] === word.decl_sg[field])
                numbers.push('singular')
              if (word.decl_pl && row[field] === word.decl_pl[field])
                numbers.push('plural')
            }
            matches.push({
              form: row[field],
              number: numbers.join(' and '),
              table: table.name,
              field: field,
              word_id: row.word_id,
              row: row
            })
          }
        }
      }
    }
    return matches
  },
  lookupFuzzy(text) {
    // find exact (case-insensitive matches)
    /*
    words = [
      {
        id: ...
        bare: ...
        matches: [
          {...}, {...}, ...
        ]
        // augmented data
      }
    ]
    */
    let words = this.words.filter(
      word => word && word.bare.toLowerCase() === text.toLowerCase()
    )
    let matches = this.matchForms(text)
    for (let match of matches) {
      let word = words.find(word => word.id === match.word_id)
      if (!word) {
        word = this.get(match.word_id)
        words.push(word)
      }
      word.matches = word.mathces || []
      word.matches.push(match)
    }
    words = words.map(word => this.augment(word))
    return words
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
      adjectives: 'adjective',
      incomparable: 'incomparable',
      short_f: 'short (fem.)',
      short_m: 'short (masc.)',
      short_n: 'short (neut.)',
      short_pl: 'short plural',
      superlative: 'superlative',
      conjugations: 'conjugation',
      pl1: 'мы',
      pl2: 'вы',
      pl3: 'они',
      sg1: 'я',
      sg2: 'ты',
      sg3: 'он/она',
      declensions: 'declension',
      decl_sg: 'singular',
      decl_pl: 'plural',
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
