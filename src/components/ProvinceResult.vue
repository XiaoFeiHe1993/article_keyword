<template>
  <div class="province-result">
    <div id="province" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script lang="ts">
import * as echarts from 'echarts'
import { toRefs, reactive, onMounted, watch } from 'vue'
import { countStrNumber } from '@/utils/index'
export default {
  name: 'ProvinceResult',
  props: {
    article: {
      type: String,
      default: ''
    }
  },
  setup (props: any) {
    const state: { yAxisData: any; xAxisData: any; provinces: any } = reactive({
      yAxisData: [],
      xAxisData: [],
      provinces: [
        '北京',
        '天津',
        '上海',
        '重庆',
        '黑龙江',
        '吉林',
        '辽宁',
        '河北',
        '山西',
        '青海',
        '山东',
        '河南',
        '江苏',
        '安徽',
        '浙江',
        '福建',
        '江西',
        '湖南',
        '湖北',
        '广东',
        '台湾',
        '海南',
        '甘肃',
        '陕西',
        '四川',
        '贵州',
        '云南',
        '内蒙古',
        '新疆',
        '西藏',
        '宁夏',
        '广西',
        '香港',
        '澳门'
      ]
    })
    const drawHistogram = () => {
      const myChart = echarts.init(document.getElementById('province') as HTMLDivElement)

      // 指定图表的配置项和数据
      const option = {
        title: {
          text: '省份统计',
          subtext: ''
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: state.xAxisData,
          axisLabel: {
            interval: 0,
            rotate: 45,
            textStyle: {
              color: 'black',
              fontSize: 10
            }
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: 'bar',
            data: state.yAxisData
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
    onMounted(() => {
      drawHistogram()
    })
    watch(
      () => props.article,
      () => {
        if (props.article && props.article.length > 0) {
          state.yAxisData = []
          state.xAxisData = []
          for (let i = 0; i < state.provinces.length; i++) {
            state.yAxisData.push(countStrNumber(props.article, state.provinces[i]))
            state.xAxisData.push(state.provinces[i])
          }
          drawHistogram()
        }
      }
    )

    return { ...toRefs(state) }
  }
}
</script>

<style lang="less" scoped>
.province-result {
  width: 100%;
}
</style>
