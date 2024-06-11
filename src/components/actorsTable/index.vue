<!-- eslint-disable -->
<template>
  <createActor />
  <v-table class="rounded-xl">
    <thead>
      <tr>
        <th v-for="(header, i) in headers" :key="i" class="text-center">
          {{ header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="actor in actors" :key="actor.id" class="text-center">
        <td>{{ actor.id }}</td>
        <td>{{ actor.name }}</td>
        <td>{{ actor.age }}</td>
        <td>
          <div v-for="movie in getActorMovies(actor.id)" :key="movie.id">
            <span class="text-subtitle-2 font-weight-bold">
              {{ movie.title }}</span
            >
            <span class="text-body-2 font-weight-medium"
              >/{{ getRole(actor, movie.id) }}</span
            >
            <span class="text-body-2 font-weight-medium"
              >/{{ getJoinDate(actor, movie.id) }}</span
            >
          </div>
        </td>
        <td class="d-flex align-center justify-center">
          <editActor :actor="actor" />
          <deleteActor :actor="actor" />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
<script>
import { defineAsyncComponent } from "vue";

const createActor = defineAsyncComponent(() =>
  import(/* webpackChunkName: "create" */ "./create.vue")
);
const editActor = defineAsyncComponent(() =>
  import(/* webpackChunkName: "edit" */ "./edit.vue")
);
const deleteActor = defineAsyncComponent(() =>
  import(/* webpackChunkName: "delete" */ "./delete.vue")
);
export default {
  components: {
    createActor,
    editActor,
    deleteActor,
  },
  data() {
    return {
      headers: ["id", "name", "age", "movie/role/join date", "Action"],
      dialogActive: false,
    };
  },
  methods: {
    //get all Actor movies
    getActorMovies(id) {
      return this.$store.state.data.movies.filter((movie) => {
        return movie.actors.some((actor) => {
          return actor.id == id;
        });
      });
    },

    //get role of actor in specific movie
    getRole(actor, id) {
      let result = actor.movies.find((item) => item.id == id);
      if (result) return this.$store.state.data.roles[result.role_id];
      else return "";
    },

    //get join date of actor in specific movie
    getJoinDate(actor, id) {
      let result = this.$store.state.data.movies.find((item) => item.id == id);
      if (result) {
        return result.actors.find((item) => item.id == actor.id).join_date;
      } else return "";
    },
  },
  computed: {
    //get all actors
    actors() {
      return this.$store.state.data.actors;
    },
  },
};
</script>
