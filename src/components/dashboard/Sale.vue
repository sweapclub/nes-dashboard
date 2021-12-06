<template>
  <v-card>
    <v-card-title>Sale</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row>
        <v-col cols="4">
          <v-select
            v-model="selectedSaleTypes"
            :items="saleTypes"
            item-text="name"
            item-value="id"
            label="Selected Type"
            outlined
            dense
            style="width: 200px"
            @change="changeType()"
          ></v-select>
          <h3 class="pb-2">
            <strong>Date :</strong> <span> {{ sliderValue.dt }} </span>
          </h3>
          <h3 class="pb-2">
            <strong>Optimized :</strong>
            {{ sliderValue.optimized | numberWithCommas }}
          </h3>
          <h3 class="pb-2">
            <strong>Actual Benefit :</strong>
            {{ sliderValue.actual | numberWithCommas }}
          </h3>
        </v-col>
        <v-col cols="8">
          <LineChart
            v-if="graphObj"
            :graphObj="graphObj"
            :showValue="showValue"
          />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import LineChart from "@/components/chart/LineChart.vue";
import { mapGetters } from "vuex";
export default {
  components: { LineChart },
  data: () => ({
    saleTypes: [
      { id: "benefit", name: "Benefit" },
      { id: "cost", name: "Cost" },
      { id: "revenue", name: "Revenue" },
      { id: "energy", name: "Energy" },
      { id: "material", name: "Material" },
    ],
    selectedSaleTypes: "benefit",
    graphObj: null,
    sliderValue: {
      predict: null,
      actual: null,
      dt: null,
    },
  }),
  watch: {
    getPointer(newVal) {
      this.showValue({
        optimized: this.graphObj.series[0].value[newVal],
        actual: this.graphObj.series[1].value[newVal],
        dt: this.graphObj.xAxis[newVal].toString().replace("T", " "),
      });
    },
    getStartDate() {
      this.graphObj = null;
      this.getSale();
    },
  },
  computed: {
    ...mapGetters(["getPointer", "getStartDate", "getEndDate"]),
  },
  filters: {
    numberWithCommas: function (x) {
      if (x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      return x;
    },
  },
  mounted() {
    // this.getSale();
  },
  methods: {
    showValue(obj) {
      this.sliderValue = obj;
    },
    getSale() {
      fetch(
        `${process.env.VUE_APP_API_PATH}/sale/${this.getStartDate}/${this.getEndDate}/?method=${this.selectedSaleTypes}`
      )
        .then((res) => res.json())
        .then((data) => {
          this.graphObj = data;
          this.showValue({
            optimized: this.graphObj.series[0].value.at(-1),
            actual: this.graphObj.series[1].value.at(-1),
            dt: this.graphObj.xAxis.at(-1).toString().replace("T", " "),
          });
        });
    },
    changeType() {
      this.getSale();
    },
  },
};
</script>
