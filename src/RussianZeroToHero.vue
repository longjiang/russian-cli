<template>
  <div id="russian-zero-to-hero">
    <div class="container-fluid bg-dark pt-4 pl-0 pr-0">
      <div class="container">
        <div class="row mb-4">
          <div class="col-sm-12">
            <router-link to="/">
              <img src="@/assets/img/logo-ru-zth-light.png" alt="Russian Zero to Hero" class="logo" />
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
    <keep-alive>
      <router-view ref="routerView" />
    </keep-alive>

    <footer class="container-fluid bg-dark text-light pt-4 pb-4">
      <div class="container">
        <div class="row">
          <div class="col-sm-12">
            <a href="/" class="mr-4">
              <img
                src="@/assets/img/logo-ru-zth-light.png"
                alt="Russian Zero to Hero"
                class="logo-footer"
              />
            </a>
            <a href="https://zh.zerotohero.ca" target="_blank" class="mr-4">
              <img
                src="@/assets/img/logo-zh-zth-light.png"
                alt="Chinese Zero to Hero"
                class="logo-footer"
              />
            </a>
            <a href="https://yingyuyingxiong.teachable.com" target="_blank" class="mr-4">
              <img
                src="@/assets/img/logo-en-zth-light.png"
                alt="English Zero to Hero"
                class="logo-footer"
              />
            </a>
            <a href="https://hi.zerotohero.ca" target="_blank" class="mr-4">
              <img
                src="@/assets/img/logo-hi-zth-light.png"
                alt="Hindi Zero to Hero"
                class="logo-footer"
              />
            </a>
            <a href="https://tlh.zerotohero.ca" target="_blank" class="mr-4">
              <img
                src="@/assets/img/logo-tlh-zth-light.png"
                alt="Klingon Zero to Hero"
                class="logo-footer"
              />
            </a>
            <hr class="border-light" style="opacity: 0.5" />
            <p>
              <b>Zero to Hero Education, Canada.</b>
            </p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import Vue from 'vue'

export default {
  components: {
    Nav
  },
  mounted() {
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
