<template>

  <form  enctype="multipart/form-data">
    <input  type="file" name="avatar" ref="doc"  multiple />
    <br><br><br>
    <input type="email" name="destinataire" placeholder="Email du destinataire">
  </form>
  <br><br>
  <button type="text" id="id" name="send" v-on:click="readFile(variable=0)">Envoyer</button>
  <br><br>
  <button  v-on:click="decrypte2()">Download</button>



</template >

<script>

import CryptoJS from "crypto-js";
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
    decrypte2(){
      var variable = 1;
      this.readFile(variable);
    },
    saveProduct() {
      var data = {
        file: this.product.file,
        key: this.product.key,
      };
      http
          .post("/api/products", data)
          .then(response => {
            this.product.id = response.data.id;
            console.log(response.data);

          })
          .catch(e => {
            console.log(e);
          });

      this.submitted = true;
    },


    readFile(variable) {

      this.file = this.$refs.doc.files[0];


      const reader = new FileReader();
      if(variable==1) {
        const user = {
          user: JSON.parse(localStorage.getItem("MasterCamp"))
        }

        http
            .post("/api/product/", user)
            .then((r) => {
              this.fichier = r.data.file;
              this.decrypte(this.fichier, r.data.key1,r.data.key2)
            })
            .catch((error) => {
              console.log(error);
            });
      }
      else {

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
      }

    },


    // affichageFiles(){
    //
    //   http
    //       .get("/api/product/", saisie)
    //       .then((r) => {
    //         this.fichier = r.data.file;
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //
    // },



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
        idUser: JSON.parse(localStorage.getItem("MasterCamp"))._id

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

    decrypte(enc, key1,key2) {
      var mult = key1*key2;
      var int = ~~(mult/4654)
      var key= int.toString();
      console.log("la vrai clé de décryptage     :    ",key)

      var bytes = CryptoJS.AES.decrypt(enc, key);
      console.log(bytes)
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      console.log(decryptedData)
      let decr = new String('');
      for (let i = 0; i < decryptedData.length; ++i) {
        decr += (String.fromCharCode(decryptedData[i]));
      }
      console.log("FICHIER DECRYPTE    :    ", decr)

      return decr
    }

  }
}


</script>

<style>
.submitform {
  max-width: 300px;
  margin: auto;
}
</style>
