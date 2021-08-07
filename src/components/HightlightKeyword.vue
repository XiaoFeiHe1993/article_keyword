<template>
  <div class="heightlight-keyword">dddd</div>
</template>

<script>
export default {
  name: 'HeightlightKeyword',
  props: {
    article: {
      type: String,
      default: ''
    }
  },
  setup () {
    console.log('...')
  }
}
</script>

<style lang="less" scoped>
.heightlight-keyword {
  width: 100%;
}
</style>
