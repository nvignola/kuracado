<template>
  <div class="container">
    <h1 class="brand">{{ title }}</h1>
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
      title: "Kuracado",
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

<style>
:root {
  --accent: #0099f5;
  --brand: #ffdcdf;
}

.brand {
  background-color: var(--brand);
  color: #5d4b71;
  display: inline-block;
  font-weight: 700;
  text-transform: uppercase;
  padding: 1em;
}

.section {
  margin-top: 3em;
  padding: 0.5em;
}

.title {
  margin-bottom: 1em;
}

.title_accent {
  color: var(--accent);
}
</style>
