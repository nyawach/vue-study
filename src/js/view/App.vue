<template lang="pug">
ul(@click="method1")
  todo(v-for="todo, i in todoList" v-bind:no="todo.no" v-bind:title="todo.title" v-if="i >= 3")
</template>

<script lang="babel">
import Todo from "./Todo";

export default {
  data: () => {
    return {
      todoList: [
        { no: "1", title: "title1" },
        { no: "2", title: "title2" },
        { no: "3", title: "title3" },
        { no: "4", title: "title4" },
        { no: "5", title: "title5" },
      ],
    };
  },
  methods: {
    method1() {
      console.log(this.todoList);
    },
    method2() {}
  },
  components: {
    Todo,
  },
}
</script>

<style lang="postcss">

</style>
