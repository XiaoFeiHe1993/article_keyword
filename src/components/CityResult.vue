<template>
  <div class="city-result">
    <div id="city" style="width: 100%; height: 800px;"></div>
  </div>
</template>

<script lang="ts">
import * as echarts from 'echarts'
import { toRefs, reactive, onMounted, watch } from 'vue'
import { countStrNumber } from '@/utils/index'
export default {
  name: 'CityResult',
  props: {
    article: {
      type: String,
      default: ''
    }
  },
  setup (props: any) {
    const state: { yAxisData: any; xAxisData: any; citys: any } = reactive({
      yAxisData: [],
      xAxisData: [],
      citys: [
        '澳门',
        '香港',
        '海口',
        '兰州',
        '西宁',
        '呼和浩特',
        '乌鲁木齐',
        '拉萨',
        '石家庄',
        '太原',
        '贵阳',
        '昆明',
        '银川',
        '南宁',
        '哈尔滨',
        '长春',
        '沈阳',
        '大连',
        '南昌',
        '福州',
        '厦门',
        '泉州',
        '西安',
        '合肥',
        '佛山',
        '济南',
        '郑州',
        '长沙',
        '青岛',
        '无锡',
        '宁波',
        '天津',
        '南京',
        '武汉',
        '杭州',
        '成都',
        '苏州',
        '重庆',
        '深圳',
        '广州',
        '北京',
        '上海'
      ]
    })
    const drawHistogram = () => {
      const myChart = echarts.init(document.getElementById('city') as HTMLDivElement)

      // 指定图表的配置项和数据
      const option = {
        title: {
          text: '重要城市统计',
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
    watch(
      () => props.article,
      () => {
        if (props.article && props.article.length > 0) {
          state.yAxisData = []
          state.xAxisData = []
          for (let i = 0; i < state.citys.length; i++) {
            state.xAxisData.push(countStrNumber(props.article, state.citys[i]))
            state.yAxisData.push(state.citys[i])
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
.city-result {
  width: 100%;
}
</style>
