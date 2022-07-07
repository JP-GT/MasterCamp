<!--<template>-->
<!--    <div class="list row">-->
<!--        <div class="col-md-6">-->
<!--            <h4>Boite de réception </h4>-->
<!--            <table>-->
<!--                <td>File</td>-->
<!--              <br>-->
<!--                <td>Key</td>-->

<!--                <tr v-for="(product, index) in products" :key="index">-->
<!--                    <td>{{product.file}}</td>-->
<!--                    <td>{{product.key}}</td>-->
<!--                    <td><button v-on:click="deleteProduct(product)">Delete</button></td>-->
<!--                </tr>-->
<!--            </table>-->
<!--        </div>-->
<!--        <div class="col-md-6">-->
<!--            <router-view @refreshData="refreshList"></router-view>-->
<!--        </div>-->
<!--    </div>-->


<!--  <button  v-on:click="decryptage()">click mon reuf</button>-->
<!--</template>-->

<!--<script>-->

<!--// import http from "../http-common";-->
<!--import AddProduct from "@/components/AddProduct";-->

<!--export default {-->
<!--  name: "ProductsList",-->
<!--  data() {-->
<!--    return {-->
<!--      // test:{image: product.image},-->
<!--      products: []-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    /* eslint-disable no-console */-->
<!--    decryptage() {-->


<!--      var dec = AddProduct.$refs.pageProd.decrypte(0, '1');-->
<!--      console.log("cccccc la décryptionnnnnnn", dec)-->
<!--    }-->
<!--  }-->
<!--}-->
<!--  //   retrieveProducts() {-->
<!--  //     http-->
<!--  //       .get("/api/products")-->
<!--  //       .then(response => {-->
<!--  //         this.products = response.data; // JSON are parsed automatically.-->
<!--  //         console.log(response.data);-->
<!--  //       })-->
<!--  //       .catch(e => {-->
<!--  //         console.log(e);-->
<!--  //       });-->
<!--  //   },-->
<!--  //   deleteProduct(product) {-->
<!--  //       console.log(product);-->
<!--  //       const index = this.products.indexOf(product)-->
<!--  //     http-->
<!--  //        .post("/api/productDelete", product)-->
<!--  //         .then(response => {-->
<!--  //           console.log(response.data);-->
<!--  //           this.products.splice(index, 1);-->
<!--  //         })-->
<!--  //         .catch(e => {-->
<!--  //           console.log(e);-->
<!--  //         });-->
<!--  //   },-->
<!--  //   refreshList() {-->
<!--  //     this.retrieveProducts();-->
<!--  //   }-->
<!--  //   /* eslint-enable no-console */-->
<!--  // },-->
<!--  // mounted() {-->
<!--  //   this.retrieveProducts();-->
<!--  //   this.$nextTick(this.retrieveProducts);-->
<!--  // }-->
<!--    -->
<!--// };-->
<!--</script>-->

<!--<style>-->
<!--.list {-->
<!--  text-align: left;-->
<!--  max-width: 450px;-->
<!--  margin: auto;-->
<!--}-->
<!--</style>-->
