<template>


  <br><br>
  <button  v-on:click="decrypte2()">Décrypter</button>



</template >

<script>

import CryptoJS from "crypto-js";
import http from "../http-common";
//import axios from "axios";


export default {
  name: "ProductList",
  data() {
    return {


    }
  },


  methods: {


    decrypte2() {
        const userReceive = {
          user:document.getElementById("id")
        }

        http
            .post("/api/product/", userReceive)
            .then((r) => {
              this.fichier = r.data.file;
              console.log("c'est le fichier",this.fichier)
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
      console.log(bytes)
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      console.log("decryptedData",decryptedData)
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
