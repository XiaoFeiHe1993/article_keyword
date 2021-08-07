<template>
  <div class="province-result">
    <div id="province" style="width: 600px; height: 600px;"></div>
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
        '广东',
        '江苏',
        '山东',
        '浙江',
        '河南',
        '四川',
        '福建',
        '湖北',
        '湖南',
        '安徽',
        '上海',
        '北京',
        '河北',
        '江西',
        '陕西',
        '重庆',
        '云南',
        '辽宁',
        '广西',
        '山西',
        '内蒙古',
        '贵州',
        '新疆',
        '天津',
        '吉林',
        '黑龙江',
        '甘肃',
        '海南',
        '宁夏',
        '青海',
        '西藏',
        '台湾',
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
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: state.xAxisData,
          axisLabel: {
            interval: 0,
            // rotate: 45,
            textStyle: {
              color: 'black',
              fontSize: 10
            }
          }
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
          for (let i = state.provinces.length - 1; i >= 0; i--) {
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
  /deep/ canvas {
    width: 100% !important;
  }
}
</style>
