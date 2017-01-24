import Vue from "vue";

module.exports = Vue.component("todo", {
  template: `<div class="todo">{{ no }} : {{ title }}</div>`,
  props: ["no", "title"],
  styles: {
    div: {
      fontSize: "28px",
    }
  }
});
