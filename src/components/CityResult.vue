<template>
  <div class="city-result">
    <div id="city" style="width: 100%; height: 400px;"></div>
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
        '北京',
        '天津',
        '上海',
        '重庆',
        '哈尔滨',
        '长春',
        '沈阳',
        '大连',
        '石家庄',
        '太原',
        '西宁',
        '济南',
        '青岛',
        '郑州',
        '南京',
        '苏州',
        '无锡',
        '合肥',
        '杭州',
        '宁波',
        '福州',
        '厦门',
        '泉州',
        '南昌',
        '长沙',
        '武汉',
        '广州',
        '深圳',
        '佛山',
        '海口',
        '兰州',
        '西安',
        '程度',
        '贵阳',
        '昆明',
        '呼和浩特',
        '乌鲁木齐',
        '拉萨',
        '银川',
        '南宁',
        '香港',
        '澳门'
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
            state.yAxisData.push(countStrNumber(props.article, state.citys[i]))
            state.xAxisData.push(state.citys[i])
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
