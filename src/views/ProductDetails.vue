<template>
  <v-container>
    <!-- desktop -->
    <v-layout hidden-sm-and-down>
      <!-- product info -->
      <v-flex sm7 md7 lg7 xl7 elevation-1 align-end justify-center class="grey lighten-4">
        <v-container>
          <p class="title">Product: </p>
          <p class="subheading">Appel</p><br>
          <p class="title">Labels: </p>
          <p class="subheading">Example lable, Example lable 2</p><br>
          <p class="title">Millieu impact: </p>
          <p class="subheading">Deze appel word door boer X die officieel is gelicenceerd in Y geteelt. 
            Omdat er minder dan Z gram aan CO2 vrijkomt per appel is dit product zeer duurzaam.</p><br>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {

}
</script>