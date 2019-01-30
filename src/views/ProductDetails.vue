<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex md8 elevation-1>
        <!-- Title -->
        <div class="grey darken-3">
          <h1 class="detail font-weight-light white--text">Product details</h1>
        </div>

        <!-- product info -->
        <v-container class="grey lighten-4 category">
            <p class="title">Product naam: </p>   <p class="subheading">{{product.name}}</p><br>
            <p class="title">Merk: </p>           <p class="subheading">{{product.brand}}</p><br>
            <p class="title">Over de datum: </p>  <p v-if="product.spoiled == 'true'">Ja</p>  <p v-else>Nee</p><br>
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