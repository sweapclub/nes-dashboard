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

      obj.series.forEach((e) => {
        let d = [];
        for (let i = 0; i < obj.xAxis.length; i++) {
          d.push([obj.xAxis[i], e.value[i]]);
        }
        console.log(d);
        series.push({
          data: d,
          type: "line",
          name: e.name,
          // markLine: {
          //   silent: true,
          //   lineStyle: {
          //     color: "#333",
          //   },
          //   symbol: ["none", "none"],
          //   data: [
          //     { xAxis: 4.5},
          //     {
          //       xAxis: 4000,
          //     },
          //     { xAxis: 3700 },
          //   ],
          // },
        });
      });
      // console.log(obj.detail);
      series[0].markLine = {
        silent: false,
        lineStyle: {
          color: "#333",
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
      // console.log(series);

      this.$refs.chart.setOption({
        title: {
          text: this.graphObj.name,
        },
        // xAxis: {
        //   data: obj.xAxis,
        // },
        series: JSON.parse(JSON.stringify(series)),
      });
      console.log(this.$refs.chart.getOption());
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
