import Vue from "vue";
import App from "./view/Search";

new Vue({
  el: "#app",
  components: {
    app: App,
  },
});

// import Todo from "./view/Todo.js";
//
// new Vue({
//   el: "#app",
//   components: { Todo },
//   template: `
//     <ul>
//       <todo v-for="todo, i in todoList" v-bind:no="todo.no" v-bind:title="todo.title" v-if="i >= 3"></todo>
//     </ul>
//   `,
//   data: {
//     todoList: [
//       { no: "1", title: "title1" },
//       { no: "2", title: "title2" },
//       { no: "3", title: "title3" },
//       { no: "4", title: "title4" },
//       { no: "5", title: "title5" },
//     ],
//   },
// })
