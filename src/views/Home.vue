<template>
  <div class="home-page">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>文章内容</span>
        </div>
      </template>
      <el-input type="textarea" v-model="articleInput" @input="handleInputChange" :rows="30" class="article-input" />
    </el-card>
    <el-card class="box-card" style="margin-left: 10px;">
      <template #header>
        <div class="card-header">
          <span>分析结果</span>
        </div>
      </template>
      <!-- 柱状图 -->
      <echart-histogram :data="analyResult.count" />
      <!-- 词云图 -->
      <echart-words :data="analyResult.count" />
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import EchartWords from '@/components/EchartWords.vue'
import EchartHistogram from '@/components/EchartHistogram.vue'
import { dealWords, countWords } from '@/utils/index'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sentiment = require('sentiment-zh_cn_web')

export default defineComponent({
  name: 'App',
  components: { EchartWords, EchartHistogram },
  setup () {
    const state = reactive({
      articleInput: '',
      analyResult: {
        tokens: [],
        words: [],
        count: []
      }
    })
    const handleInputChange = (value: string) => {
      state.analyResult = sentiment(value)
      // 对分词进行处理、过滤
      state.analyResult.tokens = dealWords(state.analyResult.tokens)
      // 通分词数量进行统计
      state.analyResult.count = countWords(state.analyResult.tokens)
      console.log(state.analyResult)
    }
    return { ...toRefs(state), handleInputChange }
  }
})
</script>

<style lang="less" scoped>
.home-page {
  height: 100%;
  display: flex;
  .box-card {
    width: 100%;
    /deep/ .card-header {
      text-align: left;
    }
    .article-input {
      height: 100%;
    }
  }
}
</style>
