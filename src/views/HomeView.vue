<template>
  <div class="h-100">
    <moviesFilter @filter="filters = $event" @cancel="filters = null" />
    <moviesWrapper :movies="filteredMovies" />
  </div>
</template>

<script>
import { defineAsyncComponent, defineComponent } from "vue";

const moviesWrapper = defineAsyncComponent(() =>
  import(
    /* webpackChunkName: "moviesWrapper" */ "../components/moviesWrapper.vue"
  )
);
const moviesFilter = defineAsyncComponent(() =>
  import(
    /* webpackChunkName: "moviesFilter" */ "../components/moviesFilter.vue"
  )
);

export default defineComponent({
  name: "HomeView",

  data() {
    return {
      filters: null,
    };
  },

  components: {
    moviesWrapper,
    moviesFilter,
  },
  methods: {
    filterMovies() {
      return this.$store.state.data.movies
        .filter((item) => {
          if (this.filters.title) {
            return item.title
              .toLowerCase()
              .includes(this.filters.title.toLowerCase());
          }
          return true;
        })
        .filter((item) => {
          if (this.filters.year) {
            return item.year == this.filters.year;
          }
          return true;
        })
        .filter((item) => {
          if (this.filters.actorsNumber) {
            return item.actors.length == this.filters.actorsNumber;
          }
          return true;
        });
    },
  },
  computed: {
    filteredMovies() {
      return this.filters ? this.filterMovies() : this.movies;
    },
    movies() {
      return this.$store.getters.getMovies;
    },
  },
});
</script>
