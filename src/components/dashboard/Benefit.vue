<template></template>

<script>
export default {
  mounted() {},
  methods: {
    getBenefit() {
      fetch(
        `${process.env.VUE_APP_API_PATH}/process/benefit/2021-12-01 19:00:00/?method=eo`
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    },
  },
};
</script>
