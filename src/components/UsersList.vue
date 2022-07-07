<template>
    <div class="list row">|
        <div class="col-md-6">
            <h4>Users List</h4>
            <table>
                <td>Name</td>
                <td>Email</td>
                <td>Role</td>
                <tr v-for="(user, index) in users" :key="index">
                    <td>{{user.fullName}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.role}}</td>
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
  name: "UsersList",
  data() {
    return {
      users: []
    };
  },
  methods: {
    /* eslint-disable no-console */
    retrieveUsers() {
      http
        .get("/auth/users")
        .then(response => {
          this.users = response.data; // JSON are parsed automatically.
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveUsers();
    },
    deleteUser(user) {
      http
          .post("/usersDelete", user)
          .then(response => {
            console.log(response.data);
            console.log(this.users.splice(this.users.indexOf(response), 1));
          })
          .catch(e => {
            console.log(e);
          });
    }
    /* eslint-enable no-console */
  },
  mounted() {
    this.retrieveUsers();
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
