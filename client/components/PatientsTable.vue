<template>
  <div>
    <b-table
      hover
      :items="patients"
      :fields="fields"
      @row-clicked="(record) => $emit('patientSelected', record)"
    >
      <template v-slot:cell(phoneNumber)="data">
        {{ data.value }}
      </template>
      <!-- A virtual composite column -->
      <template v-slot:cell(messages)="data">
        <ul>
          <li v-for="(mess, index) in data.value" :key="index">
            <span class="text-mute">{{
              new Date(mess.receivedAt).toLocaleTimeString()
            }}</span>
            {{ mess.textMessage }}
          </li>
        </ul>
      </template>
      <template v-slot:cell(receiptLink)="data">
        {{ data.value }}
      </template>
    </b-table>
    <!-- Temporary dev commands -->
    <button @click="startPoll">start poll</button>
    <button @click="stopPoll">stop poll</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import PollMessages from "./utils/pollMessages";

const Polling = new PollMessages(process.env.SERVER_URL);

function cbPoll(data) {
  console.log("setting data");
  this.patients = Object.keys(data).map((key) => ({
    phoneNumber: key,
    ...data[key],
  }));
}

export default Vue.extend({
  data() {
    return {
      fields: [
        // A virtual column that doesn't exist in items
        "phoneNumber",
        "name",
        "insuranceId",
        // A column that needs custom formatting
        "messages",
        "receiptLink",
      ],
      patients: [],
    };
  },
  computed: {
    pollingCallback() {
      return cbPoll.bind(this);
    },
  },
  methods: {
    stopPoll() {
      Polling.disablePoll();
    },
    startPoll() {
      // const callbackPolling = cbPoll.bind(this);
      Polling.activatePoll(this.pollingCallback);
    },
  },
  mounted() {
    // const callbackPolling = cbPoll.bind(this);
    fetch(`http://localhost:1337/all-messages`)
      .then((response) => response.json())
      .then(({ data }) => {
        this.patients = Object.keys(data).map((key) => ({
          phoneNumber: key,
          ...data[key],
        }));
      });
    // .then(() => {
    //   Polling.activatePoll(callbackPolling);
    // });
  },
});
</script>

<style scoped>
.container {
  color: green;
}
</style>
