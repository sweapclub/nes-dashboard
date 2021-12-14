<template>
  <div>
    <v-card>
      <v-card-title>Process</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="5">
            <BenefitChart
              v-if="benefitObj"
              :graphObj="benefitObj"
            ></BenefitChart>
          </v-col>
          <v-col cols="7">
            <v-radio-group v-model="processSelected" @change="changeProcess">
              <v-card class="mb-2">
                <v-card-text>
                  <v-row>
                    <v-col style="flex-grow: 0"
                      ><v-radio value="1"></v-radio
                    ></v-col>
                    <v-col>
                      <v-select
                        v-model="selectFirst"
                        :items="unselectFirst"
                        item-text="name"
                        item-value="id"
                        label="Selected Process"
                        outlined
                        hide-details
                        dense
                        style="width: 200px"
                        @change="getFirstGraph"
                      >
                      </v-select
                    ></v-col>
                    <v-spacer></v-spacer>
                    <v-col class="text-right">{{
                      sliderFirstValue.actual
                    }}</v-col>
                  </v-row>
                  <div style="height: 150px">
                    <LineChart
                      v-if="firstGraph"
                      :graphObj="firstGraph"
                    ></LineChart>
                  </div>
                </v-card-text>
              </v-card>
              <v-card class="mb-2">
                <v-card-text>
                  <v-row>
                    <v-col style="flex-grow: 0"
                      ><v-radio value="2"></v-radio
                    ></v-col>
                    <v-col>
                      <v-select
                        v-model="selectSecond"
                        :items="unselectSecond"
                        item-text="name"
                        item-value="id"
                        label="Selected Process"
                        outlined
                        dense
                        hide-details
                        style="width: 200px"
                        @change="getSecondGraph"
                      >
                      </v-select
                    ></v-col>
                    <v-spacer></v-spacer>
                    <v-col class="text-right">{{
                      sliderSecondValue.actual
                    }}</v-col>
                  </v-row>
                  <div style="height: 150px">
                    <LineChart
                      v-if="secondGraph"
                      :graphObj="secondGraph"
                    ></LineChart>
                  </div>
                </v-card-text>
              </v-card>
              <v-card class="mb-2">
                <v-card-text>
                  <v-row>
                    <v-col style="flex-grow: 0"
                      ><v-radio value="3"></v-radio
                    ></v-col>
                    <v-col>
                      <v-select
                        v-model="selectThird"
                        :items="unselectThird"
                        item-text="name"
                        item-value="id"
                        label="Selected Process"
                        outlined
                        hide-details
                        dense
                        style="width: 200px"
                        @change="getThirdGraph"
                      ></v-select>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col class="text-right">{{
                      sliderThirdValue.actual
                    }}</v-col>
                  </v-row>

                  <div style="height: 150px">
                    <LineChart
                      v-if="thirdGraph"
                      :graphObj="thirdGraph"
                    ></LineChart>
                  </div>
                </v-card-text>
              </v-card>
            </v-radio-group>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import LineChart from "@/components/chart/LineChart.vue";
