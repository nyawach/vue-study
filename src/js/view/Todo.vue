<template lang="pug">
.todo {{ no }} : {{ title }}
</template>

<script lang="babel">
export default {
  props: ["no", "title"]
}
</script>

<style lang="postcss">

</style>
