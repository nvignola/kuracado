<template>
  <div>
    <h2>Receipt:</h2>
    <b-form inline>
      <label class="sr-only" for="inline-form-input-name">Name</label>
      <b-input
        id="inline-form-input-name"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Select a patient from the list..."
        disabled=""
        :value="name"
      ></b-input>

      <label class="sr-only" for="insuranceId">Insurance ID</label>
      <b-input
        id="insuranceId"
        class="mb-2 mr-sm-2 mb-sm-0"
        placeholder="Select a patient from the list..."
        disabled=""
        :value="insuranceId"
      ></b-input>

      <label class="sr-only" for="inline-form-input-username">Username</label>
      <b-input-group prepend="💊" class="mb-2 mr-sm-2 mb-sm-0">
        <b-input
          id="inline-form-input-username"
          placeholder="Medicine"
          list="input-list"
          v-model="medicine"
        ></b-input>
        <b-form-datalist
          id="input-list"
          :options="commonPrescriptions"
        ></b-form-datalist>
      </b-input-group>

      <b-form-spinbutton
        id="demo-sb"
        v-model="amount"
        min="1"
        max="10"
        class="mb-2 mr-sm-2 mb-sm-0"
      ></b-form-spinbutton>

      <b-button
        @click="sendReceipt()"
        :disabled="!this.insuranceId"
        variant="primary"
        >Send</b-button
      >
    </b-form>
  </div>
</template>

<script>
export default {
  name: "ReceiptForm",
  props: ["formData"],
  data() {
    return {
      medicine: "",
      amount: 1,
      commonPrescriptions: [
        "XYZ 1mg",
        "FOO 5mg",
        "Grape 2.5mg",
        "PharmX 1mg",
        "PharmX 3mg",
      ],
    };
  },
  computed: {
    name() {
      return this.formData?.name;
    },
    insuranceId() {
      return this.formData?.insuranceId;
    },
  },
  methods: {
    sendReceipt() {
      /*
        TODO: As a doctor sometime I have to prescribe multiple medicines
      */
      fetch("http://localhost:1337/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientFullname: this.name,
          patientInsuranceID: this.insuranceId,
          medications: [
            {
              name: this.medicine,
              amount: this.amount,
            },
          ],
        }),
      });
    },
  },
};
</script>

<style></style>
