<template>
  <div id="switch-form">
    <form class="uk-form-stacked" @submit.prevent="handleSubmit">
      <div class="uk-margin">
        <label class="uk-form-label" for="name">Name</label>
        <div class="uk-form-controls">
          <input
            class="uk-input"
            v-model="smartSwitch.name"
            :class="{ 'uk-form-danger': submitting && invalidName }"
            id="name"
            type="text"
            placeholder="Switch nickname..."
            @focus="clearStatus"
            @keypress="clearStatus"
            ref="name"
          />
        </div>
      </div>

      <div class="uk-margin">
        <label class="uk-form-label" for="hostname">Hostname</label>
        <div class="uk-form-controls">
          <input
            class="uk-input"
            v-model="smartSwitch.hostname"
            id="hostname"
            type="text"
            placeholder="I.E. device.local"
            :class="{ 'uk-form-danger': submitting && invalidHostname }"
            @focus="clearStatus"
          />
        </div>
      </div>

      <button class="uk-button uk-button-primary" :disabled="invalidHostname || invalidName">
        Add</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'switch-form',
  data() {
    return {
      submitting: false,
      error: false,
      success: false,
      smartSwitch: {
        name: '',
        hostname: '',
      },
    };
  },
  methods: {
    handleSubmit() {
      this.submitting = true;
      this.clearStatus();
      if (this.invalidName || this.invalidHostname) {
        this.error = true;
        return;
      }

      this.$emit('add:switch', this.smartSwitch);
      this.$refs.name.focus();
      this.smartSwitch = {
        name: '',
        hostname: '',
      };
      this.error = false;
      this.success = true;
      this.submitting = false;
    },
    clearStatus() {
      this.success = false;
      this.error = true;
    },
  },
  computed: {
    invalidName() {
      return this.smartSwitch.name === '';
    },
    invalidHostname() {
      return this.smartSwitch.hostname === '';
    },
  },
};
</script>

<style scoped>
</style>
