<template>
  <div class="echart-histogram">
    <div id="histogram" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { toRefs, reactive, onMounted, watch } from 'vue'
export default {
  name: 'EchartHistogram',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  setup (props, context) {
    const state = reactive({
      yAxisData: [],
      xAxisData: []
    })
    const drawHistogram = () => {
      const myChart = echarts.init(document.getElementById('histogram'))

      // 指定图表的配置项和数据
      const option = {
        title: {
          text: '分词',
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
          data: state.yAxisData
        },
        series: [
          {
            name: '2011年',
            type: 'bar',
            data: state.xAxisData
          }
        ]
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
    onMounted(() => {
      drawHistogram()
    })
    watch(() => props.data, () => {
      if (props.data && props.data.length > 0) {
        const index = props.data.length > 50 ? 50 : props.data.length
        state.yAxisData = []
        state.xAxisData = []
        for (let i = 0; i < index; i++) {
          state.yAxisData.push(props.data[i].name)
          state.xAxisData.push(props.data[i].value)
        }
        drawHistogram()
      }
    })
    return { ...toRefs(state) }
  }
}
</script>

<style lang="less" scoped>
.echart-histogram {
  width: 100%;
}
</style>
