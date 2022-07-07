<template>
  <div >
    <h4>User data</h4>
    <div>
      <label>FullName: </label> {{this.user.fullName}}
    </div>
  
    <div>
      <label>Email: </label> {{this.user.email}}
    </div>

    <div>
      <label>Role: </label> {{this.user.role}}
    </div>
  
    <!--<span v-if="this.user.active"
      v-on:click="updateActive(false)"
      class="button is-small btn-primary">Inactive</span>
    <span v-else
      v-on:click="updateActive(true)"
      class="button is-small btn-primary">Active</span>-->
  
    <span class="button is-small btn-danger" v-on:click="logUserOut">Logout</span>
  </div>
  <!--<div >
    <br/>
    <p>Please click on a Product...</p>
  </div>-->
</template>

<script>
//import http from "../http-common";
import VueJwtDecode from "vue-jwt-decode";
export default {
  name: "user-body",
  data(){
      return{ 
          user: {}
      };
  },
  methods: {
    /* eslint-disable no-console */   
        getUserDetails() {
            let token = localStorage.getItem("userData");
            console.log(this.user);
            let decoded = VueJwtDecode.decode(token);
            this.user = decoded;
           
            console.log(this.user);
        },
        logUserOut() {
        localStorage.removeItem("userData");
        this.$router.push("/");
        }
    },
    created() {
        console.log(this.getUserDetails());
    }
    /* eslint-enable no-console */
};
</script>