<template>
  <div id="russian-zero-to-hero">
    <div class="container-fluid bg-dark pt-4 pl-0 pr-0">
      <div class="container">
        <div class="row mb-4">
          <div class="col-sm-12">
            <router-link to="/">
              <img
                src="@/assets/img/logo-ru-zth-light.png"
                alt="Russian Zero to Hero"
                class="logo"
              />
            </router-link>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <Nav />
          </div>
        </div>
      </div>
    </div>
    <SubNav class="pt-4" />

    <keep-alive>
      <router-view ref="routerView" />
    </keep-alive>

    <footer class="container-fluid bg-dark text-light pt-4 pb-4">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <LanguageLogos />
            <hr class="border-light" style="opacity: 0.5" />
            <p>
              <b>Zero to Hero Education, Canada.</b>
            </p>
            <p>
              <b>Credits:</b> Russian-English dictionary data from
              <a href="https://en.openrussian.org">openrussian.org</a>, licensed
              under
              <a href="https://creativecommons.org/licenses/">CC BY-SA</a>.
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import SubNav from '@/components/SubNav'
import Config from '@/lib/config'
import LanguageLogos from '@/components/LanguageLogos'

export default {
  components: {
    Nav,
    SubNav,
    LanguageLogos
  },
  data() {
    return {
      Config,
      languages: []
    }
  },
  beforeMount() {
    $.getJSON(`${Config.server}data/languages.json`, response => {
      this.languages = response
    })
  }
}
</script>

<style>
.logo {
  height: 6rem;
}
.logo-footer {
  height: 4rem;
}
</style>
