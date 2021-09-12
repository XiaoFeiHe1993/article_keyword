<template>
  <div class="orgresult" v-html="result"></div>
</template>

<script>
import { reactive, toRefs, watch } from 'vue'
const ipcRenderer = require('electron').ipcRenderer;
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
      otherOrg: [
        '国务院办公厅'
      ],
    })
    watch(
      () => props.article,
      () => {
        ipcRenderer.invoke('article-org', props.article).then(res => {
          state.result = props.article
          for (let i = 0; i < state.otherOrg.length; i++) {
            state.result = state.result.replaceAll(state.otherOrg[i], `<span style="background-color: yellow;">${state.otherOrg[i]}</span>`)
          }
          for (let i = 0; i < res.length; i++) {
            state.result = state.result.replaceAll(res[i].word, `<span style="background-color: pink;">${res[i].word}</span>`)
          }
        })
      }
    )
    return { ...toRefs(state) }
  }
}
</script>

<style lang="less" scoped>
.orgresult {
  width: 100%;
  white-space: pre-line;
  text-align: left;
  overflow-y: auto;
}
.orgresult::-webkit-scrollbar {
  display: none;
}
</style>
