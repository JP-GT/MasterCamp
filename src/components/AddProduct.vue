<template>

  <form  enctype="multipart/form-data">
    <input  type="file" name="avatar" ref="doc"  multiple />
    <br><br><br>
    <input type="email" name="destinataire" placeholder="Email du destinataire">
  </form>
  <br><br>
  <button type="text" id="id" name="send" v-on:click="readFile()">Envoyer</button>
  <br><br>


</template >

<script>


import http from "../http-common";
//import axios from "axios";


export default {
  name: "AddProduct",
  data() {
    return {

      idUser: Object,
      file: null,
      content: null,
      fichier: String
    }
  },


  methods: {
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min +1)) + min;
    },




    readFile() {

      this.file = this.$refs.doc.files[0];


      const reader = new FileReader();


        var bytes = [];
        reader.onload = (res) => {
          this.content = res.target.result;

          for (let i = 0; i < this.content.length; ++i) {
            bytes.push(this.content.charCodeAt(i));
          }
          console.log("DATA AFTER CONVERSION IN BYTES     :      ",bytes)
           var enc = this.encrypte(bytes)
           console.log("ENCRYPTED DATA    :     ", enc)
        };
        reader.onerror = (err) => console.log(err);
        reader.readAsText(this.file);


    },



    encrypte(data) {
      var key1= this.getRandomInt(1000000000,100000000000);
      var key2= this.getRandomInt(1000000000,100000000000);
      var mult = key1*key2;
      var int = ~~(mult/4654)
      var key= int.toString();
      console.log("la vrai clé c'est     :   ", key)
      var CryptoJS = require("crypto-js");
      var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();

      const file = {
        file: ciphertext,
        key1: key1,
        key2: key2,
        idUser: JSON.parse(localStorage.getItem("MasterCamp")).newUser._id

      }

      http.post("/api/products",file)
          .then((r) => {
            console.log("response", r);
          })
          .catch((error) => {
            console.log(error);
          });
      return ciphertext;
    },



  }
}


</script>

<style>
.submitform {
  max-width: 300px;
  margin: auto;
}
</style>
