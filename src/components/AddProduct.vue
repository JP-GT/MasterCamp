<template>

   <form  enctype="multipart/form-data">
     <input  type="file" name="avatar" ref="doc"  multiple @change="readFile()"/>
     <br><br><br>
     <input type="email" name="destinataire" placeholder="Email du destinataire">
   </form>
  <button type="submit" id="submit" name="send">Envoyer</button>
  <br><br>
  <button  v-on:click="decrypte2()">click mon reuf</button>



</template >

<script>
var files =[];
import CryptoJS from "crypto-js";
import http from "../http-common";
//import axios from "axios";


export default {
  name: "AddProduct",
  data() {
    return {


      file: null,
      content: null
    }
  },


  methods: {

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

    // newProduct() {
    //   this.submitted = false;
    //   this.product = {};
    // },
    readFile() {
      // var who = 0;

      this.file = this.$refs.doc.files[0];

      console.log("filleeeee", this.file)
      const reader = new FileReader();

      var bytes = [];
      reader.onload =  (res) => {
        this.content = res.target.result;
        console.log("thiiiiiiiis", this.content)

        for (let i = 0; i < this.content.length; ++i) {
          bytes.push(this.content.charCodeAt(i));
        }

        var enc = this.encrypte(bytes, '1')
        console.log("enccccccc", enc)
        var dec = this.decrypte(enc, '1')
        console.log("decccccccc", dec)
        const taille =  files.length;
        this.saveFile(enc, taille)
        console.log(files)
       // http.get('/api/auth/saveFiles2', enc).then(response => (this.info = response))
      };


      reader.onerror = (err) => console.log(err);
      reader.readAsText(this.file);

    },
    decrypte2(){
      console.log("ca passsseee")
      this.decryptage(0,'1');
      console.log(files[0])
    },


    saveFile(encData,taille){
      // eslint-disable-next-line no-undef
      files[taille] = encData;
      // eslint-disable-next-line no-unused-vars
      var loc= taille;
      console.log("wola ça marche", files)
      return ('Success')
    },



    encrypte(data, key) {
      console.log("dataaaaa", data)
      var CryptoJS = require("crypto-js");
      var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
      return ciphertext;
    },

    decryptage(loc, key) {

        var bytes = CryptoJS.AES.decrypt(files[loc], key);
      console.log("decryyyyyyyyy", bytes)
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      console.log(decryptedData)
      let decr = new String('');
      for (let i = 0; i < decryptedData.length; ++i) {
        decr += (String.fromCharCode(decryptedData[i]));
      }
      console.log("cccccc la décryptionnnnnnn", decr)
      // console.log(files)
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
