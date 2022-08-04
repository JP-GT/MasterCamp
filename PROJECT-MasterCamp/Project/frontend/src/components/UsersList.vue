<template>




  <H1>Liste des Utilisateurs</H1>
  <div>
    <div v-for="liste in this.listes" v-bind:key="liste">
      <h2>############################USER############################  </h2>
      <div><h2>"ID :"</h2>{{liste._id}}</div>
      <div><h2>"FullName :"</h2>{{liste.fullName}}</div>
      <div><h2>"Email :"</h2>{{liste.email}}</div>

    </div>
  </div>






</template >

<script>


import http from "../http-common";
//import axios from "axios";


export default {
  name: "ProductList",
  data() {
    return {
      test: null,
      listes: null
    }
  },


  methods: {

    affichage(){
      console.log("debut")
      http.get('/auth/users',JSON.parse(localStorage.getItem("MasterCamp"))._id)
          .then((r) => {
            console.log("response", r);
            this.listes = r.data

          })
          .catch((error) => {
            console.log(error);
          });
    },






  },
  mounted() {
    this.$nextTick(this.affichage)
  }
}


</script>

<style>
.submitform {
  max-width: 300px;
  margin: auto;
}
</style>
