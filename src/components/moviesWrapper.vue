<template>
  <v-container>
    <v-row v-if="movies.length > 0" class="justify-center align-center">
      <v-col
        v-for="(movie, index) in movies"
        :key="index"
        lg="3"
        md="4"
        sm="4"
        cols="12"
      >
        <movieItem :data="movie" />
      </v-col>
    </v-row>
    <v-row class="justify-center" v-else> No Result </v-row>
  </v-container>
</template>

<script>
import movieItem from "./movieItem.vue";
export default {
  props: {
    movies: { default: [] },
  },
  components: {
    movieItem,
  },
};
</script>
