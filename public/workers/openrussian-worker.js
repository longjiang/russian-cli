importScripts('../vendor/papaparse/papaparse.min.js')
importScripts('../js/openrussian.js')

let ready = false

onmessage = function(e) {
  const id = e.data[0]
  const method = e.data[1]
  const args = e.data[2]
  if (method === 'openrussianMethods') {
    this.postMessage([id, 'openrussianMethods', Object.keys(OpenRussian)])
  } else {
    let data = OpenRussian[method](...args)
    this.postMessage([id, method, data])
  }
}

OpenRussian.load().then(() => {
  ready = true
  this.postMessage([1, 'load', 'ready'])
})
