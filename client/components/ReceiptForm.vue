<template>
  <div>
    <h2>Receipt:</h2>
    <b-form inline>
      <label class="sr-only" for="inline-form-input-name">Name</label>
      <b-input id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" placeholder="Jane Doe"></b-input>

      <label class="sr-only" for="inline-form-input-username">Username</label>
      <b-input-group prepend="💊" class="mb-2 mr-sm-2 mb-sm-0">
        <b-input id="inline-form-input-username" placeholder="Medicine" list="input-list"></b-input>
        <b-form-datalist id="input-list" :options="commonPrescriptions"></b-form-datalist>
      </b-input-group>

      <b-form-spinbutton
        id="demo-sb"
        v-model="amount"
        min="1"
        max="10"
        class="mb-2 mr-sm-2 mb-sm-0"
      ></b-form-spinbutton>

      <b-button variant="primary">Send</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "ReceiptForm",
  data() {
    return {
      amount: 1,
      commonPrescriptions: [
        "XYZ 1mg",
        "FOO 5mg",
        "Grape 2.5mg",
        "PharmX 1mg",
        "PharmX 3mg"
      ]
    };
  }
};
</script>

<style></style>
