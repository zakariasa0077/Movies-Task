<!-- eslint-disable -->
<template>
  <v-container class="h-100">
    <actorsTable />
  </v-container>
</template>
<script>
import { defineAsyncComponent } from "vue";

const actorsTable = defineAsyncComponent(() =>
  import(/* webpackChunkName: "actorsTable" */ "../components/actorsTable/")
);
export default {
  components: {
    actorsTable,
  },
};
</script>
