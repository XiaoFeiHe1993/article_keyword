<template>
  <div class="orgresult" v-html="result"></div>
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
      centerOrg: [
        '国务院办公厅',
        '外交部',
        '国防部',
        '国家发展和改革委员会',
        '教育部',
        '科学技术部',
        '工业和信息化部',
        '国家民族事务委员会',
        '公安部',
        '国家安全部',
        '监察部',
        '民政部',
        '司法部',
        '财政部',
        '人力资源和社会保障部',
        '国土资源部',
        '环境保护部',
        '住房和城乡建设部',
        '交通运输部',
        '水利部',
        '农业部',
        '商务部',
        '文化部',
        '国家卫生和计划生育委员会',
        '中国人民银行',
        '审计署',
        '海关总署',
        '国家税务总局',
        '国家工商行政管理总局',
        '国家质量监督检验检疫总局',
        '国家新闻出版广电总局',
        '国家体育总局',
        '国家安全生产监督管理总局',
        '国家食品药品监督管理总局',
        '国家统计局',
        '国家林业局',
        '国家知识产权局',
        '国家旅游局',
        '国家宗教事务局',
        '国务院参事室',
        '国家机关事务管理局',
        '国务院侨务办公室',
        '国务院港澳事务办公室',
        '国务院法制办公室',
        '国务院研究室',
        '新华通讯社',
        '中国科学院',
        '中国社会科学院',
        '中国工程院',
        '国务院发展研究中心',
        '国家行政学院',
        '中国地震局',
        '中国气象局',
        '中国银行业监督管理委员会',
        '中国证券监督管理委员会',
        '中国保险监督管理委员会',
        '全国社会保障基金理事会',
        '国家自然科学基金委员会',
        '国家信访局',
        '国家能源局',
        '国家烟草专卖局',
        '国家公务员局',
        '国家测绘地理信息局',
        '中国民用航空局',
        '国家文物局',
        '国家外汇管理局',
        '国家粮食局',
        '国家国防科技工业局',
        '国家外国专家局',
        '国家海洋局',
        '国家铁路局',
        '国家邮政局',
        '国家中医药管理局',
        '国家煤矿安全监察局'
      ],
      provinceOrg: [
        '办公厅',
        '发展和改革委员会',
        '经济和信息化厅',
        '教育厅',
        '科学技术厅',
        '民族宗教事务委员会',
        '公安厅',
        '民政厅',
        '司法厅',
        '财政厅',
        '人力资源和社会保障厅',
        '自然资源厅',
        '生态环境厅',
        '住房和城乡建设厅',
        '交通运输厅',
        '水利厅',
        '农业农村厅',
        '商务厅',
        '文化和旅游厅',
        '卫生健康委员会',
        '退役军人事务厅',
        '应急管理厅',
        '审计厅',
        '外事办公室',
        '国有资产监督管理委员会',
        '大数据发展管理局',
        '能源局',
        '监狱管理局',
        '综合行政执法指导办公室',
        '林业局',
        '文物局',
        '药品监督管理局',
        '市场监督管理局',
        '地方金融监督管理局',
        '广播电视局',
        '体育局',
        '统计局',
        '粮食和物资储备局',
        '医疗保障局',
        '机关事务管理局',
        '人民防空办公室',
        '研究室'
      ],
      cityOrg: [],
      others: [
        '部门'
      ]
    })
    watch(
      () => props.article,
      () => {
        state.result = props.article
        for (let i = 0; i < state.centerOrg.length; i++) {
          state.result = state.result.replaceAll(state.centerOrg[i], `<span style="background-color: yellow;">${state.centerOrg[i]}</span>`)
        }
        for (let i = 0; i < state.provinceOrg.length; i++) {
          state.result = state.result.replaceAll(state.provinceOrg[i], `<span style="background-color: green;">${state.provinceOrg[i]}</span>`)
        }
        for (let i = 0; i < state.cityOrg.length; i++) {
          state.result = state.result.replaceAll(state.cityOrg[i], `<span style="background-color: pink;">${state.cityOrg[i]}</span>`)
        }
        for (let i = 0; i < state.others.length; i++) {
          state.result = state.result.replaceAll(state.others[i], `<span style="background-color: lightgreen;">${state.others[i]}</span>`)
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
