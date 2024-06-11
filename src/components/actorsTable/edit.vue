<!-- eslint-disable -->
<template>
  <v-dialog v-model="isActive" max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-icon v-bind="activatorProps" class="mx-1" color="success"
        >mdi-pencil</v-icon
      >
    </template>
    <template v-slot:default="{}">
      <Form @submit="submit" class="form ma-auto pa-2 bg-white rounded-lg">
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
          <button class="bg-teal-darken-1 rounded-lg pa-2 px-6">Edit</button>
          <v-btn text="Close" @click="isActive = false"></v-btn>
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
  props: {
    actor: { default: false },
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      data: {
        name: null,
        age: null,
      },
      isActive: false,
    };
  },
  methods: {
    submit() {
      this.$store.dispatch("editActor", this.data);
      this.isActive = false;
    },
  },
  mounted() {
    this.data = { ...this.actor };
  },
};
</script>
