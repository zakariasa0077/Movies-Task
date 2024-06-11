<template>
  <v-container :class="$vuetify.display.mdAndUp ? 'w-50' : 'w-100'">
    <movieForm />
  </v-container>
</template>

<script>
import { defineAsyncComponent } from "vue";

const movieForm = defineAsyncComponent(() =>
  import(/* webpackChunkName: "movieForm" */ "@/components/movieForm.vue")
);
export default {
  components: {
    movieForm,
  },
};
</script>
