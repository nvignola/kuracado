<template>
  <div class="container">Hello {{title}}</div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      title: "Kuracado"
    };
  }
});
</script>

<style scoped>
.container {
  color: green;
}
</style>