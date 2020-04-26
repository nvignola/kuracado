<template>
  <div class="section">
    <h4 class="title title_accent">Patients list</h4>
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
          <li v-for="(mess, index) in data.value" :key="index" class="message">
            <span class="message--time d-block text-muted font-weight-light">
              {{ new Date(mess.receivedAt).toLocaleString() }}
            </span>
            <p class="message--text">{{ mess.textMessage }}</p>
          </li>
        </ul>
      </template>
      <template v-slot:cell(receiptLink)="data">
        <a v-if="data.value" :href="data.value" target="_blank"
          ><b-icon icon="file-earmark-plus" class="text-success"></b-icon
        ></a>
        <b-icon icon="file-earmark-minus" class="text-danger" v-else></b-icon>
      </template>
      <template v-slot:cell(isPackageSent)="data">
        <span v-if="!data.value">❌⃖ 🚚</span>
        <span v-else> ✅⃖ 🚚</span>
      </template>
    </b-table>
    <div v-if="!this.patients.length">
      <p
        class="text-center text-secondary font-weight-light message-no-results"
      >
        <b-icon-info-circle></b-icon-info-circle>
        At the moment there are no messages
      </p>
    </div>
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
        "isPackageSent",
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
table {
  color: var(--gray-dark);
}

ul {
  list-style-type: none;
  padding: 0;
}

.message--time {
  font-size: 70%;
}

.message--text {
  font-size: 85%;
  line-height: 1.2;
  max-width: 250px;
}

.message-no-results {
  font-size: 90%;
}
</style>
