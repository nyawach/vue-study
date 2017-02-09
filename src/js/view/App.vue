<template lang="pug">
table.table.is-middle.is-outline.is-stripe

  thead.box.is-paint-9
    tr.is-left(:data-sort="sortColumnName")
      th(@click="toggleSort('id')" v-bind:data-sort-type="sortColumnName === 'id' ? sortType: false") id
      th(@click="toggleSort('name')" v-bind:data-sort-type="sortColumnName === 'name' ? sortType: false") name
      th(@click="toggleSort('user_name')" v-bind:data-sort-type="sortColumnName === 'user_name' ? sortType: false") user name
      th(@click="toggleSort('age')" v-bind:data-sort-type="sortColumnName === 'age' ? sortType: false") age
      th(@click="toggleSort('created_at')" v-bind:data-sort-type="sortColumnName === 'created_at' ? sortType: false") created_at
      th(@click="toggleSort('updated_at')" v-bind:data-sort-type="sortColumnName === 'updated_at' ? sortType: false") updated_at
  tbody
    tr(v-for="user in userList")
      td.user__id {{ user.id }}
      td.user__name {{ user.name }}
      td.user__user-name {{ user.user_name }}
      td.user__age {{ user.age }}
      td.user__created-at {{ user.created_at }}
      td.user__updated-at {{ user.updated_at }}
</template>

<script lang="babel">
export default {
  data() {
    return {
      userList: require("../lib/data"),
      sortColumnName: "id",
      sortType: "asc",
    };
  },
  methods: {
    toggleSort(colName) {
      if(this.sortType === "asc") {
        this.userList = this.userList.sort((a, b) => {
          if(b[colName] > a[colName]) return 1;
          else if(b[colName] < a[colName]) return -1;
          if(b[colName].length > a[colName].length) return 1;
          else if(b[colName].length < a[colName].length) return -1;
        });
        this.sortType = "desc";
      }
      else {
        this.userList = this.userList.sort((a, b) => {
          if(b[colName] > a[colName]) return -1;
          else if(b[colName] < a[colName]) return 1;
          if(b[colName].length > a[colName].length) return -1;
          else if(b[colName].length < a[colName].length) return 1;
        });
        this.sortType = "asc";
      }
      this.sortColumnName = colName;
    }
  }
}
</script>

<style lang="postcss" scoped>
// なぜかここでimportしないとwebフォントが反映されない...?
@import 'https://cdn.jsdelivr.net/musubii/1.2.0/css/musubii.min.css';
th:hover {
}
</style>
