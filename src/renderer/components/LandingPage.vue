<template>
  <div class="home-page">
    <el-card class="box-card card-left">
      <template #header>
        <div class="card-header">
          <span>文章内容</span>
        </div>
      </template>
      <el-input type="textarea" v-model="articleInput" @input="handleInputChange" class="article-input" />
    </el-card>
    <el-card class="box-card card-right" style="margin-left: 10px;">
      <el-tabs v-model="activeName" @tab-click="handleTabsClick">
        <el-tab-pane label="关键词分析" name="first">
          <!-- 关键词柱状图 -->
          <echart-histogram :data="analyResult.count" />
          <!-- 关键词词云图 -->
          <echart-words :data="analyResult.count" />
        </el-tab-pane>
        <el-tab-pane label="地理分析" name="second">
          <!-- 各省统计结果 -->
          <province-result :article="articleInput" />
          <!-- 主要城市统计结果 -->
          <city-result :article="articleInput" />
        </el-tab-pane>
        <el-tab-pane label="文章分析" name="third">
          <hightlight-keyword :article="articleInput" />
        </el-tab-pane>
        <el-tab-pane label="词性分析" name="fourth">
          <positive-negative :article="articleInput" :positive="analyResult.positive" :negative="analyResult.negative" />
        </el-tab-pane>
        <el-tab-pane label="机构分析" name="five">
          <!-- <org-result :article="articleInput" /> -->
        </el-tab-pane>
        <el-tab-pane label="职位分析" name="six">
          <!-- <position-result :article="articleInput" /> -->
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import EchartWords from '@/components/common/EchartWords.vue'
import EchartHistogram from '@/components/common/EchartHistogram.vue'
import ProvinceResult from '@/components/common/ProvinceResult.vue'
import CityResult from '@/components/common/CityResult.vue'
import HightlightKeyword from '@/components/common/HightlightKeyword.vue'
import positiveNegative from '@/components/common/positiveNegative.vue'
// import OrgResult from '@/components/common/OrgResult.vue'
// import PositionResult from '@/components/common/PositionResult.vue'
import { dealWords, countWords } from '../utils/index'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const sentiment = require('sentiment-zh_cn_web')

export default defineComponent({
  name: 'App',
  components: {
    EchartWords,
    EchartHistogram,
    ProvinceResult,
    CityResult,
    HightlightKeyword,
    positiveNegative
    // OrgResult,
    // PositionResult
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
    height: 100%;
    /deep/ .card-header {
      text-align: left;
    }
  }
  .card-left {
    .article-input {
      height: 100%;
    }
    /deep/ .el-textarea__inner {
      height: 100%;
      scrollbar-base-color: transparent;
      // overflow: hidden;
    }
    /deep/ .el-card__body {
      height: calc(100% - 100px);
      overflow-y: auto;
    }
    /deep/ .el-card__body::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
  .card-right {
    /deep/ .el-card__body {
      height: 100%;
      padding: 0 0;
    }
    /deep/ .el-tabs__header {
      padding: 20px 20px 0 20px;
    }
    /deep/ .el-tabs__content {
      height: calc(100% - 95px) !important;
      padding: 0 20px 0 20px;
    }
    /deep/ .el-tabs {
      height: 100%;
    }
    /deep/ .el-tab-pane {
      height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
    }
    /deep/ .el-tab-pane::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
}
</style>
<style>
html {
  padding: 0 0;
  margin: 0 0;
}
</style>
