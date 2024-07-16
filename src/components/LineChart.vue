<template>
    <div ref="chart3" style="width: 100%; height: 400px;"></div>
  </template>
  
  <script>
  import { defineComponent, onMounted, ref, watch } from 'vue';
  import * as echarts from 'echarts';
  
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
      const chart3 = ref(null);
  
      const initChart = () => {
        const chart = echarts.init(chart3.value);
        const option = {
          legend: {
            data: props.legendData,
            top: 0
          },
          xAxis: {
            data: props.xAxisData
          },
          yAxis: [
            {
              type: 'value',
              name: '数量'
            },
            {
              type: 'value',
              name: '通过率',
              axisLabel: {
                formatter: '{value}%'
              }
            }
          ],
          series: props.seriesData
        };
        chart.setOption(option);
      };
  
      onMounted(initChart);
  
      // Watch for props changes and update the chart accordingly
      watch(
        () => [props.xAxisData, props.seriesData, props.legendData],
        () => {
          if (chart3.value) {
            initChart();
          }
        }
      );
  
      return {
        chart3
      };
    }
  });
  </script>
  
  <style scoped>
  /* 你可以在这里添加一些样式 */
  </style>
  