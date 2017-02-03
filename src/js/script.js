import Vue from "vue";
import App from "./view/App";
import GAS from "./view/GAS";

new Vue({
  el: "#app",
  components: {
    app: App,
    gas: GAS,
  },
});
