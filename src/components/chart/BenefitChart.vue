<template>
  <v-chart ref="chart" class="chart" :option="option" />
</template>

<script>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  MarkLineComponent,
} from "echarts/components";
import VChart from "vue-echarts";
// import VChart, { THEME_KEY } from "vue-echarts";

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
  MarkLineComponent,
]);

// import { mapActions, mapGetters } from "vuex";

export default {
  name: "HelloWorld",
  components: {
    VChart,
  },
  props: {
    graphObj: {
      type: Object,
      default: function () {
        return null;
      },
    },
  },
  computed: {
    // ...mapGetters(["getPointer"]),
  },
  watch: {
    graphObj(newData) {
      this.setGraph(newData);
    },
  },
  mounted() {
    this.setGraph(this.graphObj);
  },
  methods: {
    setGraph(obj) {
      let series = [];
      let setRefColor = ["#5470c6", "#91cc75"];
      let colorTheme = ["#fac858", "#ee6666", "#73c0de", "#3ba272"];
      let setValue = [obj.detail.optimized, obj.detail.actual];

      obj.series.forEach((e, i) => {
        let d = [];
        for (let i = 0; i < obj.xAxis.length; i++) {
          d.push([obj.xAxis[i], e.value[i]]);
        }

        series.push({
          data: d,
          type: "line",
          name: e.name,
          itemStyle: { color: colorTheme[i] },
          symbol: "none",
          markLine: {
            silent: false,
            lineStyle: {
              color: setRefColor[i],
            },
            symbol: ["none", "none"],
            data: [
              {
                name: "ref",
                xAxis: setValue[i],
              },
              // {
              //   name: "actual",
              //   xAxis: obj.detail.actual,
              //   // xAxis: "4.5",
              // },
              // { name: "optimized", xAxis: obj.detail.optimized },
            ],
          },
        });
      });

      if (series.length > 0) {
        series[0].markLine = {
          silent: false,
          lineStyle: {
            color: "#5470c6",
          },
          symbol: ["none", "none"],
          data: [
            {
              name: "actual",
              xAxis: obj.detail.actual,
              // xAxis: "4.5",
            },
            { name: "optimized", xAxis: obj.detail.optimized },
          ],
        };
      }

      // console.log(series);

      this.$refs.chart.setOption({
        title: {
          text: this.graphObj.name,
        },
        series: JSON.parse(JSON.stringify(series)),
      });
    },
  },
  data() {
    return {
      option: {
        title: {
          text: this.graphObj.name,
        },
        tooltip: {
          trigger: "axis",
          //   triggerOn: "none",
        },
        legend: {
          data: [],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "30px",
          top: "40px",
          containLabel: true,
        },
        toolbox: {
          feature: {
            // saveAsImage: {},
          },
        },
        xAxis: {
          scale: "value",
          type: "value",
          boundaryGap: false,
          // data: [],
        },
        yAxis: {
          type: "value",
          scale: "value",
          //   axisLine: {
          //     onZero: false, // This is important, so x axis can start from non-zero number
          //   },
        },
        series: [],
      },
    };
  },
};
</script>
