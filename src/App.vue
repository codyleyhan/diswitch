<template>
  <div class="uk-container" id="app">
    <h1>Switches</h1>
    <switch-form @add:switch="addSwitch" />
    <switch-table :switches="switches" @remove-switch="removeSwitch" />
  </div>
</template>

<script>
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import SwitchForm from '@/components/SwitchForm.vue';
import SwitchTable from '@/components/SwitchTable.vue';

UIkit.use(Icons);

export default {
  name: 'App',
  components: {
    SwitchForm,
    SwitchTable,
  },
  data() {
    return {
      switches: [],
    };
  },
  mounted() {
    if (localStorage.switches) {
      this.switches = JSON.parse(localStorage.switches);
    } else {
      this.switches = [];
    }
  },
  watch: {
    switches(newSwitches) {
      localStorage.switches = JSON.stringify(newSwitches);
    },
  },
  methods: {
    addSwitch(s) {
      const lastId = this.switches.length > 0 ? this.switches[this.switches.length - 1].id : 0;
      const id = lastId + 1;
      const newSwitch = { ...s, id };
      this.switches = [...this.switches, newSwitch];
    },
    removeSwitch(id) {
      console.log('HERE', id);
      this.switches = this.switches.filter((s) => s.id !== id);
    },
  },
};
</script>

<style lang="less">
@import "../node_modules/uikit/src/less/uikit.less";
</style>
