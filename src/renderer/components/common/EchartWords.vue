<template>
  <div class="echart-words">
    <div ref="cloud" id="cloud" style="width: 100%;height: 600px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts-wordcloud'
import { toRefs, reactive, onMounted, watch } from 'vue'
export default {
  name: 'EchartWords',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  setup (props, context) {
    const state = reactive({
      cloudData: props.data || []
    })
    const drawCloud = (wrap, data) => {
      const myChart = echarts.init(wrap)
      var option = {
        tooltip: {
          show: true
        },
        series: [
          {
            name: '热词',
            type: 'wordCloud',
            sizeRange: [10, 30],
            rotationRange: [-20, 20],
            shape: 'circle',
            left: 'center',
            top: 'center',
            width: '100%',
            height: '80%',
            gridSize: 3,
            textPadding: 0,
            autoSize: {
              enable: true,
              minSize: 6
            },
            textStyle: {
              normal: {
                color: function () {
                  return (
                    'rgb(' +
                    [
                      Math.round(Math.random() * 250),
                      Math.round(Math.random() * 250),
                      Math.round(Math.random() * 250)
                    ].join(',') +
                    ')'
                  )
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            data: data
          }
        ]
      }
      myChart.setOption(option)
    }
    onMounted(() => {
      drawCloud(document.getElementById('cloud'), state.cloudData)
    })
    watch(() => props.data, () => {
      state.cloudData = props.data
      drawCloud(document.getElementById('cloud'), state.cloudData)
    })
    return { ...toRefs(state) }
  }
}
</script>

<style lang="less" scoped>
.echart-words {
  height: 600px;
}
</style>
