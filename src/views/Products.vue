<template>
  <v-container>    
    <!-- all products in the database -->
    <div id="show-products">
      <h1 class="blue--text text--darken-2">Producten</h1>
      <div v-for="product in products" v-bind:key="product._id" class="single-product">
        <v-container class="category">
          <p class="title">Product naam: </p>   <p class="subheading">{{product.name}}</p><br>
        </v-container>
        <!-- Details button -->
        <v-btn class="blue">
          <v-icon class="mr-2">details</v-icon>
          <router-link :to="{ name: 'ProductDetails', params: { id: product._id } }"><a class="detailsLink">Details</a></router-link>
        </v-btn>
        <!-- Edit button -->
        <v-btn class="orange lighten-1" @click="editProduct(product)">
          <v-icon class="mr-2">edit</v-icon>
          <a>Aanpassen</a>
        </v-btn>
        <!-- Delete button -->
        <v-btn class="red lighten-1" @click="deleteProduct(product, product._id)">
          <v-icon class="mr-2">delete</v-icon>
          <a>Verwijderen</a>
        </v-btn>
      </div>
    </div>
  
    <!-- Edit item menu -->
    <v-dialog class="dialogBox" v-model="dialog" max-width="500px">
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex>
              <v-text-field v-model="editedProduct.name" :rules="nameRules" label="Product naam"></v-text-field>
              <v-text-field v-model="editedProduct.brand" :rules="nameRules" label="Product merk"></v-text-field>
              <v-text-field v-model="editedProduct.spoiled" :rules="nameRules" label="Product over de datum (true | false)"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="blue" flat @click="close">Cancel</v-btn>
        <v-btn class="green lighten-1" flat @click="save(editedProduct, editedProduct._id)">opslaan</v-btn>
      </v-card-actions>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      nameRules: [
        v => !!v || "required!"
      ],
      submitted: false,
      dialog: false,
      view: false,
      products: [],
      editedIndex: -1,
      editedProduct: {
        name: "",
        brand: "",
        spoiled: ""
      }
    };
  },
  methods: {
    deleteProduct(products, _id) {
      const axios = require("axios");
      axios.delete("http://server.arvex.nl/api/products/" + _id);
      this.products.splice(this.products.indexOf(products), 1);
    },

    editProduct(item) {
      this.editedIndex = this.products.indexOf(item);
      this.editedProduct = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedProduct = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save(item, _id) {
      const axios = require("axios");

      axios.put("http://server.arvex.nl/api/products/" + _id, {
        name: this.editedProduct.name,
        brand: this.editedProduct.brand,
        spoiled: this.editedProduct.spoiled
      });

      if (this.editedIndex > -1) {
        Object.assign(this.products[this.editedIndex], this.editedProduct);
      } else {
        this.products.push(this.editedProduct);
      }
      this.close();
    },
  },

  created() {
    const axios = require("axios");
    axios.get("http://server.arvex.nl/api/products").then(response => {
      this.products = response.data.items;
    });
  }
};
</script>

<style>
#show-products {
  max-width: 800px;
  margin: 0 auto;
}

.single-product {
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background: rgb(216, 216, 216);
  border-radius: 5px;
}

.single-product a {
  text-decoration: none;
  color: black;
  font-size: 1em;
}

.category p{
  display: inline;
}

.v-dialog {
  background-color: rgba(255, 255, 255, 0.89);
}
</style>
