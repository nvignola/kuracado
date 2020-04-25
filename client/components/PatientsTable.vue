<template>
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
          {{ mess.text }}
        </li>
      </ul>
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
        "name",
        "insuranceId",
        // A column that needs custom formatting
        "messages",
      ],
      patients: [],
    };
  },
  methods: {},
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
