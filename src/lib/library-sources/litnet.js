import Helper from '@/lib/helper'

export default {
  host: 'litnet.com',
  name: 'litnet',
  logo: 'https://litnet.com/el-amor-mistico/img/litnet-logo.png',
  example: 'https://litnet.com/ru/reader/esli-on-oboroten-b9679',
  async getChapter(url) {
    let $chapterHTML = await Helper.scrape2(url)
    let title = $chapterHTML
      .find('.reader-text h2')
      .text()
      .trim()
    $chapterHTML.find('.reader-pagination').remove()
    let chapter = {
      url: url,
      title: title,
      content: $chapterHTML.find('.reader-text').html()
    }
    let href = $chapterHTML.find('#reader a').attr('href')
    if (href) {
      let bookURL = 'https://litnet.com' + href
      chapter.book = await this.getBook(bookURL)
    }
    return chapter
  },
  async getBook(url) {
    let $bookHTML = await Helper.scrape2(url)
    let thumbnail = $bookHTML.find('.book-view-cover img').attr('src')
    let book = {
      url: url,
      title: $bookHTML
        .find('.book-view-info h1')
        .text()
        .trim(),
      thumbnail: thumbnail,
      chapters: []
    }
    for (let li of $bookHTML.find('.js-chapter-change option')) {
      book.chapters.push({
        title: $(li)
          .text()
          .trim(),
        url: url.replace('/book/', '/reader/') + '?c=' + $(li).attr('value')
      })
    }
    return book
  },
  async getBooklist(url) {
    let $html = await Helper.scrape2(url)
    let list = []
    for (let li of $html.find('.row.book-item')) {
      let thumbnail = $(li)
        .find('.book-img img')
        .attr('src')
      list.push({
        url:
          'https://litnet.com' +
          $(li)
            .find('.book-title a')
            .attr('href'),
        title: $(li)
          .find('.book-title a')
          .text()
          .trim(),
        price: $(li)
          .find('.item-price')
          .text()
          .trim(),
        thumbnail: thumbnail
      })
    }

    return list.filter(item => item.price === 'Бесплатно') // free items only
  }
}
