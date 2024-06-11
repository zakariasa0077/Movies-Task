<template>
  <v-container :class="$vuetify.display.mdAndUp ? 'w-50' : 'w-100'">
    <movieForm :data="movie" />
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
  methods: {
    onSubmit() {
      console.log("Submitted");
    },
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    movie() {
      return this.$store.state.data.movies.find((item) => item.id == this.id);
    },
  },
};
</script>
