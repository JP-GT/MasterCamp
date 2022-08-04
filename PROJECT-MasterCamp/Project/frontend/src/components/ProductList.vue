<template>




  <H1>Boite de Réception</H1>
<div>
  <div v-for="fichier in fichiers" v-bind:key="fichier">
    <div><h2>############################Data Fichier###########################</h2></div>
    <div><h3>"EncodedFile :"</h3>{{fichier.file}}</div>
    <div><h3>"KEY1 :"</h3>{{fichier.key1}}</div>
    <div><h3>"KEY2 :"</h3>{{fichier.key2}}</div>
    <input type="checkbox">
  </div>
</div>


  <br><br>
  <button  v-on:click="Recup2()">Déchiffrer</button>
  <br><br>
  <H2>Votre fichier déchiffré :  </H2>
  <div id="decTxt">{{test}}</div>

</template >

<script>

import CryptoJS from "crypto-js";
import http from "../http-common";
//import axios from "axios";


export default {
  name: "ProductList",
  data() {
    return {
      test: null,
      fichiers: null
    }
  },


  methods: {

    affichage(){
      console.log("debut")
      http.post("/api/productsget",JSON.parse(localStorage.getItem("MasterCamp"))._id)
          .then((r) => {
            console.log("response", r);
            this.fichiers = r.data

          })
          .catch((error) => {
            console.log(error);
          });
    },

    Recup2() {
        const userReceive = {
          user:document.getElementById("id")
        }
        http
            .post("/api/product/", userReceive)
            .then((r) => {
              this.fichier = r.data.file;
              this.decrypte1(this.fichier, r.data.key1,r.data.key2)
            })
            .catch((error) => {
              console.log(error);
            });
    },
    decrypte1(enc, key1,key2) {
      var mult = key1*key2;
      var int = ~~(mult/4654)
      var key= int.toString();
      console.log("la vrai clé de décryptage     :    ",key)
      var bytes = CryptoJS.AES.decrypt(enc, key);
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      console.log("decryptedData      :      ",decryptedData)
      let decr = new String('');
      for (let i = 0; i < decryptedData.length; ++i) {
        decr += (String.fromCharCode(decryptedData[i]));
      }
      console.log("FICHIER DECRYPTE    :    ", decr)
      this.test = decr;
      return decr
    }
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
