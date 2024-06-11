<template>
  <v-container>
    <v-row class="justify-center align-center">
      <v-col
        class="d-flex justify-center align-center mt-md-n4"
        lg="1"
        md="4"
        sm="3"
        cols="12"
      >
        <v-icon @click="cancel" class="mx-2" size="30">mdi-close</v-icon>
        <v-icon @click="$emit('filter', filters)" class="mx-2" size="30"
          >mdi-magnify</v-icon
        >
      </v-col>
      <v-col lg="3" md="4" sm="2" cols="12">
        <v-text-field
          variant="outlined"
          type="text"
          label="name"
          v-model="filters.title"
          clearable
          outline
        ></v-text-field>
      </v-col>
      <v-col lg="3" md="4" sm="2" cols="12">
        <v-text-field
          variant="outlined"
          type="number"
          label="Number of Actors"
          v-model="filters.actorsNumber"
          clearable
          outline
        ></v-text-field>
      </v-col>
      <v-col lg="3" md="4" sm="2" cols="12">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-text-field
              variant="outlined"
              type="number"
              label="Year"
              readonly
              prepend-inner-icon="mdi-calendar-blank-outline"
              v-model="filters.year"
              clearable
              outline
              v-bind="props"
            ></v-text-field>
          </template>
          <div>
            <v-date-picker-years
              class="bg-grey"
              color="primary"
              v-model="filters.year"
              max="2024"
              min="1990"
            ></v-date-picker-years>
          </div>
        </v-menu>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      filters: {},
    };
  },
  methods: {
    cancel() {
      this.filters = {};
      this.$emit("cancel");
    },
  },
};
</script>
