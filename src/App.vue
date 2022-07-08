<template>
  <div :style="{'background-image':'url(https://www.pinterest.fr/pin/502010689706717116/)'}"></div>
  <nav v-if="!isLogged()">
    | <router-link to="/register">Register</router-link> |
    <router-link to="/login">Login</router-link> |
  </nav>

  <nav v-if="isLogged()">

    | <router-link to="/Home2">Home</router-link> |
     <router-link to="/AddProduct">Send Files</router-link> |
    <router-link to="/logout">Logout</router-link> |
    <router-link  to="/list">Boite de réception</router-link> |
    <router-link  to="/UsersList">Users List</router-link> |

  </nav>


  <router-view/>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode"

export default {
    data() {
        return { user: {}, userBool: false, adminBool: false, guestBool: false
        };
    },
    methods: {
        getUserDetails() {
            let token = localStorage.getItem("MasterCamp");
            console.log(this.user);
            let decoded = VueJwtDecode.decode(token);
            this.user = decoded;
            console.log(this.user);
        },
        isLogged() {
            if (localStorage.getItem("MasterCamp")) {
                return true;
            }
            else {
                return false;
            }
        },
        isUser() {
            console.log(JSON.parse(localStorage.getItem("MasterCamp")).newUser.role === "user");
            if (JSON.parse(localStorage.getItem("MasterCamp")).newUser.role === "user") {
                return true;
            }
            else {
                return false;
            }
        },
        isAdmin() {
            console.log(JSON.parse(localStorage.getItem("MasterCamp")).role === "admin");
            if (JSON.parse(localStorage.getItem("MasterCamp")).role === "admin") {
                return true;
            }
            else {
                return false;
            }
        },
        created() {
            console.log(this.getUserDetails());
        }
    },
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;

}
</style>
