<!-- eslint-disable -->
<template>
  <v-dialog v-model="isActive" max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <div class="w-100 d-flex justify-center my-2">
        <VBtn
          @click="isActive = true"
          v-bind="activatorProps"
          color=" white text-teal-darken-1"
          >Add Actor</VBtn
        >
      </div>
    </template>
    <template v-slot:default="{}">
      <Form @submit="submit" class="form ma-auto pa-4 bg-white rounded-lg">
        <strong class="mx-2">Add Actor</strong>
        <v-card-text>
          <div class="fields-container d-flex justify-space-around">
            <div class="field ma-1">
              <Field
                name="data.name"
                v-model="data.name"
                placeholder="Name*"
                :rules="isEmptyValidate"
              />
              <v-expand-transition>
                <ErrorMessage
                  class="d-block mx-auto text-red"
                  name="data.name"
                />
              </v-expand-transition>
            </div>
            <div class="field ma-1">
              <Field
                name="data.age"
                v-model="data.age"
                type="number"
                placeholder="Age*"
                :rules="isEmptyValidate"
              />
              <v-expand-transition>
                <ErrorMessage
                  class="d-block mx-auto text-red"
                  name="data.age"
                />
              </v-expand-transition>
            </div>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <button class="bg-teal-darken-1 rounded-lg pa-2 px-6">Add</button>
          <v-btn @click="isActive = false" text="Close"></v-btn>
        </v-card-actions>
      </Form>
    </template>
  </v-dialog>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import { validations } from "@/mxixins/validations";
export default {
  mixins: [validations],
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      data: {
        name: "",
        age: "",
      },
      isActive: false,
    };
  },
  methods: {
    submit() {
      this.data.id = this.getLastActorId + 1;
      this.data.movies = [];
      this.$store.dispatch("addActor", this.data);
      this.isActive = false;
    },
  },
  computed: {
    //for assign id to new actor
    getLastActorId() {
      return this.$store.state.data.actors[
        this.$store.state.data.actors.length - 1
      ].id;
    },
  },
  watch: {
    isActive(val) {
      if (!val) {
        this.data = {
          name: "",
          age: "",
        };
      }
    },
  },
};
</script>
