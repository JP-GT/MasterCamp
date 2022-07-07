<template>
    <div class="searchform">
      <h4>Find by Email</h4>
      <div class="form-group">
        <input type="text" class="form-control" id="email" required v-model="this.email" name="name">
      </div>

      <div class="btn-group">
        <button v-on:click="searchUsers" class="btn btn-success">Search</button>
      </div>

      <ul class="search-result">
        
          <h6 v-if="users.fullName">FullName : {{users.fullName}} <br> Email : {{users.email}} <br> Role : {{users.role}}</h6>
        
      </ul>
    </div>
  </template>

  <script>
    import http from "../http-common";

    export default {
      name: "SearchUser",
      data() {
        return {
          email:"",
          users: []
        };
      },
      methods: {
        /* eslint-disable no-console */
        searchUsers() {
          http
              .get("/auth/register/" + this.email)
              .then(response => {
                this.users = response.data; // JSON are parsed automatically.
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