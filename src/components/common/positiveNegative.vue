<template>
  <div class="heightlight-keyword" v-html="result">
  </div>
</template>

<script>
import { reactive, toRefs, watch } from 'vue'
export default {
  name: 'positiveNegative',
  props: {
    article: {
      type: String,
      default: ''
    },
    positive: {
      type: Array,
      default: () => []
    },
    negative: {
      type: Array,
      default: () => []
    }
  },
  setup (props) {
    const state = reactive({
      result: '',
      keywords: ['加快', '加强', '加大', '支持', '推进', '推动', '增强', '加强']
    })
    watch(
      () => props.article,
      () => {
        state.result = props.article
        for (let i = 0; i < props.positive.length; i++) {
          state.result = state.result.replaceAll(props.positive[i], `<span style="background-color: lawngreen;">${props.positive[i]}</span>`)
        }
        for (let i = 0; i < props.negative.length; i++) {
          state.result = state.result.replaceAll(props.negative[i], `<span style="background-color: orangered;">${props.negative[i]}</span>`)
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
  height: 800px;
  white-space: pre-line;
  text-align: left;
  overflow-y: auto;
}
.heightlight-keyword::-webkit-scrollbar {
  display: none;
}
</style>
