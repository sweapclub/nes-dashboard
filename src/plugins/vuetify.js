import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#065BAA",
        secondary: "#00AEEF",
        accent: "#ED1C24",
        "text-primary": "#065BAA",
        "text-secondary": "#00AEEF",
        "text-accent": "#ED1C24",
      },
    },
  },
});
