<template>
  <div class="container pt-5 pb-5 main" id="library">
    <div class="row">
      <div class="col-sm-12">
        <h1 class="mb-5 text-center">Library</h1>
        <p class="text-center lead" style="margin-bottom: 5rem">
          This is where you can enjoy reading a variety of Russian books with
          the help of pinyin annotation and dictionary tools.
        </p>
        <ul class="list-unstyled p-0 mb-5 booklists">
          <li v-for="booklist in booklists" class="text-center mb-5">
            <a
              class="link-unstyled"
              :href="`#/book/list/${encodeURIComponent(booklist.url)}`"
            >
              <img
                :src="`/img/books-${Math.floor(Math.random() * 10)}.png`"
                class="shadowed book-thumb mb-4"
              />
              <h5 class="mt-3">
                <b>{{ booklist.title }}</b>
              </h5>
              <p class="mb-0" style="color: #aaa">
                Source: {{ Library.source(booklist.url).name }}
              </p>
            </a>
          </li>
        </ul>

        <h1 class="text-center" style="margin-bottom: 6rem">Wikipedia</h1>
        <ul class="list-unstyled p-0 mb-5 booklists">
          <li v-for="booklist in wikipedia" class="text-center mb-5">
            <a
              class="link-unstyled"
              :href="`#/book/list/${encodeURIComponent(booklist.url)}`"
            >
              <img
                :src="`/img/books-${Math.floor(Math.random() * 10)}.png`"
                class="shadowed book-thumb mb-4"
              />
              <h5 class="mt-3">
                <Annotate tag="b"
                  ><span>{{ booklist.title }}</span></Annotate
                >
              </h5>
            </a>
          </li>
        </ul>

        <h1 class="text-center mt-5 mb-4">Custom Reading</h1>

        <p class="text-center lead mb-5">
          Read
          <em>any</em> book by pasting the URL
        </p>

        <div class="jumbotron bg-light pt-4 pb-3 mt-3 mb-3">
          <SimpleSearch
            placeholder="Enter the URL of a book from one of the above sites"
            :action="
              url => {
                location.hash = '#/book/index/' + encodeURIComponent(url)
              }
            "
            class="mb-3"
            ref="search"
          />
          <p>
            We can work with these content providers.
            <b>Copy paste</b> URLs like the following into the above text box
            and enjoy reading!
          </p>
          <ul>
            <li v-for="source in Library.sources">
              {{ source.name }}, example URL:
              <code v-html="`${source.example}`"></code>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Library from '@/lib/library'
import SimpleSearch from '@/components/SimpleSearch'

export default {
  components: {
    SimpleSearch
  },
  props: {
    args: {
      type: String
    }
  },
  data() {
    return {
      Library,
      location,
      wikipedia: [
        {
          title: 'Russian Wikipedia',
          url:
            'https://ru.wikipedia.org/wiki/%D0%97%D0%B0%D0%B3%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F_%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D0%B0'
        }
      ],
      externalGradedReaders: [],
      booklists: [
        {
          title: 'Allegories',
          url: 'https://ru.wikisource.org/wiki/Категория:Аллегории'
        },
        {
          title: 'Aphorisms',
          url: 'https://ru.wikisource.org/wiki/Категория:Афоризмы'
        },
        {
          title: 'Autobiographies',
          url: 'https://ru.wikisource.org/wiki/Категория:Автобиографии'
        },
        {
          title: 'Biographies',
          url: 'https://ru.wikisource.org/wiki/Категория:Биографии'
        },
        {
          title: 'Dialogs',
          url: 'https://ru.wikisource.org/wiki/Категория:Диалоги'
        },
        {
          title: 'Epics',
          url: 'https://ru.wikisource.org/wiki/Категория:Эпосы'
        },
        {
          title: 'Essays (Эссе)',
          url: 'https://ru.wikisource.org/wiki/Категория:Эссе'
        },
        {
          title: 'Essays (Очерки)',
          url: 'https://ru.wikisource.org/wiki/Категория:Очерки'
        },
        {
          title: 'Fables',
          url: 'https://ru.wikisource.org/wiki/Категория:Басни'
        },
        {
          title: 'Fiction',
          url: 'https://ru.wikisource.org/wiki/Категория:Фантастика'
        },
        {
          title: 'Short Stories and Novels',
          url: 'https://ru.wikisource.org/wiki/Категория:Новеллы'
        },
        {
          title: 'Oratorical prose',
          url: 'https://ru.wikisource.org/wiki/Категория:Ораторская_проза'
        },
        {
          title: 'Poems',
          url: 'https://ru.wikisource.org/wiki/Категория:Поэмы'
        },
        {
          title: 'Tales',
          url: 'https://ru.wikisource.org/wiki/Категория:Сказки'
        }
      ],
      sources: [],
      authors: []
    }
  }
}
</script>

<style lang="scss">
.booklists {
  display: flex;
  flex-wrap: wrap;
}
.booklists li {
  flex: 1;
  min-width: 15rem;
}
</style>
