<template>
  <div>
    <h2>Receipt:</h2>
    <b-form @submit.prevent="sendReceipt()">
      <b-form-row>
        <b-col>
          <b-form-group
            id="input-group-1"
            label="Patient name"
            label-for="input-1"
            description="Select a patient from the table to automatically fill this field."
          >
            <b-form-input
              id="input-1"
              type="text"
              required
              disabled=""
              :value="name"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-2"
            label="Insurance ID"
            label-for="input-2"
            description="Select a patient from the table to automatically fill this field."
          >
            <b-form-input
              id="input-2"
              type="text"
              required
              disabled=""
              :value="insuranceId"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-3"
            label="Phone Number"
            label-for="input-2"
            description="Select a patient from the table to automatically fill this field."
          >
            <b-form-input
              id="input-3"
              type="text"
              required
              disabled=""
              :value="phoneNumber"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-col>
          <b-form-group
            id="input-group-3"
            label="Medicines list"
            label-for="input-3"
            description=""
          >
            <b-input-group prepend="💊" class="mb-2 mr-sm-2 mb-sm-0">
              <b-input
                id="inline-form-input-username"
                placeholder="Pick from the list or write one"
                list="input-list"
                v-model="medicine"
                required=""
              ></b-input>
              <b-form-datalist
                id="input-list"
                :options="commonPrescriptions"
              ></b-form-datalist>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col>
          <b-form-group
            id="input-group-3"
            label="Amount"
            label-for="sp-amount"
            description=""
          >
            <b-form-spinbutton
              id="sb-amount"
              v-model="amount"
              min="1"
              max="10"
              class="mb-2 mr-sm-2 mb-sm-0"
            ></b-form-spinbutton>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-col>
          <b-form-textarea
            id="textarea"
            v-model="text"
            placeholder="Enter text message..."
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-col class="text-center">
          <b-button
            class="send-btn"
            type="submit"
            :disabled="isSubmitBtnDisabled"
            variant="primary"
          >
            <b-spinner v-if="isSendingData" small variant="light"></b-spinner>
            Send
          </b-button>
        </b-col>
      </b-form-row>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "ReceiptForm",
  props: ["formData"],
  data() {
    return {
      text: "",
      medicine: "",
      amount: 1,
      isSendingData: false,
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
    phoneNumber() {
      return this.formData?.phoneNumber;
    },
    isSubmitBtnDisabled() {
      return !this.insuranceId || this.isSendingData;
    },
  },
  methods: {
    resetForm() {
      this.$emit("receiptSent");
      this.medicine = "";
      this.text = "";
      this.amount = 1;
    },
    sendReceipt() {
      /*
        TODO: As a doctor sometime I have to prescribe multiple medicines
      */
      this.isSendingData = true;
      fetch("http://localhost:1337/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: this.phoneNumber,
          body: this.text,
          patientFullname: this.name,
          patientInsuranceID: this.insuranceId,
          medications: [
            {
              name: this.medicine,
              amount: this.amount,
            },
          ],
        }),
      })
        .then(() => this.resetForm())
        .then(() => (this.isSendingData = false));
    },
  },
};
</script>

<style>
.send-btn {
  margin: 1em 0;
}
</style>
