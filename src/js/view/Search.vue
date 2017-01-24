<template lang="pug">
.search
  input(type="search" placeholder="Search" v-model="searchText")
  ul
    li(v-for="person in filteredPeople") {{person.firstName}} {{person.lastName}}
</template>

<script lang="babel">

import { fuzzy_match } from "../lib/fuzzy_match_simple";

export default {
  data: () => {
    return {
      people: [
        { firstName: 'Naohiro', lastName: 'Nakajima' },
        { firstName: 'Kazuhito', lastName: 'Hokamura' },
        { firstName: 'Takeshi',  lastName: 'Takatsudo' },
        { firstName: 'Akihiro',  lastName: 'Oyamada' },
        { firstName: 'Kazunori',  lastName: 'Tokuda' },
        { firstName: 'Yukihisa',  lastName: 'Yamada' },
      ],
      searchText: "",
    };
  },
  methods: {},
  computed: {
    filteredPeople() {
      const filteredPeople = this.people.filter(person => {
        const fullName = `${person.firstName}${person.lastName}`.toLowerCase();
        return fuzzy_match(this.searchText, fullName)[0];
      });
      return filteredPeople.sort((a,b) => {
        const fullNameA = `${a.firstName}${a.lastName}`.toLowerCase();
        const matchRateA = fuzzy_match(this.searchText, fullNameA)[1];
        const fullNameB = `${b.firstName}${b.lastName}`.toLowerCase();
        const matchRateB = fuzzy_match(this.searchText, fullNameB)[1];
        return matchRateA > matchRateB;
      });
    },
  },
}
</script>

<style lang="postcss">

</style>
