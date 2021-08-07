<template>
  <div class="home-page">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>文章内容</span>
        </div>
      </template>
      <el-input type="textarea" v-model="articleInput" @input="handleInputChange" :rows="36" class="article-input" />
    </el-card>
    <el-card class="box-card" style="margin-left: 10px;">
      <el-tabs v-model="activeName" @tab-click="handleTabsClick">
        <el-tab-pane label="关键词分析" name="first">
          <!-- 柱状图 -->
          <echart-histogram :data="analyResult.count" />
          <!-- 词云图 -->
          <echart-words :data="analyResult.count" />
        </el-tab-pane>
        <el-tab-pane label="地里分析" name="second">
          <!-- 各省统计结果 -->
          <province-result :article="articleInput" />
          <!-- 主要城市统计结果 -->
          <city-result :article="articleInput" />
        </el-tab-pane>
        <el-tab-pane label="文章分析" name="third">
          <hightlight-keyword :article="articleInput" />
        </el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import EchartWords from '@/components/EchartWords.vue'
import EchartHistogram from '@/components/EchartHistogram.vue'
import ProvinceResult from '@/components/ProvinceResult.vue'
import CityResult from '@/components/CityResult.vue'
import HightlightKeyword from '@/components/HightlightKeyword.vue'
import { dealWords, countWords } from '@/utils/index'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sentiment = require('sentiment-zh_cn_web')

export default defineComponent({
  name: 'App',
  components: {
    EchartWords,
    EchartHistogram,
    ProvinceResult,
    CityResult,
    HightlightKeyword
  },
  setup () {
    const state = reactive({
      activeName: 'first',
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
    const handleTabsClick = () => {
      console.log('handleTabsClick')
    }
    return { ...toRefs(state), handleInputChange, handleTabsClick }
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
    /deep/ .el-card__body {
      height: calc(100% - 100px);
      overflow-y: auto;
    }
    /deep/ .el-card__body::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
}
</style>
