<template>
  <v-container>
    <div class="container">
      <v-form if="!submitted" ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="namepost" :rules="nameRules" label="Name" required></v-text-field>

        <v-text-field v-model="brandpost" :rules="nameRules" label="Brand" required></v-text-field>

        <v-text-field v-model="spoiledpost" :rules="nameRules" label="Spoiled" required></v-text-field>

        <v-btn :disabled="!valid" color="primary" @click="post">Add</v-btn>
      </v-form>
    </div>

    <v-dialog dark color="white" v-model="submitted" max-width="500px">
      <v-card>
        <v-card-title>Thank you for posting!</v-card-title>
      </v-card>
    </v-dialog>
    <!-- all products in the database -->
    <div id="show-products">
      <h1>Products</h1>
      <div v-for="product in products" v-bind:key="product._id" class="single-product">
        <h2>{{product.name}}</h2>
        <h3>{{product.brand}}</h3>
        <h4>{{product.spoiled}}</h4>
        
        <v-icon class="mr-2" @click="viewProduct(product, product._id)">touch_app</v-icon><!-- Deze moet naar detail pagina linken -->
        <v-icon class="mr-2" @click="editProduct(product)">edit</v-icon>
        <v-icon class="mr-2" @click="deleteProduct(product, product._id)">delete</v-icon>
        <br>
        <br>
      </div>
    </div>
    <!-- Product details -->
    <v-dialog dark color="white" v-model="view" max-width="500px">
      <v-card>
        <v-card-title class="headline black lighten-2" primary-title>{{editedItem.name}}</v-card-title>

        <v-card-text>Informatie over dit product.</v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog dark color="white" v-model="dialog" max-width="500px">
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.name" label="Product Name"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.type" label="Product Brand"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field v-model="editedItem.lane" label="Product spoiled"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="white" flat @click="close">Cancel</v-btn>
        <v-btn color="white" flat @click="save(editedItem, editedItem._id)">Save</v-btn>
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
      editedItem: {
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

    viewProduct(products, _id) {
      const axios = require("axios");
      axios.get("http://server.arvex.nl/api/products/" + _id);
      this.editedIndex = this.products.indexOf(products);
      this.editedItem = Object.assign({}, products);
      this.view = true;
      console.log(this.editedItem);
    },
    editProduct(product) {
      this.editedIndex = this.products.indexOf(product);
      this.editedProduct = Object.assign({}, product);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save(item, _id) {
      const axios = require("axios");

      axios.put("http://server.arvex.nl/api/products/" + _id, {
        name: this.editedItem.name,
        brand: this.editedItem.brand,
        spoiled: this.editedItem.spoiled
      });

      if (this.editedIndex > -1) {
        Object.assign(this.products[this.editedIndex], this.editedItem);
      } else {
        this.products.push(this.editedItem);
      }
      this.close();
    }
  },

  created() {
    const axios = require("axios");
    axios.get("http://server.arvex.nl/api/products").then(response => {
      console.log(response.data);
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
