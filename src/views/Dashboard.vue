<template>
  <div>
    <div class="d-flex pb-2">
      <h2>
        Dashboard
        <br />
        <p class="caption mb-1">
          <strong>Data from :</strong> 1 Nov 2021 to 31 Nov 2021
        </p>
      </h2>
      <v-spacer></v-spacer>
      <div class="d-flex" style="gap: 5px">
        <v-btn dense :class="{ accent: activeBtn == 'week' }" @click="setWeek"
          >1 Week</v-btn
        >
        <v-btn dense :class="{ accent: activeBtn == 'month' }" @click="setMonth"
          >1 Month</v-btn
        >
      </div>
    </div>

    <br />
    <Sale></Sale>
    <br />
    <Process> </Process>
  </div>
</template>

<script>
import Sale from "@/components/dashboard/Sale.vue";
import Process from "@/components/dashboard/Process.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: { Sale, Process },
  data: () => ({
    activeBtn: null,
  }),
  computed: {
    ...mapGetters(["getStartDate", "getEndDate"]),
  },
  mounted() {
    this.setWeek();
  },
  methods: {
    ...mapActions(["setStartTime", "setEndTime"]),
    setWeek() {
      var d = new Date();
      this.setEndTime(this.genDate(d));
      d.setDate(d.getDate() - 7);
      this.setStartTime(this.genDate(d));
      this.activeBtn = "week";
    },
    setMonth() {
      var d = new Date();
      this.setEndTime(this.genDate(d));
      d.setMonth(d.getMonth() - 1);
      this.setStartTime(this.genDate(d));
      this.activeBtn = "month";
    },
    genDate(date_ob) {
      // adjust 0 before single digit date
      let date = ("0" + date_ob.getDate()).slice(-2);

      // current month
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

      // current year
      let year = date_ob.getFullYear();

      // current hours
      let hours = ("0" + date_ob.getHours()).slice(-2);

      // // current minutes
      // let minutes = ("0" + date_ob.getMinutes()).slice(-2);

      // // current seconds
      // let seconds = ("0" + date_ob.getSeconds()).slice(-2);

      // prints date & time in YYYY-MM-DD HH:MM:SS format
      return year + "-" + month + "-" + date + " " + hours + ":00:00";
    },
  },
};
</script>
