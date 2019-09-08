<template>
  <div class="container pt-5 pb-5 main" id="library">
    <div class="row">
      <div class="col-sm-12">
        <h1 class="mb-5 text-center">Library</h1>
        <p class="text-center lead" style="margin-bottom: 5rem">
          This is where you can enjoy reading a variety of Russian books with
          the help of hover dictionary and the ability to save words.
        </p>

        <hr class="mb-5" />

        <h3 class="text-center" style="margin-bottom: 6rem">Easy Reads</h3>

        <ul class="list-unstyled p-0 mb-5 booklists">
          <li v-for="booklist in easy" class="text-center mb-5">
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

        <hr class="mb-5" />

        <h3 class="text-center" style="margin-bottom: 6rem">Genres</h3>

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

        <hr class="mb-5" />

        <h3 class="text-center mt-5 mb-4">Custom Reading</h3>

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
      externalGradedReaders: [],
      easy: [
        {
          title: 'Allegories',
          url: 'https://ru.wikisource.org/wiki/Категория:Аллегории'
        },
        {
          title: 'Aphorisms',
          url: 'https://ru.wikisource.org/wiki/Категория:Афоризмы'
        },
        {
          title: 'Children’s Stories',
          url: 'https://librebook.me/collection/roman_vospitaniia'
        },
        {
          title: 'Children’s Literature',
          url: 'https://litnet.com/ru/top/detskaya-literatura'
        }
      ],
      booklists: [
        {
          title: 'Business and Economics',
          url: 'https://librebook.me/collection/ocharovanie_kapitala'
        },
        {
          title: 'Detective',
          url: 'https://litnet.com/ru/top/detektivy'
        },
        {
          title: 'Fantacy (Фзнтези)',
          url: 'https://litnet.com/ru/top/fentezi'
        },
        {
          title: 'Fantacy (Фантастика)',
          url: 'https://litnet.com/ru/top/fantastika'
        },
        {
          title: 'Historical Novel',
          url: 'https://litnet.com/ru/top/molodejnaya-proza'
        },
        {
          title: 'Literature',
          url: 'https://librebook.me/collection/maslenica_v_russkoi_literature'
        },
        {
          title: 'Music',
          url: 'https://librebook.me/collection/muzyka_nas_sviazala'
        },
        {
          title: 'Mystery',
          url: 'https://litnet.com/ru/top/mistikaujasy'
        },
        {
          title: 'Prose',
          url:
            'https://librebook.me/collection/popadancy_v_drugie_miry__sovremennaia_russkaia_proza'
        },
        {
          title: 'Romance',
          url: 'https://litnet.com/ru/top/lyubovnye-romany'
        },
        {
          title: 'Thriller',
          url: 'https://litnet.com/ru/top/trillery'
        },
        {
          title: 'Top on Litnet',
          url: 'https://litnet.com/ru/top/all'
        },
        {
          title: 'Translated Foreign Literature',
          url: 'https://librebook.me/collection/a_ne_spet_li_nam_pesniu_'
        }
      ]
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
