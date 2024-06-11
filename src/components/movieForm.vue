<template>
  <p class="text-h6 text-center font-weight-bold my-4">Add Movie</p>
  <Form class="form ma-auto pa-2 bg-white rounded-lg" @submit="onSubmit">
    <strong class="mx-2">Movie Detailes :</strong>
    <div class="fields-container d-flex justify-space-around">
      <div class="field ma-1">
        <Field
          name="movie.title"
          v-model="movie.title"
          :rules="isEmptyValidate"
          placeholder="Title*"
        />
        <v-expand-transition>
          <ErrorMessage class="d-block mx-auto text-red" name="movie.title" />
        </v-expand-transition>
      </div>
      <div class="field ma-1">
        <Field
          name="movie.description"
          v-model="movie.description"
          placeholder="Description"
        />
      </div>
      <v-menu>
        <template v-slot:activator="{ props }">
          <div class="field ma-1">
            <Field
              name="movie.year"
              v-model="movie.year"
              :rules="isEmptyValidate"
              placeholder="Year*"
              v-bind="props"
              readonly
            />
            <v-expand-transition>
              <ErrorMessage
                class="d-block mx-auto text-red"
                name="movie.year"
              />
            </v-expand-transition>
          </div>
        </template>
        <v-date-picker-years
          class="bg-grey"
          color="primary"
          v-model="movie.year"
          max="2024"
          min="1990"
          width="100"
        ></v-date-picker-years>
      </v-menu>
    </div>
    <strong class="mx-2">Actors in Movie :</strong>
    <div
      v-for="(actor, index) in movie.actors"
      :key="index"
      class="fields-container d-flex justify-space-around align-center"
    >
      <div class="field-actor ma-1">
        <Field
          :name="`movie.actors[${index}].id`"
          v-model="actor.id"
          :rules="isEmptyValidate"
          placeholder="actor*"
          as="select"
        >
          <option value="" disabled>Select Actor*</option>
          <option
            v-for="actorOption in availableActors(index)"
            :key="actorOption.id"
            :value="actorOption.id"
          >
            {{ actorOption.name }}
          </option>
        </Field>
        <v-expand-transition>
          <ErrorMessage
            class="d-block mx-auto text-red"
            :name="`movie.actors[${index}].id`"
          />
        </v-expand-transition>
      </div>
      <div class="field-actor ma-1">
        <Field
          :name="`movie.actors[${index}].role_id`"
          v-model="actor.role_id"
          :rules="isEmptyValidate"
          as="select"
          placeholder="role*"
        >
          <option value="" disabled>Select Role*</option>
          <option v-for="(value, key) in roles" :key="key" :value="key">
            {{ value }}
          </option>
        </Field>
        <v-expand-transition>
          <ErrorMessage
            class="d-block mx-auto text-red"
            :name="`movie.actors[${index}].role_id`"
          />
        </v-expand-transition>
      </div>
      <v-menu>
        <template v-slot:activator="{ props }">
          <div class="field-actor ma-1">
            <Field
              :name="`movie.actors[${index}].join_date`"
              v-model="actor.join_date"
              :rules="isEmptyValidate"
              placeholder="join date*"
              v-bind="props"
            />

            <v-expand-transition>
              <ErrorMessage
                class="d-block mx-auto text-red"
                :name="`movie.actors[${index}].join_date`"
              />
            </v-expand-transition>
          </div>
        </template>
        <v-date-picker
          v-model="actor.join_date"
          color="primary"
        ></v-date-picker>
      </v-menu>
      <v-icon @click.stop.prevent="deleteActorField(index)" color="red"
        >mdi-delete</v-icon
      >
    </div>
    <div class="w-100 d-flex justify-center align-center">
      <button
        @click.stop.prevent="addActorField"
        class="bg-teal-darken-1 rounded-lg pa-2"
      >
        Add Actor <v-icon>mdi-plus</v-icon>
      </button>
    </div>
    <div class="w-100 d-flex justify-center align-center mt-8 mb-4">
      <button class="rounded-lg text-white pa-2 bg-teal-darken-1">
        Submit
      </button>
    </div>
  </Form>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { validations } from "../mxixins/validations";
export default {
  mixins: [validations],
  props: {
    data: {
      default: null,
    },
  },
  data() {
    return {
      movie: {
        title: "",
        year: "",
        description: "",
        actors: [
          {
            id: null,
            role_id: null,
          },
        ],
      },
      actorsIdsForDelete: [],
    };
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  methods: {
    //submit on two case crate or edit
    onSubmit(values) {
      if (this.data) {
        values.movie.id = this.data.id;
        this.$store.dispatch("editMovie", {
          movie: values.movie,
          actorsIds: this.actorsIdsForDelete,
        });
      } else {
        values.movie.id = this.getLastMovieId + 1;
        this.$store.dispatch("addMovie", values.movie);
      }
      this.$store.dispatch("addMovieToActor", values.movie);
      this.$router.push("/");
    },

    //initialize new actor field
    addActorField() {
      this.movie.actors.push({
        id: null,
        role_id: null,
      });
    },

    //
    deleteActorField(index) {
      this.actorsIdsForDelete.push(this.movie.actors[index].id);
      this.movie.actors.splice(index, 1);
    },

    //this for check if actor is assign already in this movie
    availableActors(index) {
      const selectedActorIds = this.movie.actors
        .slice(0, index)
        .map((actor) => actor.id);
      return this.$store.state.data.actors.filter(
        (actor) => !selectedActorIds.includes(actor.id)
      );
    },
  },
  computed: {
    //for assign id to new movie
    getLastMovieId() {
      return this.$store.state.data.movies[
        this.$store.state.data.movies.length - 1
      ].id;
    },
    //
    getMovie() {
      return this.data
        ? this.$store.state.data.movies.find((item) => item.id == this.data.id)
            .actors
        : [];
    },

    //
    roles() {
      return this.$store.state.data.roles;
    },
  },
  created() {
    // if i in edit mode i will fill data
    if (this.data) {
      this.movie = JSON.parse(JSON.stringify(this.data));
    }
  },
};
</script>
