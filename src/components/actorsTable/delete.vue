<!-- eslint-disable -->

<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-icon v-bind="activatorProps" class="mx-1" color="red"
        >mdi-delete</v-icon
      >
    </template>

    <template v-slot:default="{ isActive }">
      <v-card title="Delete Actor">
        <v-card-text>
          Are You Sure You Want Delete
          <span class="text-h6 font-weight-bold">{{ actor.name }}</span>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="mx-n2"
            text="Clsoe"
            @click="isActive.value = false"
          ></v-btn>
          <v-btn
            text="Delete"
            color="red"
            @click="
              () => {
                (isActive.value = false), deleteActor();
              }
            "
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
export default {
  props: {
    actor: { default: {} },
  },
  methods: {
    deleteActor() {
      this.$store.dispatch("deleteActor", this.actor);
    },
  },
};
</script>
