<template>
  <v-card>
    <v-card-title>Upload New data</v-card-title>
    <v-card-text>
      <v-row>
        <v-col>
          <v-file-input
            show-size
            label="Select Excel File"
            v-model="files"
            @change="getExcel"
          ></v-file-input>
        </v-col>
        <v-col style="flex-grow: 0">
          <v-btn @click="uploadAction">Upload</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import readXlsxFile from "read-excel-file";
export default {
  data: () => ({
    files: null,
    paramInput: {},
    saleData: [],
    saleList: ["MEA", "DEA", "TEA99", "Amine N-1", "Crude DEA"],
  }),
  methods: {
    getExcel() {
      this.saleList.forEach((s) => {
        readXlsxFile(this.files, { sheet: s }).then((rows) => {
          rows.shift();
          this.saleData.push({
            substance: s,
            volume: rows.map((m) => Math.floor(m[2])),
            nbp: rows.map((m) => Math.floor(m[3])),
          });
          //   for (let i = 1; i < rows.length; i++) {
          //     this.saleData.push({
          //       substance: s,
          //       volume: Math.floor(rows[i][2]),
          //       nbp: rows[i][3],
          //     });
          //   }
        });
      });
      console.log(this.saleData);
      readXlsxFile(this.files, { sheet: "Input" }).then((rows) => {
        for (let i = 1; i < rows.length; i++) {
          if (rows[i][0].includes("EO_feed_ub"))
            this.paramInput["EO_feed_ub"] = rows[i][1];
          else if (rows[i][0].includes("EO_feed_lb"))
            this.paramInput["EO_feed_lb"] = rows[i][1];
          else if (rows[i][0].includes("NH3_ub"))
            this.paramInput["NH3_ub"] = rows[i][1];
          else if (rows[i][0].includes("NH3_lb"))
            this.paramInput["NH3_lb"] = rows[i][1];
          else if (rows[i][0].includes("DEA_ub"))
            this.paramInput["DEA_ub"] = rows[i][1];
          else if (rows[i][0].includes("DEA_lb"))
            this.paramInput["DEA_lb"] = rows[i][1];
          else this.paramInput[rows[i][0]] = rows[i][1];
        }
      });
    },
    uploadAction() {
      console.log({ sale: this.saleData, parameter: this.paramInput });

      fetch(`${process.env.VUE_APP_API_PATH}/input`, {
        method: "POST",
        body: JSON.stringify({
          sale: this.saleData,
          parameter: this.paramInput,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    },
  },
};
</script>
