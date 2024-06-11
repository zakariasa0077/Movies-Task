export const validations = {
  methods: {
    isEmptyValidate(value) {
      // if the field is empty
      if (!value) return "This field is required";

      if (value == "") return "This field is required";

      return true;
    },
  },
};
