<template>
  <div ref="chart" id="colChart" style="width: 100%; height: 100%;"></div>
</template>

<script>
import { defineComponent, onMounted, ref, watch ,nextTick} from 'vue';
import * as echarts from 'echarts';
import elementResizeDetectorMaker from 'element-resize-detector';

export default defineComponent({
  name: 'BarChart',
  props: {
    chartData: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const chart = ref(null);
    let chartInstance;

    const generateDays = () => {
      return Array.from({ length: 7 }, (_, i) => (i + 1).toString());
    };

    const initChart = () => {
      chartInstance = echarts.init(chart.value);
      const days = generateDays();

      const dataMap = days.reduce((acc, day, index) => {
        acc[day] = props.chartData[index] || {
          acInContest: 0,
          acInMakeup: 0,
          waInContest: 0,
          waInMakeup: 0
        };
        return acc;
      }, {});

      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['赛时AC数', '补题AC数', '赛时未通过数', '补题未通过数']
        },
        xAxis: {
          type: 'category',
          data: days
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '赛时AC数',
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series'
            },
            data: days.map(day => dataMap[day].acInContest),
            itemStyle: { color: '#70a1d7' }
          },
          {
            name: '补题AC数',
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series'
            },
            data: days.map(day => dataMap[day].acInMakeup),
            itemStyle: { color: '#a1de93' }
          },
          {
            name: '赛时未通过数',
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series'
            },
            data: days.map(day => dataMap[day].waInContest),
            itemStyle: { color: '#f7f48b' }
          },
          {
            name: '补题未通过数',
            type: 'bar',
            stack: 'total',
            emphasis: {
              focus: 'series'
            },
            data: days.map(day => dataMap[day].waInMakeup),
            itemStyle: { color: '#f47c7c' }
          }
        ]
      };

      chartInstance.setOption(option);
    };

    onMounted(() => {
      initChart();
      var erd = elementResizeDetectorMaker();
      erd.listenTo(chart.value, async (element) => {
        nextTick(function () {
          let width = element.clientWidth
          let height = element.clientHeight
          console.log("Size: " + width + "x" + height)
          //使echarts尺寸重置
          chartInstance.resize()
        })
      })
    })

    watch(() => props.chartData, initChart, { deep: true });

    return {
      chart
    };
  }
});
</script>

<style scoped>
/* Add any additional styling here */
</style>