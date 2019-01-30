<template>
    <nav>
        <v-toolbar app dark>
            <v-toolbar-title class="headline">
                <router-link to='/products' ><span class="link1">Full stack web</span></router-link>
                <span class="font-weight-light blue--text text--darken-1">APP</span>
            </v-toolbar-title>
            
            <v-spacer></v-spacer>
            <v-btn flat>
                <v-icon left>view_list</v-icon>
                <router-link to='/products' ><span class="link2 mr-2">Producten overzicht</span></router-link>
            </v-btn>
            <p class="devider blue--text text--darken-1"> | </p>
            <v-btn flat>
                <v-icon left>playlist_add</v-icon>
                <router-link to='/add' ><span class="link2 mr-2">Product toevoegen</span></router-link>
            </v-btn>
        </v-toolbar>
    </nav>
</template>

<script>
export default {

}
</script>

<style>
.link1{
    color: white;
}
.link2{
    color: white;
    font-size: 1.2em;
}

.devider{
    font-size: 3em;
    margin: 0px;
}
</style>