export default {
  test: 'success',
  nouns: [],
  loadWords() {
    return new Promise(resolve => {
      console.log('OpenRussian: Loading nouns')
      Papa.parse('/data/words.csv', {
        download: true,
        header: true,
        complete: results => {
          this.nouns = results.data.sort((a, b) =>
            a.russian && b.russian ? a.russian.length - b.russian.length : 0
          )
          resolve(this)
        }
      })
    })
  },
  loadNouns() {
    return new Promise(resolve => {
      console.log('OpenRussian: Loading words')
      Papa.parse('/data/nouns.csv', {
        download: true,
        header: true,
        complete: results => {
          this.nouns = results.data.sort((a, b) =>
            a.russian && b.russian ? a.russian.length - b.russian.length : 0
          )
          resolve(this)
        }
      })
    })
  },
  load() {
    console.log('OpenRussian: Loading')
    return new Promise(async resolve => {
      let promises = [this.loadWords(), this.loadNouns()]
      await Promise.all(promises)
      resolve(this)
    })
  }
}
