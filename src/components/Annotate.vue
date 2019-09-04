<template>
  <component :is="tag">
    <slot></slot>
  </component>
</template>

<script>
export default {
  props: {
    tag: {
      default: 'span'
    }
  }
}
</script>