/* This is an interface to the worker */
import Helper from '@/lib/helper'

export default {
  worder: undefined,
  load() {
    return new Promise(resolve => {
      // worker ready
      this.worker = new Worker('./workers/openrussian-worker.js')
      this.worker.addEventListener('message', e => {
        if (e.data[1] === 'load' && e.data[2] === 'ready') {
          this.worker.postMessage([1, 'openrussianMethods'])
        }
        if (e.data[1] === 'openrussianMethods') {
          this.makeOpenRussianAvailable(e.data[2])
          resolve(this)
        }
      })
    })
  },
  makeOpenRussianAvailable(methods) {
    for (let method of methods) {
      if (method !== 'load') {
        this[method] = function() {
          return new Promise(resolve => {
            let id = Helper.uniqueId()
            let m1 = e => {
              if (e.data[0] === id && e.data[1] === method) {
                resolve(e.data[2])
                this.worker.removeEventListener('message', m1)
              }
            }
            this.worker.postMessage([id, method, [...arguments]])
            this.worker.addEventListener('message', m1)
          })
        }
      }
    }
  }
}
