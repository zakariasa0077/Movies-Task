<template>
  <v-fade-transition>
    <v-card
      @click="$router.push(`/movie/${data.id}`)"
      class="mx-auto rounded-lg py-1"
      max-width="344"
      hover
    >
      <v-card-item>
        <v-card-title class="text-body-1 d-flex justify-space-between">
          <p class="w-75">{{ data.title }}</p>
          <v-icon
            @click.stop.prevent="$router.push(`/edit/${data.id}`)"
            color="green"
            >mdi-pencil</v-icon
          ></v-card-title
        >
        <v-card-title class="text-body-2 font-weight-light">
          Year :{{ data.year }}
        </v-card-title>

        <v-card-subtitle v-if="data.description"
          >Description: {{ data.description }}</v-card-subtitle
        >
      </v-card-item>

      <v-card-text> Number Of Actors :{{ data.actors.length }} </v-card-text>
    </v-card>
  </v-fade-transition>
</template>
<script>
export default {
  props: {
    data: { default: {} },
  },
};
</script>
