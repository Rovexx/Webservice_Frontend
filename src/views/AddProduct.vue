<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex md8 elevation-1>
        <!-- Title -->
        <div class="grey darken-3">
          <h1 class="detail font-weight-light white--text">Product toevoegen</h1>
        </div>
        <!-- form -->
        <v-container class="grey lighten-4 category">
          <v-form if="!submitted" ref="form" v-model="valid" lazy-validation>
            <v-text-field v-model="namepost" :rules="nameRules" label="Naam" required></v-text-field>
            <v-text-field v-model="brandpost" :rules="nameRules" label="Merk" required></v-text-field>
            <v-text-field v-model="spoiledpost" :rules="nameRules" label="Over de datum (true | false)" required></v-text-field>

            <v-btn :disabled="!valid" color="primary" v-on:click.prevent="post">Add</v-btn>

            <v-btn color="error" @click="reset">Reset Form</v-btn>
          </v-form>
          <div v-if="submitted">
            <h1>Product toegevoegd!</h1>
          </div>
          <!-- Back button -->
          <v-btn class="grey darken-4" style="cursor: pointer;" v-on:click="navigate()">
            <a class="back">Terug</a>
          </v-btn>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import router from '../router'
import axios from "axios";

export default {
  name: 'ProductDetails',
  data(){
    return{
      valid: true,
      submitted: false,
      namepost: "",
      brandpost: "",
      spoiledpost: "",
      nameRules: [
        v => !!v || "required!"
      ]
    }
  },
  created(){
  },
  methods:{
    post: function() {
      const axios = require("axios");
      var self = this;
      axios
        .post("http://server.arvex.nl/api/products/", {

          name: this.namepost,
          brand: this.brandpost,
          spoiled: this.spoiledpost
        })
        .then(function(response) {
          //console.log(response);
          self.namepost = "";
          self.brandpost = "";
          self.spoiledpost = "";
          self.submitted = true;          
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    reset() {
      this.submitted = false;
      this.$refs.form.reset();
    },
    navigate(){
      router.go(-1);
    }
  }
};
</script>

<style>
.category p{
  display: inline-block;
  margin: 10px 0;
}

.detail{
  margin-left: 10px;
  text-decoration: underline;
  text-decoration-color:rgb(28, 124, 235);
}
</style>
