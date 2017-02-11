<template lang="pug">
table.table.is-middle.is-outline.is-stripe

  thead.box.is-paint-9
    tr.is-left(:data-sort="sortColumnName")
      th(@click="toggleSort('id', $event)" v-bind:data-sort-type="sortColumnName === 'id' ? sortType: false") id
      th(@click="toggleSort('name', $event)" v-bind:data-sort-type="sortColumnName === 'name' ? sortType: false") name
      th(@click="toggleSort('user_name', $event)" v-bind:data-sort-type="sortColumnName === 'user_name' ? sortType: false") user name
      th(@click="toggleSort('age', $event)" v-bind:data-sort-type="sortColumnName === 'age' ? sortType: false") age
      th(@click="toggleSort('created_at', $event)" v-bind:data-sort-type="sortColumnName === 'created_at' ? sortType: false") created_at
      th(@click="toggleSort('updated_at', $event)" v-bind:data-sort-type="sortColumnName === 'updated_at' ? sortType: false") updated_at
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
    toggleSort(colName, evt) {
      const isOtherSortType = !evt.currentTarget.getAttribute("data-sort-type");
      if(isOtherSortType) {
        this.sortAscBy(colName);
        this.sortColumnName = colName;
        return;
      }
      if(this.sortType === "asc") this.sortAscBy(colName);
      else this.sortDescBy(colName);
      this.sortColumnName = colName;
    },
    sortAscBy(colName) {
      this.userList = this.userList.sort((a, b) => {
        if(b[colName] > a[colName]) return 1;
        else if(b[colName] < a[colName]) return -1;
        if(b[colName].length > a[colName].length) return 1;
        else if(b[colName].length < a[colName].length) return -1;
      });
      this.sortType = "desc";
    },
    sortDescBy(colName) {
      this.userList = this.userList.sort((a, b) => {
        if(b[colName] > a[colName]) return -1;
        else if(b[colName] < a[colName]) return 1;
        if(b[colName].length > a[colName].length) return -1;
        else if(b[colName].length < a[colName].length) return 1;
      });
      this.sortType = "asc";
    },
  },
}
</script>

<style lang="postcss" scoped>
  // なぜかここでimportしないとwebフォントが反映されない...?
  @import 'https://cdn.jsdelivr.net/musubii/1.2.0/css/musubii.min.css';
  th {
    position: relative;
    &:hover {
      background-color: #09795d;
    }
    &:after {
      position: absolute;
      display: block;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
    &[data-sort-type="asc"]:after {
      content: "↓";
    }
    &[data-sort-type="desc"]:after {
      content: "↑";
    }
  }
</style>
