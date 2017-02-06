<template lang="pug">
table.app
  tr(:data-sort="sortColumnName")
    th(@click="toggleSort('id')" v-bind:data-sort-type="sortColumnName === 'id' ? sortType: false") id
    th(@click="toggleSort('name')" v-bind:data-sort-type="sortColumnName === 'name' ? sortType: false") name
    th(@click="toggleSort('user_name')" v-bind:data-sort-type="sortColumnName === 'user_name' ? sortType: false") user name
    th(@click="toggleSort('age')" v-bind:data-sort-type="sortColumnName === 'age' ? sortType: false") age
    th(@click="toggleSort('created_at')" v-bind:data-sort-type="sortColumnName === 'created_at' ? sortType: false") created_at
    th(@click="toggleSort('updated_at')" v-bind:data-sort-type="sortColumnName === 'updated_at' ? sortType: false") updated_at
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
          return b[colName] - a[colName];
        });
        this.sortType = "desc";
      }
      else {
        this.userList = this.userList.sort((a, b) => {
          return a[colName] - b[colName];
        });
        this.sortType = "asc";
      }
      this.sortColumnName = colName;
    }
  }
}
</script>

<style lang="postcss" scoped>
</style>
