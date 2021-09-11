<template>
  <div class="position-result" v-html="result">
  </div>
</template>

<script>
import { reactive, toRefs, watch } from 'vue'
export default {
  name: 'PositionResult',
  props: {
    article: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const state = reactive({
      result: '',
      keywords: ['省委书记']
    })
    watch(
      () => props.article,
      () => {
        state.result = props.article
        for (let i = 0; i < state.keywords.length; i++) {
          state.result = state.result.replaceAll(state.keywords[i], `<span style="background-color: pink;">${state.keywords[i]}</span>`)
        }
      }
    )
    return { ...toRefs(state) }
  }
}
</script>

<style lang="less" scoped>
.position-result {
  width: 100%;
  height: 800px;
  white-space: pre-line;
  text-align: left;
  overflow-y: auto;
}
.position-result::-webkit-scrollbar {
  display: none;
}
</style>
