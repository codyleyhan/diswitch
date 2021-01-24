<template>
  <div class="uk-card uk-card-default uk-width-1-2@m uk-margin uk-box-shadow-small">
    <div class="uk-card-header">
      <div
        class="uk-card-badge uk-label"
        :class="[badgeColor]"
        >
        {{ currentSwitchState }}
    </div>
      <h3 class="uk-card-title">{{ s.name }}</h3>
    </div>
    <div class="uk-card-body">
      <p class="uk-text-meta">Hostname: {{ s.hostname }}</p>
      <div class="uk-button-group">
    <button
    class="uk-button uk-button-default toggle-button"
        @click="toggle"
        :disabled="unreachable || toggling"
    >
        Toggle
        </button>
    <button class="uk-button uk-button-danger" @click="remove">Remove</button>
</div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'switch-card',
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
  computed: {
    currentSwitchState() {
      if (this.unreachable) {
        return 'UNKNOWN';
      }
      return this.on ? 'ON' : 'OFF';
    },
    badgeColor() {
      switch (this.currentSwitchState) {
        case 'ON':
          return 'uk-label-success';
        case 'OFF':
          return 'uk-label-danger';
        default:
          return 'uk-label-warning';
      }
    },
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
        const res = await fetch(
          `http://${this.s.hostname}/cm?cmnd=Power%20TOGGLE`,
        );
        const data = await res.json();
        this.handleResponse(data);
      } catch (err) {
        this.unreachable = true;
      }
      this.toggling = false;
    },
    remove() {
      this.$emit('remove:switch', this.$props.s.id);
    },
  },
};
</script>

<style scoped>
.uk-card-body {
    background-color: white;
}

.toggle-button {
    margin-right: 20px;
}
</style>
