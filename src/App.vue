<template>
  <v-app>
    <v-app-bar
      color="teal-darken-4"
      image="https://picsum.photos/1920/1080?random"
    >
      <template v-slot:image>
        <v-img
          gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-app-bar-title>Movies Task</v-app-bar-title>

      <v-spacer></v-spacer>
      <p
        @click="$router.push('/actors')"
        class="mx-2 text-subtitl-2 font-weight-bold cursor-pointer"
      >
        Actors
      </p>

      <p
        @click="$router.push('/add')"
        class="mx-2 text-subtitl-2 font-weight-bold cursor-pointer"
      >
        Add Movie
      </p>

      <p
        @click="$router.push('/')"
        class="mx-2 text-subtitl-2 font-weight-bold cursor-pointer"
      >
        Home
      </p>
    </v-app-bar>
    <v-main class="bg-teal-darken-1">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  methods: {
    async fetchMoviesFirstTime() {
      try {
        const response = await fetch("/movies.json");
        const data = await response.json();
        this.$store.dispatch("updateMoviesInLocalStorage", data);
        this.$store.dispatch("loadMoviesFromLocalStorage");
      } catch (error) {
        console.error("Error loading data:", error);
      }
    },
  },
  async mounted() {
    localStorage.getItem("movies")
      ? this.$store.dispatch("loadMoviesFromLocalStorage")
      : await this.fetchMoviesFirstTime();
  },
};
</script>
<style lang="scss">
.form {
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.fields-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .field {
    flex-basis: 45%;
    input {
      width: 100%;
      height: 50px;
      outline: none;
      border: 1px solid black;
      border-radius: 5px;
      margin: 5px;
      padding: 5px;
    }
  }
  .field-actor {
    flex-basis: 30%;
    input,
    select {
      width: 100%;
      height: 50px;
      outline: none;
      border: 1px solid black;
      border-radius: 5px;
      margin: 5px;
      padding: 5px;
    }
  }
}
</style>
