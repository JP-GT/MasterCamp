<template>
  <div v-if="this.product">
    <h4>Product</h4>
    <div>
      <label>Name: </label> {{this.product.name}}
    </div>
    <div>
      <label>Category: </label> {{this.product.category}}
    </div>
    <div>
      <label>Active: </label> {{this.product.active}}
    </div>

    <div>
      <label>Price: </label> {{this.product.price}}
    </div>

    <div>
      <label>Amount: </label> {{this.product.amount}}
    </div>
  
    <div>
      <label>Rating: </label> {{this.product.rating}}
    </div>

    <div>
      <label>Image: </label> {{this.product.image}}
    </div>

    <span v-if="this.product.active"
      v-on:click="updateActive(false)"
      class="button is-small btn-primary">Inactive</span>
    <span v-else
      v-on:click="updateActive(true)"
      class="button is-small btn-primary">Active</span>
  
    <span class="button is-small btn-danger" v-on:click="deleteProduct()">Delete</span>
  </div>
  <div v-else>
    <br/>
    <p>Please click on a Product...</p>
  </div>
</template>

<script>
import http from "../http-common";

export default {
  name: "product",
  props: ["product"],
  methods: {
    /* eslint-disable no-console */
    updateActive(status) {
      var data = {
        id: this.product._id,
        name: this.product.name,
        category: this.product.category,
        active: status,
        price: this.product.price,
        amount: this.product.amount,
        rating: this.product.rating
      };

      http
        .put("/api/product/" + this.product._id, data)
        .then(response => {
       //   this.customer.active = response.data.active;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });  
    }, 
    deleteProduct() {
      http
        .delete("/product/" + this.product._id)
        .then(response => {
          console.log(response.data);
          this.$emit("refreshData");
          this.$router.push('/');
        })
        .catch(e => {
          console.log(e);
        });
    } 
    /* eslint-enable no-console */
  }
};
</script>