import BenefitChart from "@/components/chart/BenefitChart.vue";
import { mapGetters } from "vuex";
export default {
  components: { LineChart, BenefitChart },
  mounted() {
    // this.getFirstGraph();
    // this.getSecondGraph();
    // this.getThirdGraph();
  },
  data: () => ({
    processList: [
      { id: "mea", name: "mea" },
      { id: "dea", name: "dea" },
      { id: "tea", name: "tea" },
      { id: "amine", name: "amine" },
      { id: "crudedea", name: "crudedea" },
      { id: "eo", name: "EO" },
      { id: "nh3", name: "EO NH3 Ratio" },
      { id: "dea_recycle", name: "Dea Recycle" },
    ],
    selectFirst: "eo",
    selectSecond: "dea_recycle",
    selectThird: "nh3",
    firstGraph: null,
    secondGraph: null,
    thirdGraph: null,

    sliderFirstValue: {},
    sliderSecondValue: {},
    sliderThirdValue: {},

    processSelected: "1",
    delayBenefit: null,
    benefitObj: null,
  }),
  watch: {
    getPointer(newVal) {
      if (
        (this.firstGraph != null) &
        (this.secondGraph != null) &
        (this.thirdGraph != null)
      ) {
        clearTimeout(this.delayBenefit);
        this.sliderFirstValue = {
          optimized: this.firstGraph.series[0].value[newVal],
          actual: this.firstGraph.series[1].value[newVal],
          dt: this.firstGraph.xAxis[newVal].toString().replace("T", " "),
        };
        this.sliderSecondValue = {
          optimized: this.secondGraph.series[0].value[newVal],
          actual: this.secondGraph.series[1].value[newVal],
          dt: this.secondGraph.xAxis[newVal].toString().replace("T", " "),
        };
        this.sliderThirdValue = {
          optimized: this.thirdGraph.series[0].value[newVal],
          actual: this.thirdGraph.series[1].value[newVal],
          dt: this.thirdGraph.xAxis[newVal].toString().replace("T", " "),
        };

        this.delayBenefit = setTimeout(() => {
          this.getBenefit();
        }, 1500);
      }
    },
    getStartDate() {
      this.firstGraph = null;
      this.secondGraph = null;
      this.thirdGraph = null;
      this.benefitObj = null;

      this.getFirstGraph();
      this.getSecondGraph();
      this.getThirdGraph();
    },
  },
  methods: {
    getProcess(m) {
      // // console.log(
      //   `${process.env.VUE_APP_API_PATH}/process/${this.getStartDate}/${this.getEndDate}/?method=${m}`
      // );
      return fetch(
        `${process.env.VUE_APP_API_PATH}/process/${this.getStartDate}/${this.getEndDate}/?method=${m}`
      )
        .then((res) => res.json())
        .then((data) => {
          return data;
        });
    },
    getFirstGraph() {
      this.getProcess(this.selectFirst).then((data) => {
        this.firstGraph = data;
        this.sliderFirstValue = {
          optimized: this.firstGraph.series[0].value.at(-1),
          actual: this.firstGraph.series[1].value.at(-1),
          dt: this.firstGraph.xAxis.at(-1).toString().replace("T", " "),
        };
        if (this.processSelected == "1") {
          this.getBenefit();
        }
      });
    },
    getSecondGraph() {
      this.getProcess(this.selectSecond).then((data) => {
        this.secondGraph = data;
        this.sliderSecondValue = {
          optimized: this.secondGraph.series[0].value.at(-1),
          actual: this.secondGraph.series[1].value.at(-1),
          dt: this.secondGraph.xAxis.at(-1).toString().replace("T", " "),
        };
        if (this.processSelected == "2") {
          this.getBenefit();
        }
      });
    },
    getThirdGraph() {
      this.getProcess(this.selectThird).then((data) => {
        this.thirdGraph = data;
        this.sliderThirdValue = {
          optimized: this.thirdGraph.series[0].value.at(-1),
          actual: this.thirdGraph.series[1].value.at(-1),
          dt: this.thirdGraph.xAxis.at(-1).toString().replace("T", " "),
        };
        if (this.processSelected == "3") {
          this.getBenefit();
        }
      });
    },
    getBenefit() {
      fetch(
        `${process.env.VUE_APP_API_PATH}/process/benefit/${this.benefitDate}/?method=${this.benefitProcess}`
      )
        .then((res) => res.json())
        .then((data) => {
          data.detail = JSON.parse(JSON.stringify(this.benefitCurrent));
          this.benefitObj = data;
          // console.log(this.benefitObj);
        });
    },
    changeProcess() {
      this.getBenefit();
    },
    showFirstValue(obj) {
      this.sliderFirstValue = obj;
    },
    showSecondValue(obj) {
      this.sliderSecondValue = obj;
    },
    showThirdValue(obj) {
      this.sliderThirdValue = obj;
    },
  },
  computed: {
    ...mapGetters(["getPointer", "getStartDate", "getEndDate"]),
    benefitProcess() {
      switch (this.processSelected) {
        case "1":
          return this.selectFirst;
        case "2":
          return this.selectSecond;
        case "3":
          return this.selectThird;
        default:
          return null;
      }
    },
    benefitDate() {
      switch (this.processSelected) {
        case "1":
          return this.sliderFirstValue.dt;
        case "2":
          return this.sliderSecondValue.dt;
        case "3":
          return this.sliderThirdValue.dt;
        default:
          return null;
      }
    },
    benefitCurrent() {
      switch (this.processSelected) {
        case "1":
          return this.sliderFirstValue;
        case "2":
          return this.sliderSecondValue;
        case "3":
          return this.sliderThirdValue;
        default:
          return null;
      }
    },
    unselectFirst() {
      return this.processList.filter(
        (f) => (f.id != this.selectThird) & (f.id != this.selectSecond)
      );
    },
    unselectSecond() {
      return this.processList.filter(
        (f) => (f.id != this.selectFirst) & (f.id != this.selectThird)
      );
    },
    unselectThird() {
      return this.processList.filter(
        (f) => (f.id != this.selectFirst) & (f.id != this.selectSecond)
      );
    },
  },
};
</script>
