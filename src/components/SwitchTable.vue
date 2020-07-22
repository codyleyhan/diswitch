<template>
  <div id="switch-table">
    <table class="uk-table uk-table-striped">
      <thead>
        <tr>
          <th>Nickname</th>
          <th>Hostname</th>
          <th>Toggle</th>
        </tr>
      </thead>
      <tbody>
        <switch-row :s="s" v-for="s in switches" :key="s.id" />
      </tbody>
    </table>
  </div>
</template>

<script>
import SwitchRow from '@/components/SwitchRow.vue';

export default {
  name: 'switch-table',
  props: {
    switches: Array,
  },
  components: {
    SwitchRow,
  },
};
</script>

<style scoped></style>
