<template>
  <tr>
    <td class="uk-table-link">
      <a class="uk-link-reset" :href="'http://' + s.hostname">{{ s.hostname }}</a>
    </td>
    <td>{{ s.name }}</td>
    <td>
      <div v-if="toggling" uk-spinner></div>
      <button v-else class="uk-button"
      :class="{ 'uk-button-danger': !unreachable && !on, 'uk-button-primary': !unreachable && on }"
      @click="toggle"
      :disabled="unreachable">Toggle</button>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'switch-row',
  props: {
    s: Object,
  },
  data() {
    return {
      on: false,
      unreachable: true,
      toggling: false,
      interval: null,
    };
  },
  mounted() {
    this.getStatus();
    this.interval = setInterval(() => {
      this.getStatus();
    }, 15000);
  },
  beforeDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  },
  methods: {
    async getStatus() {
      try {
        const res = await fetch(`http://${this.s.hostname}/cm?cmnd=Power`);
        const data = await res.json();
        this.handleResponse(data);
      } catch (err) {
        this.unreachable = true;
      }
    },
    handleResponse(data) {
      if (data.POWER === 'ON') {
        this.on = true;
        this.unreachable = false;
      } else if (data.POWER === 'OFF') {
        this.on = false;
        this.unreachable = false;
      }
    },
    async toggle() {
      try {
        this.toggling = true;
        const res = await fetch(`http://${this.s.hostname}/cm?cmnd=Power%20TOGGLE`);
        const data = await res.json();
        this.handleResponse(data);
      } catch (err) {
        this.unreachable = true;
      }
      this.toggling = false;
    },
  },
};
</script>

<style scoped></style>
