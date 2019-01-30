<template>
  <v-container>
    <v-form if="!submitted" ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="name" :rules="nameRules" label="Name" required></v-text-field>

      <v-text-field v-model="brand" :rules="nameRules" label="Brand" required></v-text-field>

      <v-text-field v-model="spoiled" :rules="nameRules" label="Spoiled" required></v-text-field>

      <v-btn :disabled="!valid" color="success" @click="validate">Validate</v-btn>
      <v-btn :disabled="!valid" color="primary" v-on:click.prevent="post">Add</v-btn>

      <v-btn color="error" @click="reset">Reset Form</v-btn>
      <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>
    </v-form>
    <div v-if="submitted">Thanks for posting a product!</div>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    brand: "",
    spoiled: "",
    nameRules: [
      v => !!v || "required!",
    ],
    submitted: false
  }),
  
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    post: function() {
      const axios = require("axios");
      axios
        .post("http://server.arvex.nl/api/products", {
          name: this.namepost,
          brand: this.brandpost,
          spoiled: this.spoiledpost
        })
        // .then(function(response) {
        //   console.log(response);
        // })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style>
</style>
