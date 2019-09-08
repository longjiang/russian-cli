import Helper from './helper'
import Config from './config'

export default {
  savePhoto(word, url, callback) {
    $.getJSON(
      `${Config.savePhoto}?id=${word.hskId}&word=${
        word.simplified
      }&url=${encodeURIComponent(url)}`,
      callback
    )
  },
  getPhoto(word, success, fail = () => {}) {
    let src = `${Config.imageUrl}${word.hskId}-${word.simplified}.jpg`
    this.testImage(src, success, fail)
  },
  testImage(image, success, fail = () => {}) {
    let tester = new Image()
    tester.onload = () => {
      success(image)
    }
    tester.onerror = () => {
      fail(image)
    }
    tester.src = image.img
  },
  testImages(images, success, fail = () => {}) {
    if (images.length === 0) return
    for (let image of images) {
      this.testImage(image, success, fail)
    }
  },
  findFirstWorkingImage(srcs, success, fail = () => {}) {
    if (srcs.length === 0) {
      fail()
      return
    }
    let f = srcs => {
      this.findFirstWorkingImage(srcs.slice(1), success, srcs => {
        f(srcs)
      })
    }
    this.testImage(srcs[0], success, () => {
      f(srcs)
    })
  },
  tryImg(src) {
    return new Promise(resolve => {
      let tester = new Image()
      tester.onload = () => {
        resolve(true)
      }
      tester.src = src
    })
  },
  // strWord = "视频"
  getWebImages(strWord, callback, proxy = `${Config.proxy}?`) {
    $.getJSON(
      `${proxy}http://image.so.com/j?q=${strWord}&src=srp&correct=&sn=0&pn=10`,
      response => {
        let images = [] // images = [{_thumb: "http://...", img: "http://..."}, {...}, {...}]
        if (response && response.data && response.data.list) {
          for (let item of response.data.list) {
            images.push(item)
          }
        }
        images = images.filter(image => {
          let keep = true
          for (let keyword of this.reject) {
            if (image.img && image.img.includes(keyword)) keep = false
          }
          return keep
        })
        callback(images)
      }
    )
  },
  getGoogleImages(text) {
    return new Promise(async resolve => {
      let $html = await Helper.scrape2(
        `https://www.google.com/search?q=${text}&tbm=isch&sout=1#spf=1567955134767`
      )
      let images = []
      for (let td of $html.find('.images_table td')) {
        images.push({
          src: $(td)
            .find('img')
            .attr('src'),
          url: $(td)
            .find('a')
            .attr('href')
            .replace(/^\/url\?q=/, '')
        })
      }
      resolve(images)
    })
  },
  getSrcsFromUnsplash(term, callcback) {
    Helper.scrape('https://unsplash.com/search/photos/' + term, function(
      $html
    ) {
      var srcs = []

      var $metas = $html.filter('meta') // cannot use find
      $metas.each(function() {
        var property = $(this).attr('property')
        if (property) {
          if (property.includes('og:image:secure_url')) {
            srcs.push($(this).attr('content'))
          }
        }
      })
      callcback(srcs)
    })
  },
  reject: [
    'jianbihua.cc',
    'nipic',
    '16pic.com',
    'photophoto.cn',
    'pconline',
    'zol.com',
    'youth.cn',
    '58pic.com',
    'sanwen.net',
    'winxuancdn.com',
    'gtimg.com',
    'pic.ibaotu.com',
    'sc.jb51.net',
    'so.qhmsg.com',
    'soso.com',
    'comicyu.com',
    'duitang.com',
    'chachaba.com',
    'qzone.cc',
    'tianjimedia.com',
    'bitauto.com',
    'dzwww.com',
    'pstatp.com',
    'huitu.com'
  ]
}
