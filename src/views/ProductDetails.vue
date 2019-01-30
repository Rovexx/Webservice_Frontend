<template>
  <v-container>
    <!-- desktop -->
    <v-layout>
      <!-- product info -->
      <v-flex sm8 md8 lg8 xl8 elevation-1 align-end justify-center class="grey lighten-4">
        <v-container>
          <p class="title">Product: {{ product.name }}</p>
          <p class="subheading">Merk: {{ product.brand }}</p>
          <p v-if="product.spoiled == 'true'" class="subheading">Over de datum: Ja</p>
          <p v-else class="subheading">Over de datum: Nee</p>
          <br>
          <a class="back" style="cursor: pointer;" v-on:click="navigate()">Back</a>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import router from '../router'
import axios from "axios";

export default {
  name: 'Details',
  data(){
    return{
      id: 0,
      product: []
    }
  },
  created(){
    // get product id from url
    this.id = this.$route.params.id;
    // get details from product
    const axios = require("axios");
    axios.get("http://server.arvex.nl/api/products/" + this.id).then(response => {
      this.product = response.data;
    });
  },
  methods:{
    navigate(){
      router.go(-1);
    }
  }
}
</script>