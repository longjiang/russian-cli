const OpenRussian = {
  words: [],
  cache: {},
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
  loadDeclensions() {
    return new Promise(resolve => {
      console.log(`OpenRussian: Loading declensions`)
      Papa.parse(`/data/declensions.csv.txt`, {
        download: true,
        header: true,
        complete: results => {
          let declensions = []
          for (let row of results.data) {
            declensions[row.id] = row
          }
          for (let word of this.words) {
            if (word) {
              word.declensions = {}
              if (word.nouns) {
                if (word.nouns.decl_pl_id) {
                  word.decl_pl = declensions[word.nouns.decl_pl_id]
                }
                if (word.nouns.decl_sg_id) {
                  word.decl_sg = declensions[word.nouns.decl_sg_id]
                }
              }
              if (word.adjectives) {
                if (word.adjectives.decl_f_id) {
                  word.decl_f = declensions[word.adjectives.decl_f_id]
                }
                if (word.adjectives.decl_m_id) {
                  word.decl_m = declensions[word.adjectives.decl_m_id]
                }
                if (word.adjectives.decl_n_id) {
                  word.decl_n = declensions[word.adjectives.decl_n_id]
                }
                if (word.adjectives.decl_p_id) {
                  word.decl_pl = declensions[word.adjectives.decl_pl_id]
                }
              }
            }
          }
          resolve(this)
        }
      })
    })
  },
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
            let word = this.words[row.word_id]
            if (word) {
              word[table] = row
            }
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
  load() {
    return new Promise(async resolve => {
      let promises = [this.loadWords()]
      for (let table of this.tables.filter(
        table => table.name !== 'declensions'
      )) {
        promises.push(this.loadTable(table.name))
      }
      promises.push(this.loadDeclensions())
      await Promise.all(promises)
      console.log(this.get(127))
      resolve(this)
    })
  },
  /*
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
  */
  get(id) {
    return this.words[id]
  },
  lookup(text) {
    let word = this.words.find(word => word && word.bare === text)
    return word
  },
  wordForms(word) {
    let forms = []
    let decl_fields = ['acc', 'dat', 'gen', 'inst', 'nom', 'prep']
    if (word) {
      for (let table of this.tables.concat([
        {
          name: 'decl_pl', // adjective and nouns
          fields: decl_fields
        },
        {
          name: 'decl_sg', // nouns
          fields: decl_fields
        },
        {
          name: 'decl_m', // adjectives
          fields: decl_fields
        },
        {
          name: 'decl_f', // adjectives
          fields: decl_fields
        },
        {
          name: 'decl_n', // adjectives
          fields: decl_fields
        }
      ])) {
        for (let field of table.fields) {
          if (word[table.name] && word[table.name][field]) {
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
    }
    return forms
  },
  matchForms(text) {
    text = text.toLowerCase().replace(/ё/gi, 'е')
    console.log('matching', text)
    /*
    foundWords = [
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
    // Find exact matches first
    if (this.cache[text]) {
      return this.cache[text]
    }
    this.cache[text] = []
    let foundWords = this.words.filter(
      word => word && word.bare.replace(/ё/gi, 'е').toLowerCase() === text
    )
    for (let word of this.words) {
      for (let form of this.wordForms(word)) {
        if (form.form.replace(/ё/gi, 'е').replace("'", '') === text) {
          let numbers = []
          if (form.table === 'decl_pl') {
            numbers.push('plural')
          }
          if (form.table === 'decl_sg') {
            numbers.push('singular')
          }
          form.number = numbers.join(' and ')
          let foundWord = foundWords.find(w => w.id === word.id)
          if (!foundWord) {
            foundWords.push(word)
          } else {
            word = foundWord
          }
          word.matches = word.matches || []
          word.matches.push(form)
        }
      }
    }
    this.cache[text] = foundWords
    return foundWords
  },
  lookupFuzzy(text) {
    return this.matchForms(text)
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
    return this.randomProperty(this.words)
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
      decl_f: 'feminine',
      decl_m: 'masculine',
      decl_n: 'neuter',
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
