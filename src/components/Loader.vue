<template>
  <div id="loader" v-if="test()" class="d-inline-block text-center">
    <div class="heartbeat-loader mb-4"></div>
    <div>
      <slot>Loading</slot>
    </div>
  </div>
</template>

<script>
import Helper from '@/lib/helper'
export default {
  props: {
    sticky: {
      default: false
    }
  },
  methods: {
    test() {
      if (this.sticky) {
        return true
      } else {
        return !this.LoadedKEngDic
      }
    }
  },
  data() {
    return {
      LoadedKEngDic: undefined
    }
  },
  mounted() {
    Helper.loaded(LoadedKEngDic => {
      this.LoadedKEngDic = LoadedKEngDic
    })
  }
}
</script>
<style></style>
