<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <patients-table></patients-table>
    <receipt-form></receipt-form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PatientsTable from "./components/PatientsTable.vue";
import ReceiptForm from "./components/ReceiptForm.vue";

export default Vue.extend({
  name: "Kuracado",
  components: {
    "patients-table": PatientsTable,
    "receipt-form": ReceiptForm,
  },
  data() {
    return {
      title: "Kuracado 💊",
    };
  },
});
</script>

<style scoped></style>
