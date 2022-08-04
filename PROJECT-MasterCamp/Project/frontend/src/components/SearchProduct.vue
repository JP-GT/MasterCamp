<template>
    <div class="searchform">
      <h4>Find by Name</h4>
      <div class="form-group">
        <input type="text" class="form-control" id="name" required v-model="this.name" name="name">
      </div>

      <div class="btn-group">
        <button v-on:click="searchProducts" class="btn btn-success">Search</button>
      </div>

      <ul class="search-result">
        
          <h6 v-if="products.name">Name : {{products.name}} <br> Category : {{products.category}} <br> Price : {{products.price}}
          <br> Amount : {{products.amount}} <br> Rating : {{products.rating}}
          </h6>
        
      </ul>
    </div>
  </template>

  <script>
    import http from "../http-common";

    export default {
      name: "SearchProduct",
      data() {
        return {
          name:"",
          products: []
        };
      },
      methods: {
        /* eslint-disable no-console */
        searchProducts() {
          http
              .get("/api/products/" + this.name)
              .then(response => {
                this.products = response.data; // JSON are parsed automatically.
                console.log(response.data);
              })
              .catch(e => {
                console.log(e);
              });
        }
        /* eslint-enable no-console */
      }
    };
  </script>

  <style>
    .searchform {
      max-width: 300px;
      margin: auto;
    }
    .search-result {
      margin-top: 20px;
      text-align: left;
    }
  </style>