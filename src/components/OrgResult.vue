<template>
  <div class="orgresult" v-html="result">
  </div>
</template>

<script>
import { reactive, toRefs, watch } from 'vue'
export default {
  name: 'OrgResult',
  props: {
    article: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const state = reactive({
      result: '',
      keywords: ['国务院']
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
.orgresult {
  width: 100%;
  height: 800px;
  white-space: pre-line;
  text-align: left;
  overflow-y: auto;
}
.orgresult::-webkit-scrollbar {
  display: none;
}
</style>
