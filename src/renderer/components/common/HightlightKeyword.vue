<template>
  <div class="heightlight-keyword" v-html="result">
  </div>
</template>

<script>
import { reactive, toRefs, watch } from 'vue'
export default {
  name: 'HeightlightKeyword',
  props: {
    article: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const state = reactive({
      result: '',
      keywords: ['加快', '加强', '加大', '支持', '推进', '推动', '增强', '加强', '提高', '强化']
    })
    watch(
      () => props.article,
      () => {
        state.result = props.article
        for (let i = 0; i < state.keywords.length; i++) {
          state.result = state.result.replaceAll(state.keywords[i], `<span style="background-color: yellow;">${state.keywords[i]}</span>`)
        }
      }
    )
    return { ...toRefs(state) }
  }
}
</script>

<style lang="less" scoped>
.heightlight-keyword {
  width: 100%;
  height: 920px;
  white-space: pre-line;
  text-align: left;
  overflow-y: auto;
}
.heightlight-keyword::-webkit-scrollbar {
  display: none;
}
</style>
