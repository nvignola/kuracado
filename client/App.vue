<template>
  <div class="container">
    <h1>{{ title }}</h1>
    <patients-table @patientSelected="updateFormData"></patients-table>
    <receipt-form
      :formData="formData"
      @receiptSent="resetData()"
    ></receipt-form>
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
      formData: null,
    };
  },
  methods: {
    updateFormData(record) {
      this.formData = record;
    },
    resetData() {
      this.formData = null;
    },
  },
});
</script>

<style scoped></style>
