<template>
  <div class="type-nav">
    <div class="type-nav-item" v-for="type in types" :data-type="type">
      {{ type.charAt(0).toUpperCase() + type.substr(1) }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    types: {
      type: Array
    }
  },
  data() {
    return {

    }
  }
}
</script>
