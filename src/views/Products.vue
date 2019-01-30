<template>
  <v-container>    
    <!-- all products in the database -->
    <div id="show-products">
      <h1>Products</h1>
      <div v-for="product in products" v-bind:key="product._id" class="single-product">
        <h2>{{product.name}}</h2>
        <h3>{{product.brand}}</h3>
        <h4>{{product.spoiled}}</h4>
        <router-link :to="{ name: 'ProductDetails', params: { id: product._id } }">Details</router-link>
        <v-icon class="mr-2" @click="editProduct(product)">edit</v-icon>
        <v-icon class="mr-2" @click="deleteProduct(product, product._id)">delete</v-icon>
        <br>
        <br>
      </div>
    </div>

    <!-- Edit item menu -->
    <v-dialog dark color="white" v-model="dialog" max-width="500px">
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex>
              <v-text-field v-model="editedProduct.name" label="Product Name"></v-text-field>
              <v-text-field v-model="editedProduct.brand" label="Product Brand"></v-text-field>
              <v-text-field v-model="editedProduct.spoiled" label="Product spoiled"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="white" flat @click="close">Cancel</v-btn>
        <v-btn color="white" flat @click="save(editedProduct, editedProduct._id)">Save</v-btn>
      </v-card-actions>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      valid: true,
      namepost: "",
      brandpost: "",
      spoiledpost: "",
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
  components: {},
  methods: {
    post: function() {
      var self = this;
      const axios = require("axios");
      axios
        .post("http://server.arvex.nl/api/products/", {
          name: this.namepost,
          brand: this.brandpost,
          spoiled: this.spoiledpost
        })
        .then(function(response) {
          console.log(response);
          self.products.push(response.data);
          self.submitted = true;

          self.namepost = "";
          self.brandpost = "";
          self.spoiledpost = "";
        })

        .catch(function(error) {
          console.log(error);
        });
    },

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
    }
  },

  created() {
    const axios = require("axios");
    axios.get("http://server.arvex.nl/api/products").then(response => {
      //console.log(response.data);
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
  background: #eee;
}
</style>
