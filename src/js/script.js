import Vue from "vue";
import Markdown from "./view/Markdown/index";

new Vue({
  el: ".wrapper",
  components: {
    markdown: Markdown,
  },
});
