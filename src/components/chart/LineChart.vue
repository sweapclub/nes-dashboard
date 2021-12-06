<template>
  <v-chart
    ref="chart"
    class="chart"
    :option="option"
    @updateAxisPointer="updatePointer"
  />
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
]);

import { mapActions, mapGetters } from "vuex";

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
    showValue: {
      type: Function,
      default: function () {
        return;
      },
    },
  },
  computed: {
    ...mapGetters(["getPointer"]),
  },
  watch: {
    getPointer(newPointer) {
      this.$refs.chart.setOption({
        xAxis: {
          axisPointer: {
            value: newPointer,
            snap: false,
            lineStyle: {
              color: "#7581BD",
              width: 2,
            },
            label: {
              show: true,
              backgroundColor: "#7581BD",
            },
            triggerTooltip: false,
            handle: {
              show: true,
              color: "#7581BD",
              size: "20",
              margin: "34",
            },
          },
        },
      });
    },
    graphObj(newData) {
      this.setGraph(newData);
    },
  },
  mounted() {
    this.setGraph(this.graphObj);
    // this.showValue({
    //   optimized: this.graphObj.series[0].value.at(-1),
    //   actual: this.graphObj.series[1].value.at(-1),
    //   dt: this.graphObj.xAxis.at(-1).toString().replace("T", " "),
    // });
  },
  methods: {
    ...mapActions(["setPointer"]),
    updatePointer(params) {
      // this.setPointer(this.graphObj.xAxis[params.dataIndex]);
      // console.log(this.getPointer);
      this.setPointer(params.dataIndex);

      // this.showValue({
      //   optimized: this.graphObj.series[0].value[params.dataIndex],
      //   actual: this.graphObj.series[1].value[params.dataIndex],
      //   dt: this.graphObj.xAxis[params.dataIndex].toString().replace("T", " "),
      // });
    },
    setGraph(obj) {
      let series = [];
      obj.series.forEach((e) => {
        series.push({
          data: e.value,
          type: "line",
          name: e.name,
        });
      });

      this.$refs.chart.setOption({
        xAxis: {
          data: obj.xAxis,
        },
        series: series,
      });
    },
  },
  data() {
    return {
      option: {
        // title: {
        //   text: "Stacked Line",
        // },
        tooltip: {
          //   trigger: "axis",
          triggerOn: "none",
        },
        legend: {
          data: [],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "30px",
          top: "25px",
          containLabel: true,
        },
        toolbox: {
          feature: {
            // saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [],
          axisPointer: {
            value: this.getPointer,
            snap: false,
            lineStyle: {
              color: "#7581BD",
              width: 2,
            },
            label: {
              show: true,
              backgroundColor: "#7581BD",
            },
            triggerTooltip: false,
            handle: {
              show: true,
              color: "#7581BD",
              size: "20",
              margin: "34",
            },
          },
        },
        yAxis: {
          type: "value",
        },
        series: [],
      },
    };
  },
};
</script>
