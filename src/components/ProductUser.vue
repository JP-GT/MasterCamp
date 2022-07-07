<template>
    <div class="list row">|
        <div class="col-md-6">
            <h4>Products List</h4>
            <table>
                <td>Name</td>
                <td>Category</td>
                <td>Price</td>
                <td>Amount</td>
                <td>Rating</td>
                <tr v-for="(product, index) in products" :key="index">
                    <td>{{product.name}}</td>
                    <td>{{product.category}}</td>
                    <td>{{product.price}}</td>
                    <td>{{product.amount}}</td>
                    <td>{{product.rating}}</td>
                    <td>{{product.image}}</td>
                    <td><button v-on:click="buyProduct(product)">Buy</button></td>
                </tr>
            </table>
        </div>
        <div class="col-md-6">
            <router-view @refreshData="refreshList"></router-view>
        </div>
    </div>
</template>

<script>
import http from "../http-common";

export default {
  name: "ProductsUser",
  data() {
    return {
      products: [],
      user:{}
    };
  },
  methods: {
    /* eslint-disable no-console */
    retrieveProducts() {
      http
        .get("/api/products")
        .then(response => {
          this.products = response.data; // JSON are parsed automatically.
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }, /* getUserDetails() {
            let token = localStorage.getItem("jwt");
            console.log(this.user);
            let decoded = VueJwtDecode.decode(token);
            this.user = decoded;
           
            console.log(this.user);
        },*/
    buyProduct(product){
        this.user.basket.push(product);
    },
    deleteProduct(product) {
        console.log(product);
        const index = this.products.indexOf(product)
      http
         .post("/api/productDelete", product)
          .then(response => {
            console.log(response.data);
            this.products.splice(index, 1);
          })
          .catch(e => {
            console.log(e);
          });
    },
    refreshList() {
      this.retrieveProducts();
    }
    /* eslint-enable no-console */
  },
  mounted() {
    this.retrieveProducts();
    this.$nextTick(this.retrieveProducts);
  }
    
};
</script>

<style>
.list {
  text-align: left;
  max-width: 450px;
  margin: auto;
}
</style>
