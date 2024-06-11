<template>
  <v-container :class="$vuetify.display.mdAndUp ? 'w-50' : 'w-100'">
    <div class="text-center">
      <p class="my-2">
        Name:<span class="text-h6 font-weight-bold mx-2">{{
          movie.title
        }}</span>
      </p>
      <p class="my-2">
        Year:<span class="text-h6 font-weight-bold mx-2">{{ movie.year }}</span>
      </p>
    </div>
    <div class="my-2">
      <p class="text-center font-weight-bold text-h6 my-4">Actors</p>
      <v-row class="justify-center align-center">
        <v-col
          v-for="actor in actors"
          :key="actor.id"
          lg="4"
          md="6"
          sm="6"
          cols="12"
        >
          <v-card class="mx-auto rounded-lg pa-2" max-width="344" hover>
            <v-card-item>
              <v-card-title class="text-body-1">
                {{ actor.name }}
              </v-card-title>

              <v-card-subtitle> age :{{ actor.age }} </v-card-subtitle>
              <v-card-subtitle>
                join date :{{ getJoinDate(actor.id) }} </v-card-subtitle
              ><v-card-subtitle> role :{{ getRole(actor) }} </v-card-subtitle>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
<script>
export default {
  methods: {
    getRole(actor) {
      let result = actor.movies.find((item) => item.id == this.movie.id);
      return this.$store.state.data.roles[result.role_id];
    },
    getJoinDate(actorId) {
      let result = this.$store.state.data.movies.find(
        (item) => item.id == this.id
      );
      if (result) {
        return result.actors.find((item) => item.id == actorId).join_date;
      } else return "";
    },
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    movie() {
      return this.$store.state.data.movies.find((item) => item.id == this.id);
    },
    actors() {
      return this.$store.state.data.actors.filter((actor) => {
        return actor.movies.some((movie) => {
          return movie.id == this.movie.id;
        });
      });
    },
  },
};
</script>
