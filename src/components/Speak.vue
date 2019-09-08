<template>
  <font-awesome-icon
    icon="volume-up"
    class="focus-exclude speak"
    @click="speak"
  />
</template>
<script>
export default {
  data() {
    return {}
  },
  props: ['text', 'mp3'],
  methods: {
    speak() {
      if (this.mp3) {
        let audio = new Audio(this.mp3)
        audio.play()
      } else if (this.text) {
        var utterance = new SpeechSynthesisUtterance(this.text)
        utterance.lang = 'ru'
        speechSynthesis.speak(utterance)
      }
    }
  }
}
</script>

<style>
.speak {
  cursor: pointer;
  color: #999;
  position: relative;
}

.speak:hover {
  color: inherit;
}
</style>
