<template>
  <b-table hover :items="patients" :fields="fields">
    <template v-slot:cell(phoneNumber)="data">
      <h1>{{ data.value }}</h1>
    </template>
    <!-- A virtual composite column -->
    <template v-slot:cell(messages)="data">
      <ul>
        <li v-for="(mess, index) in data.value" :key="index">
          <span class="text-mute">{{
            new Date(mess.receivedAt).toLocaleTimeString()
          }}</span>
          {{ mess.text }}
        </li>
      </ul>
    </template>
    <template v-slot:cell(reply)="data">
      <h5>{{ data.item.name }}</h5>
      <b-button @click="replyTo(data.item.phoneNumber)"
        ><b-icon-reply
      /></b-button>
    </template>
  </b-table>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      fields: [
        // A virtual column that doesn't exist in items
        "phoneNumber",
        // A column that needs custom formatting
        "messages",
        { key: "reply", label: "Reply", colType: "button" },
      ],
      patients: [],
    };
  },
  methods: {
    replyTo(phoneNumber) {
      fetch("http://localhost:1337/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: phoneNumber,
          body: "You receitp has been sent to pharmacy X",
        }),
      });
    },
  },
  mounted() {
    fetch(`http://localhost:1337/all-messages`)
      .then((response) => response.json())
      .then(({ data }) => {
        this.patients = Object.keys(data).map((key) => ({
          phoneNumber: key,
          ...data[key],
        }));
      });
  },
});
</script>

<style scoped>
.container {
  color: green;
}
</style>
