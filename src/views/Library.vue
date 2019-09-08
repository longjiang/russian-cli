<template>
  <div class="container pt-5 pb-5 main" id="library">
    <div class="row">
      <div class="col-sm-12">
        <h1 class="mb-5 text-center">Library</h1>
        <p class="text-center lead" style="margin-bottom: 5rem">
          This is where you can enjoy reading a variety of Russian books with
          the help of hover dictionary and the ability to save words.
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

        <h1 class="text-center" style="margin-bottom: 6rem">Easy Reads</h1>
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

        <h1 class="text-center" style="margin-bottom: 6rem">Authors</h1>
        <ul class="list-unstyled booklist">
          <li v-for="book in authors" class="booklist-item text-center">
            <a
              :href="`#/book/index/${encodeURIComponent(book.url)}`"
              class="link-unstyled"
            >
              <img
                :src="
                  book.thumbnail
                    ? `${Config.imageProxy}?${book.thumbnail}`
                    : `/img/book-thumb-${Math.floor(Math.random() * 10)}.jpg`
                "
                alt="Book cover"
                class="mb-4 shadow book-thumb"
              />
              <Annotate tag="h6"><b>{{ book.title }}</b></Annotate>
              <Annotate tag="small" v-if="book.author"><span>{{ book.author }}</span></Annotate>
              </a
            >
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
        },
        {
          title: 'Short Stories',
          url: 'https://ru.wikisource.org/wiki/Категория:Сказки'
        }
      ],
      booklists: [
        {
          title: 'Autobiographies',
          url: 'https://ru.wikisource.org/wiki/Категория:Автобиографии'
        },
        {
          title: 'Biographies',
          url: 'https://ru.wikisource.org/wiki/Категория:Биографии'
        },
        {
          title: 'Business and Economics',
          url: 'https://librebook.me/collection/ocharovanie_kapitala'
        },
        {
          title: 'Detective',
          url: 'https://litnet.com/ru/top/detektivy'
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
          title: 'Fantacy (Фзнтези)',
          url: 'https://litnet.com/ru/top/fentezi'
        },
        {
          title: 'Fantacy (Фантастика)',
          url: 'https://litnet.com/ru/top/fantastika'
        },
        {
          title: 'Fiction',
          url: 'https://ru.wikisource.org/wiki/Категория:Фантастика'
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
          title: 'Novels',
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
      ],
      sources: [],
      authors: [
        {
          title: 'Авдеев Михаил Васильевич',
          url: 'http://az.lib.ru/a/awdeew_m_w/'
        },
        {
          title: 'Аверкиев Дмитрий Васильевич',
          url: 'http://az.lib.ru/a/awerkiew_d_w/'
        },
        {
          title: 'Аксаков Иван Сергеевич',
          url: 'http://az.lib.ru/a/aksakow_i_s/'
        },
        {
          title: 'Аксаков Константин Сергеевич',
          url: 'http://az.lib.ru/a/aksakow_k_s/'
        },
        {
          title: 'Аксаков Сергей Тимофеевич',
          url: 'http://az.lib.ru/a/aksakow_s_t/'
        },
        {
          title: 'Амфитеатров Александр Валентинович',
          url: 'http://az.lib.ru/a/amfiteatrow_a_w/'
        },
        {
          title: 'Андреев Леонид Николаевич',
          url: 'http://az.lib.ru/a/andreew_l_n/'
        },
        {
          title: 'Анненков Павел Васильевич',
          url: 'http://az.lib.ru/a/annenkow_p_w/'
        },
        {
          title: 'Антонович Максим Алексеевич',
          url: 'http://az.lib.ru/a/antonowich_m_a/'
        },
        {
          title: 'Апухтин Алексей Николаевич',
          url: 'http://az.lib.ru/a/apuhtin_a_n/'
        },
        {
          title: 'Арцыбашев Михаил Петрович',
          url: 'http://az.lib.ru/a/arcybashew_m_p/'
        },
        {
          title: 'Баласогло Александр Пантелеймонович',
          url: 'http://az.lib.ru/b/balasoglo_a_p/'
        },
        {
          title: 'Бальдауф Федор Иванович',
          url: 'http://az.lib.ru/b/balxdauf_f_i/'
        },
        {
          title: 'Баратынский Евгений Абрамович',
          url: 'http://az.lib.ru/b/baratynskij_e_a/'
        },
        {
          title: 'Батеньков Гавриил Степанович',
          url: 'http://az.lib.ru/b/batenxkow_g_s/'
        },
        {
          title: 'Батюшков Константин Николаевич',
          url: 'http://az.lib.ru/b/batjushkow_k_n/'
        },
        {
          title: 'Бахтурин Константин Александрович',
          url: 'http://az.lib.ru/b/bahturin_k_a/'
        },
        {
          title: 'Бекетова Елизавета Григорьевна',
          url: 'http://az.lib.ru/b/beketowa_e_g/'
        },
        {
          title: 'Белинский Виссарион Григорьевич',
          url: 'http://az.lib.ru/b/belinskij_w_g/'
        },
        {
          title: 'Бенедиктов Владимир Григорьевич',
          url: 'http://az.lib.ru/b/benediktow_w_g/'
        },
        {
          title: 'Бенитцкий Александр Петрович',
          url: 'http://az.lib.ru/b/benitckij_a_p/'
        },
        {
          title: 'Берг Николай Васильевич',
          url: 'http://az.lib.ru/b/berg_n_w/'
        },
        {
          title: 'Бернет Е.',
          url: 'http://az.lib.ru/b/bernet_e/'
        },
        {
          title: 'Бестужев-Марлинский Александр Александрович',
          url: 'http://az.lib.ru/b/bestuzhewmarlins_a_a/'
        },
        {
          title: 'Блок Александр Александрович',
          url: 'http://az.lib.ru/b/blok_a_a/'
        },
        {
          title: 'Боборыкин Петр Дмитриевич',
          url: 'http://az.lib.ru/b/boborykin_p_d/'
        },
        {
          title: 'Богданович Ипполит Федорович',
          url: 'http://az.lib.ru/b/bogdanowicha_i_f/'
        },
        {
          title: 'Бороздна Иван Петрович',
          url: 'http://az.lib.ru/b/borozdna_i_p/'
        },
        {
          title: 'Брюсов Валерий Яковлевич',
          url: 'http://az.lib.ru/b/brjusow_w_j/'
        },
        {
          title: 'Булгарин Фаддей Венедиктович',
          url: 'http://az.lib.ru/b/bulgarin_f_w/'
        },
        {
          title: 'Вейнберг Петр Исаевич',
          url: 'http://az.lib.ru/w/wejnberg_p_i/'
        },
        {
          title: 'Вельтман Александр Фомич',
          url: 'http://az.lib.ru/w/welxtman_a_f/'
        },
        {
          title: 'Веневитинов Дмитрий Владимирович',
          url: 'http://az.lib.ru/w/wenewitinow_d_w/'
        },
        {
          title: 'Вересаев Викентий Викентьевич',
          url: 'http://az.lib.ru/w/weresaew_w_w/'
        },
        {
          title: 'Вовчок Марко',
          url: 'http://az.lib.ru/w/wowchok_m/'
        },
        {
          title: 'Водовозова Елизавета Николаевна',
          url: 'http://az.lib.ru/w/wodowozowa_e_n/'
        },
        {
          title: 'Воейков Александр Федорович',
          url: 'http://az.lib.ru/w/woejkow_a_f/'
        },
        {
          title: 'Вронченко Михаил Павлович',
          url: 'http://az.lib.ru/w/wronchenko_m_p/'
        },
        {
          title: 'Вышеславцев Михаил Михайлович',
          url: 'http://az.lib.ru/w/wysheslawcew_m_m/'
        },
        {
          title: 'Вяземский Павел Петрович',
          url: 'http://az.lib.ru/w/wjazemskij_p_p/'
        },
        {
          title: 'Вяземский Петр Андреевич',
          url: 'http://az.lib.ru/w/wjazemskij_p_a/'
        },
        {
          title: 'Ган Елена Андреевна',
          url: 'http://az.lib.ru/g/gan_e_a/'
        },
        {
          title: 'Гарин-Михайловский Николай',
          url: 'http://az.lib.ru/g/garinmihajlowskij_n/'
        },
        {
          title: 'Гаршин Всеволод Михайлович',
          url: 'http://az.lib.ru/g/garshin_w_m/'
        },
        {
          title: 'Гейнце Николай Эдуардович',
          url: 'http://az.lib.ru/g/gejnce_n_e/'
        },
        {
          title: 'Герцен Александр Иванович',
          url: 'http://az.lib.ru/g/gercen_a_i/'
        },
        {
          title: 'Глебов Дмитрий Петрович',
          url: 'http://az.lib.ru/g/glebow_d_p/'
        },
        {
          title: 'Глинка Сергей Николаевич',
          url: 'http://az.lib.ru/g/glinka_s_n/'
        },
        {
          title: 'Глинка Федор Николаевич',
          url: 'http://az.lib.ru/g/glinka_f_n/'
        },
        {
          title: 'Гнедич Николай Иванович',
          url: 'http://az.lib.ru/g/gnedich_n_i/'
        },
        {
          title: 'Гнедич Петр Петрович',
          url: 'http://az.lib.ru/g/gnedich_p_p/'
        },
        {
          title: 'Гоголь Николай Васильевич',
          url: 'http://az.lib.ru/g/gogolx_n_w/'
        },
        {
          title: 'Гончаров Иван Александрович',
          url: 'http://az.lib.ru/g/goncharow_i_a/'
        },
        {
          title: 'Горький Максим',
          url: 'http://az.lib.ru/g/gorxkij_m/'
        },
        {
          title: 'Грамматин Николай Федорович',
          url: 'http://az.lib.ru/g/grammatin_n_f/'
        },
        {
          title: 'Греч Николай Иванович',
          url: 'http://az.lib.ru/g/grech_n_i/'
        },
        {
          title: 'Грибоедов Александр Сергеевич',
          url: 'http://az.lib.ru/g/griboedow_a_s/'
        },
        {
          title: 'Григорович Дмитрий Васильевич',
          url: 'http://az.lib.ru/g/grigorowich_d_w/'
        },
        {
          title: 'Григорьев Аполлон Александрович',
          url: 'http://az.lib.ru/g/grigorxew_a_a/'
        },
        {
          title: 'Григорьев Василий Никифорович',
          url: 'http://az.lib.ru/g/grigorxew_w_n/'
        },
        {
          title: 'Губер Эдуард Иванович',
          url: 'http://az.lib.ru/g/guber_e_i/'
        },
        {
          title: 'Давыдов Денис Васильевич',
          url: 'http://az.lib.ru/d/dawydow_d_w/'
        },
        {
          title: 'Данилевский Григорий Петрович',
          url: 'http://az.lib.ru/d/danilewskij_g_p/'
        },
        {
          title: 'Дашкова Екатерина Романовна',
          url: 'http://az.lib.ru/d/dashkowa_e_r/'
        },
        {
          title: 'Дельвиг Антон Антонович',
          url: 'http://az.lib.ru/d/delxwig_a_a/'
        },
        {
          title: 'Державин Гавриил Романович',
          url: 'http://az.lib.ru/d/derzhawin_g_r/'
        },
        {
          title: 'Дмитриев Иван Иванович',
          url: 'http://az.lib.ru/d/dmitriew_i_i/'
        },
        {
          title: 'Дмитриев Михаил Александрович',
          url: 'http://az.lib.ru/d/dmitriew_m_a/'
        },
        {
          title: 'Добролюбов Николай Александрович',
          url: 'http://az.lib.ru/d/dobroljubow_n_a/'
        },
        {
          title: 'Достоевский Федор Михайлович',
          url: 'http://az.lib.ru/d/dostoewskij_f_m/'
        },
        {
          title: 'Дружинин Александр Васильевич',
          url: 'http://az.lib.ru/d/druzhinin_a_w/'
        },
        {
          title: 'Дуров Сергей Федорович',
          url: 'http://az.lib.ru/d/durow_s_f/'
        },
        {
          title: 'Ершов Петр Павлович',
          url: 'http://az.lib.ru/e/ershow_p_p/'
        },
        {
          title: 'Есенин Сергей Александрович',
          url: 'http://az.lib.ru/e/esenin_s_a/'
        },
        {
          title: 'Жадовская Юлия Валериановна',
          url: 'http://az.lib.ru/z/zhadowskaja_j_w/'
        },
        {
          title: 'Жемчужников Алексей Михайлович',
          url: 'http://az.lib.ru/z/zhemchuzhnikow_a_m/'
        },
        {
          title: 'Жихарев Степан Петрович',
          url: 'http://az.lib.ru/z/zhiharew_s_p/'
        },
        {
          title: 'Жуковский Василий Андреевич',
          url: 'http://az.lib.ru/z/zhukowskij_w_a/'
        },
        {
          title: 'Загорский Михаил Петрович',
          url: 'http://az.lib.ru/z/zagorskij_m_p/'
        },
        {
          title: 'Загоскин Михаил Николаевич',
          url: 'http://az.lib.ru/z/zagoskin_m_n/'
        },
        {
          title: 'Иванов Вячеслав Иванович',
          url: 'http://az.lib.ru/i/iwanow_w_i/'
        },
        {
          title: 'Иванов Федор Федорович',
          url: 'http://az.lib.ru/i/iwanow_f_f/'
        },
        {
          title: 'Измайлов Александр Ефимович',
          url: 'http://az.lib.ru/i/izmajlow_a_e/'
        },
        {
          title: 'Илличевский Алексей Дамианович',
          url: 'http://az.lib.ru/i/illichewskij_a_d/'
        },
        {
          title: 'К. Р.',
          url: 'http://az.lib.ru/k/kr_k_k/'
        },
        {
          title: 'Кайсаров Андрей Сергеевич',
          url: 'http://az.lib.ru/k/kajsarow_a_s/'
        },
        {
          title: 'Кайсаров Михаил Сергеевич',
          url: 'http://az.lib.ru/k/kajsarow_m_s/'
        },
        {
          title: 'Кайсаров Петр Сергеевич',
          url: 'http://az.lib.ru/k/kajsarow_p_s/'
        },
        {
          title: 'Капнист Василий Васильевич',
          url: 'http://az.lib.ru/k/kapnist_w_w/'
        },
        {
          title: 'Карамзин Николай Михайлович',
          url: 'http://az.lib.ru/k/karamzin_n_m/'
        },
        {
          title: 'Каратыгин Петр Андреевич',
          url: 'http://az.lib.ru/k/karatygin_p_a/'
        },
        {
          title: 'Катенин Павел Александрович',
          url: 'http://az.lib.ru/k/katenin_p_a/'
        },
        {
          title: 'Киреевский Иван Васильевич',
          url: 'http://az.lib.ru/k/kireewskij_i_w/'
        },
        {
          title: 'Ковалевская Софья Васильевна',
          url: 'http://az.lib.ru/k/kowalewskaja_s_w/'
        },
        {
          title: 'Козлов Иван Иванович',
          url: 'http://az.lib.ru/k/kozlow_i_i/'
        },
        {
          title: 'Кологривова Елизавета Васильевна',
          url: 'http://az.lib.ru/k/kologriwowa_e_w/'
        },
        {
          title: 'Кольцов Алексей Васильевич',
          url: 'http://az.lib.ru/k/kolxcow_a_w/'
        },
        {
          title: 'Кони Федор Алексеевич',
          url: 'http://az.lib.ru/k/koni_f_a/'
        },
        {
          title: 'Короленко Владимир Галактионович',
          url: 'http://az.lib.ru/k/korolenko_w_g/'
        },
        {
          title: 'Костров Ермил Иванович "',
          url: 'http://az.lib.ru/k/kostrow_ermil_iwanowich/'
        },
        {
          title: 'Краснова-Бекетова Екатерина Андреевна',
          url: 'http://az.lib.ru/k/krasnowa_e_a/'
        },
        {
          title: 'Крестовский Всеволод Владимирович',
          url: 'http://az.lib.ru/k/krestowskij_w_w/'
        },
        {
          title: 'Крешев Иван Петрович',
          url: 'http://az.lib.ru/k/kreshew_i_p/'
        },
        {
          title: 'Крылов Александр Абрамович',
          url: 'http://az.lib.ru/k/krylow_a_a/'
        },
        {
          title: 'Крылов Иван Андреевич',
          url: 'http://az.lib.ru/k/krylow_i_a/'
        },
        {
          title: 'Крюков Александр Павлович',
          url: 'http://az.lib.ru/k/krjukow_a_p/'
        },
        {
          title: 'Кукольник Нестор Васильевич',
          url: 'http://az.lib.ru/k/kukolxnik_n_w/'
        },
        {
          title: 'Кукольник Павел Васильевич',
          url: 'http://az.lib.ru/k/kukolxnik_p_w/'
        },
        {
          title: 'Куприн Александр Иванович',
          url: 'http://az.lib.ru/k/kuprin_a_i/'
        },
        {
          title: 'Курочкин Василий Степанович',
          url: 'http://az.lib.ru/k/kurochkin_wasilij_stepanowich/'
        },
        {
          title: 'Кюхельбекер Вильгельм Карлович',
          url: 'http://az.lib.ru/k/kjuhelxbeker_w_k/'
        },
        {
          title: 'Лажечников Иван Иванович',
          url: 'http://az.lib.ru/l/lazhechnikow_i_i/'
        },
        {
          title: 'Левитов Александр Иванович',
          url: 'http://az.lib.ru/l/lewitow_a_i/'
        },
        {
          title: 'Лесков Николай Семенович',
          url: 'http://az.lib.ru/l/leskow_n_s/'
        },
        {
          title: 'Ломоносов Михаил Васильевич',
          url: 'http://az.lib.ru/l/lomonosow_m_w/'
        },
        {
          title: 'Лухманова Надежда Александровна',
          url: 'http://az.lib.ru/l/luhmanowa_n_a/'
        },
        {
          title: 'Майков Аполлон Николаевич',
          url: 'http://az.lib.ru/m/majkow_a_n/'
        },
        {
          title: 'Мамин-Сибиряк Дмитрий Наркисович',
          url: 'http://az.lib.ru/m/maminsibirjak_d/'
        },
        {
          title: 'Мансуров Александр Михайлович',
          url: 'http://az.lib.ru/m/mansurow_a_m/'
        },
        {
          title: 'Масальский Константин Петрович',
          url: 'http://az.lib.ru/m/masalxskij_k_p/'
        },
        {
          title: 'Мей Лев Александрович',
          url: 'http://az.lib.ru/m/mej_l_a/'
        },
        {
          title: 'Мельгунов Николай Александрович',
          url: 'http://az.lib.ru/m/melxgunow_n_a/'
        },
        {
          title: 'Мельников-Печерский Павел Иванович',
          url: 'http://az.lib.ru/m/melxnikowpecherskij_p/'
        },
        {
          title: 'Мерзляков Алексей Федорович',
          url: 'http://az.lib.ru/m/merzljakow_a_f/'
        },
        {
          title: 'Миллер Федор Богданович',
          url: 'http://az.lib.ru/m/miller_f_b/'
        },
        {
          title: 'Милькеев Евгений Лукич',
          url: 'http://az.lib.ru/m/milxkeew_e_l/'
        },
        {
          title: 'Минский Николай Максимович',
          url: 'http://az.lib.ru/m/minskij_n_m'
        },
        {
          title: 'Мордовцев Даниил Лукич',
          url: 'http://az.lib.ru/m/mordowcew_d_l/'
        },
        {
          title: 'Муравьев Андрей Николаевич',
          url: 'http://az.lib.ru/m/murawxew_a_n/'
        },
        {
          title: 'Муравьев Михаил Никитич',
          url: 'http://az.lib.ru/m/murawxew_m_n/'
        },
        {
          title: 'Нарежный Василий Трофимович',
          url: 'http://az.lib.ru/n/narezhnyj_w/'
        },
        {
          title: 'Некрасов Николай Алексеевич',
          url: 'http://az.lib.ru/n/nekrasow_n_a/'
        },
        {
          title: 'Нелединский-Мелецкий Юрий Александрович',
          url: 'http://az.lib.ru/n/neledinskijmeleckij_j_a/'
        },
        {
          title: 'Немирович-Данченко Василий Иванович',
          url: 'http://az.lib.ru/n/nemirowichdanchenko_w_i/'
        },
        {
          title: 'Нефедов Филипп Диомидович',
          url: 'http://az.lib.ru/n/nefedow_f_d/'
        },
        {
          title: 'Никитин Андрей Афанасьевич',
          url: 'http://az.lib.ru/n/nikitin_a_a/'
        },
        {
          title: 'Никитин Иван Саввич',
          url: 'http://az.lib.ru/n/nikitin_i_s/'
        },
        {
          title: 'Новиков Николай Иванович',
          url: 'http://az.lib.ru/n/nowikow_n_i/'
        },
        {
          title: 'Ободовский Платон Григорьевич',
          url: 'http://az.lib.ru/o/obodowskij_p_g/'
        },
        {
          title: 'Огарев Николай Платонович',
          url: 'http://az.lib.ru/o/ogarew_n_p/'
        },
        {
          title: 'Одоевский Александр Иванович',
          url: 'http://az.lib.ru/o/odoewskij_a_i/'
        },
        {
          title: 'Одоевский Владимир Федорович',
          url: 'http://az.lib.ru/o/odoewskij_w_f/'
        },
        {
          title: 'Озеров Владислав Александрович',
          url: 'http://az.lib.ru/o/ozerow_w_a/'
        },
        {
          title: 'Ознобишин Дмитрий Петрович',
          url: 'http://az.lib.ru/o/oznobishin_d_p/'
        },
        {
          title: 'Олешев Михаил',
          url: 'http://az.lib.ru/o/oleshew_m/'
        },
        {
          title: 'Олин Валериан Николаевич',
          url: 'http://az.lib.ru/o/olin_walerian_nikolaewich/'
        },
        {
          title: 'Островский Александр Николаевич',
          url: 'http://az.lib.ru/o/ostrowskij_a_n/'
        },
        {
          title: 'Павлова Каролина Карловна',
          url: 'http://az.lib.ru/p/pawlowa_k_k/'
        },
        {
          title: 'Панаева Авдотья Яковлевна',
          url: 'http://az.lib.ru/p/panaewa_a_j/'
        },
        {
          title: 'Петров Дмитрий Константинович',
          url: 'http://az.lib.ru/p/petrow_d_k/'
        },
        {
          title: 'Писарев Дмитрий Иванович',
          url: 'http://az.lib.ru/p/pisarew_d/'
        },
        {
          title: 'Писемский Алексей Феофилактович',
          url: 'http://az.lib.ru/p/pisemskij_a/'
        },
        {
          title: 'Пнин Иван Петрович',
          url: 'http://az.lib.ru/p/pnin_i_p/'
        },
        {
          title: 'Погорельский Антоний',
          url: 'http://az.lib.ru/p/pogorelxskij_a/'
        },
        {
          title: 'Полежаев Александр Иванович',
          url: 'http://az.lib.ru/p/polezhaew_a_i/'
        },
        {
          title: 'Полонский Яков Петрович',
          url: 'http://az.lib.ru/p/polonskij_j_p/'
        },
        {
          title: 'Помяловский Николай Герасимович',
          url: 'http://az.lib.ru/p/pomjalowskij_n_g/'
        },
        {
          title: 'Прутков Козьма Петрович',
          url: 'http://az.lib.ru/p/prutkow_k_p/'
        },
        {
          title: 'Пушкин Василий Львович',
          url: 'http://az.lib.ru/p/pushkin_w_l/'
        },
        {
          title: 'Радищев Александр Николаевич',
          url: 'http://az.lib.ru/r/radishew_a_n/'
        },
        {
          title: 'Раич Семен Егорович',
          url: 'http://az.lib.ru/r/raich_s_e/'
        },
        {
          title: 'Решетников Федор Михайлович',
          url: 'http://az.lib.ru/r/reshetnikow_f_m/'
        },
        {
          title: 'Рожалин Николай Матвеевич',
          url: 'http://az.lib.ru/r/rozhalin_n_m/'
        },
        {
          title: 'Розен Егор Федорович',
          url: 'http://az.lib.ru/r/rozen_e_f/'
        },
        {
          title: 'Ростопчина Евдокия Петровна',
          url: 'http://az.lib.ru/r/rostopchina_e_p/'
        },
        {
          title: 'Рылеев Кондратий Федорович',
          url: 'http://az.lib.ru/r/ryleew_k_f/'
        },
        {
          title: 'Салтыков-Щедрин Михаил Евграфович',
          url: 'http://az.lib.ru/s/saltykow_m_e/'
        },
        {
          title: 'Самарин Юрий Федорович',
          url: 'http://az.lib.ru/s/samarin_j_f/'
        },
        {
          title: 'Сатин Николай Михайлович',
          url: 'http://az.lib.ru/s/satin_n_m/'
        },
        {
          title: 'Сенковский Осип Иванович',
          url: 'http://az.lib.ru/s/senkowskij_o_i/'
        },
        {
          title: 'Слепушкин Федор Никифорович',
          url: 'http://az.lib.ru/s/slepushkin_f_n/'
        },
        {
          title: 'Слепцов Василий Алексеевич',
          url: 'http://az.lib.ru/s/slepcow_w_a/'
        },
        {
          title: 'Собакин Михаил Григорьевич',
          url: 'http://az.lib.ru/s/sobakin_m_g/'
        },
        {
          title: 'Соколовский Владимир Игнатьевич',
          url: 'http://az.lib.ru/s/sokolowskij_w_i/'
        },
        {
          title: 'Соллогуб Владимир Александрович',
          url: 'http://az.lib.ru/s/sollogub_w_a/'
        },
        {
          title: 'Соловьев Всеволод Сергеевич',
          url: 'http://az.lib.ru/s/solowxew_w_s/'
        },
        {
          title: 'Соловьев Николай Яковлевич',
          url: 'http://az.lib.ru/s/solowxew_n_j/'
        },
        {
          title: 'Сомов Орест Михайлович',
          url: 'http://az.lib.ru/s/somow_o_m/'
        },
        {
          title: 'Станкевич Николай Владимирович',
          url: 'http://az.lib.ru/s/stankewich_n_w/'
        },
        {
          title: 'Старицкий Михаил Петрович',
          url: 'http://az.lib.ru/s/starickij_m_p/'
        },
        {
          title: 'Стахович Михаил Александрович',
          url: 'http://az.lib.ru/s/stahowich_m_a/'
        },
        {
          title: 'Степняк-Кравчинский Сергей Михайлович',
          url: 'http://az.lib.ru/s/stepnjakkrawchinskij_s_m/'
        },
        {
          title: 'Сумароков Александр Петрович',
          url: 'http://az.lib.ru/s/sumarokow_a_p/'
        },
        {
          title: 'Сухово-Кобылин Александр Васильевич',
          url: 'http://az.lib.ru/s/suhowokobylin_a_w/'
        },
        {
          title: 'Татищев Василий Никитич',
          url: 'http://az.lib.ru/t/tatishew_w_n/'
        },
        {
          title: 'Тепляков Виктор Григорьевич',
          url: 'http://az.lib.ru/t/tepljakow_w_g/'
        },
        {
          title: 'Тимофеев Алексей Васильевич',
          url: 'http://az.lib.ru/t/timofeew_a_w/'
        },
        {
          title: 'Титов Владимир Павлович',
          url: 'http://az.lib.ru/t/titow_w_p/'
        },
        {
          title: 'Ткачев Петр Никитич',
          url: 'http://az.lib.ru/t/tkachew_p_n/'
        },
        {
          title: 'Толбин Василий Васильевич',
          url: 'http://az.lib.ru/t/tolbin_w_w/'
        },
        {
          title: 'Толстой Алексей Константинович',
          url: 'http://az.lib.ru/t/tolstoj_a_k/'
        },
        {
          title: 'Толстой Лев Николаевич',
          url: 'http://az.lib.ru/t/tolstoj_lew_nikolaewich/'
        },
        {
          title: 'Тредиаковский Василий Кириллович',
          url: 'http://az.lib.ru/t/trediakowskij_w_k/'
        },
        {
          title: 'Трилунный Дмитрий Юрьевич',
          url: 'http://az.lib.ru/t/trilunnyj/'
        },
        {
          title: 'Туманский Василий Иванович',
          url: 'http://az.lib.ru/t/tumanskij_w_i/'
        },
        {
          title: 'Тургенев Александр Иванович',
          url: 'http://az.lib.ru/t/turgenew_a_i/'
        },
        {
          title: 'Тургенев Андрей Иванович',
          url: 'http://az.lib.ru/t/turgenew_andrej_iwanowich/'
        },
        {
          title: 'Тургенев Иван Сергеевич',
          url: 'http://az.lib.ru/t/turgenew_i_s/'
        },
        {
          title: 'Тургенев Николай Иванович',
          url: 'http://az.lib.ru/t/turgenew_n_i/'
        },
        {
          title: 'Тучкова-Огарева Наталья Алексеевна',
          url: 'http://az.lib.ru/t/tuchkowaogarewa_n_a/'
        },
        {
          title: 'Тютчев Федор Иванович',
          url: 'http://az.lib.ru/t/tjutchew_f_i/'
        },
        {
          title: 'Успенский Глеб Иванович',
          url: 'http://az.lib.ru/u/uspenskij_g_i/'
        },
        {
          title: 'Успенский Николай Васильевич',
          url: 'http://az.lib.ru/u/uspenskij_n_w/'
        },
        {
          title: 'Федотов Павел Андреевич',
          url: 'http://az.lib.ru/f/fedotow_p_a/'
        },
        {
          title: 'Фет Афанасий Афанасьевич',
          url: 'http://az.lib.ru/f/fet_a_a/'
        },
        {
          title: 'Фигнер Вера Николаевна',
          url: 'http://az.lib.ru/f/figner_w_n/'
        },
        {
          title: 'Филимонов Владимир Сергеевич',
          url: 'http://az.lib.ru/f/filimonow_w_s/'
        },
        {
          title: 'Фонвизин Денис Иванович',
          url: 'http://az.lib.ru/f/fonwizin_d_i/'
        },
        {
          title: 'Хвощинская Надежда',
          url: 'http://az.lib.ru/h/hwoshinskaja_n_d/'
        },
        {
          title: 'Хемницер Иван',
          url: 'http://az.lib.ru/h/hemnicer_i_i/'
        },
        {
          title: 'Херасков Михаил',
          url: 'http://az.lib.ru/h/heraskow_m_m/'
        },
        {
          title: 'Хомяков Алексей Степанович',
          url: 'http://az.lib.ru/h/homjakow_a_s/'
        },
        {
          title: 'Чаадаев Петр Яковлевич',
          url: 'http://az.lib.ru/c/chaadaew_p_j/'
        },
        {
          title: 'Чарская Лидия Алексеевна',
          url: 'http://az.lib.ru/c/charskaja_l_a/'
        },
        {
          title: 'Чернышев Иван Егорович',
          url: 'http://az.lib.ru/c/chernyshew_i_e/'
        },
        {
          title: 'Чернышевский Николай Гаврилович',
          url: 'http://az.lib.ru/c/chernyshewskij_n_g/'
        },
        {
          title: 'Чехов Антон Павлович',
          url: 'http://az.lib.ru/c/chehow_a_p/'
        },
        {
          title: 'Чулков Михаил Дмитриевич',
          url: 'http://az.lib.ru/c/chulkow_m_d/'
        },
        {
          title: 'Шаховской Александр',
          url: 'http://az.lib.ru/s/shahowskoj_a_a/'
        },
        {
          title: 'Шевырев Степан',
          url: 'http://az.lib.ru/s/shewyrew_s_p/'
        },
        {
          title: 'Шишков Александр',
          url: 'http://az.lib.ru/s/shishkow_aleksandr_ardalionowich/'
        },
        {
          title: 'Шкляревский Павел',
          url: 'http://az.lib.ru/s/shkljarewskij_p_p/'
        },
        {
          title: 'Эртель Александр Иванович',
          url: 'http://az.lib.ru/e/ertelx_a_i/'
        },
        {
          title: 'Языков Николай Михайлович',
          url: 'http://az.lib.ru/j/jazykow_n_m/'
        },
        {
          title: 'Якубович Лукьян',
          url: 'http://az.lib.ru/j/jakubowich_l_a/'
        },
        {
          title: 'Якубович Петр',
          url: 'http://az.lib.ru/j/jakubowich_p_f/'
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
