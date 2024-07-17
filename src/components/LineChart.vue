<template>
  <div ref="lineChart" id="colChart" style="width: 100%; height: 400px;"></div>
</template>

<script>
import { defineComponent, onMounted, ref, watch,nextTick } from 'vue';
import * as echarts from 'echarts';
import elementResizeDetectorMaker from 'element-resize-detector';

export default defineComponent({
  name: 'LineChart',
  props: {
    xAxisData: {
      type: Array,
      required: true
    },
    seriesData: {
      type: Array,
      required: true
    },
    legendData: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    let chart;
    const lineChart = ref(null);

    const initChart = () => {
      chart = echarts.init(lineChart.value);
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: props.legendData,
          top: 0
        },
        xAxis: {
          type: 'category',
          data: props.xAxisData,
          axisLabel: {
            formatter: function (value) {
              return value.length > 5 ? value.slice(0, 5) + '...' : value;
            },
            // 中文注释
            interval: 'auto',
            rotate: -45
          }
        },
        yAxis: {
          type: 'value',
          name: '分数'
        },
        dataZoom: [
          {
            type: 'slider',
            show: true,
            xAxisIndex: [0],
            start: 90,
            end: 100
          }
        ],
        series: props.seriesData
      };
      chart.setOption(option);
    };

    onMounted(() => {
      initChart();
      var erd = elementResizeDetectorMaker();
      erd.listenTo(lineChart.value, async (element) => {
        nextTick(function () {
          let width = element.clientWidth
          let height = element.clientHeight
          console.log("Size: " + width + "x" + height)
          //使echarts尺寸重置
          chart.resize()
        })
      })
    })

    // Watch for props changes and update the chart accordingly
    watch(
      () => [props.xAxisData, props.seriesData, props.legendData],
      () => {
        if (lineChart.value) {
          initChart();
        }
      }
    );

    return {
      lineChart
    };
  }
});
</script>

<style scoped>


</style>
