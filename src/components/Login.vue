<template>
  <div class="">

        <form 
          class=""
          style="margin-top:70px;height:auto;padding-top:100px !important;"
          @submit.prevent="loginUser"
        >
          <input
            type="text"
            id="email"
            class=""
            placeholder="Email"
            v-model="login.email"
            required
          />
          <!-- Password -->
          <input
            type="password"
            id="password"
            class=""
            placeholder="Password"
            v-model="login.password"
            required
          />
          <p>
            Dont have an account??<router-link to="/register"
              >click here</router-link
            >
          </p>
          <!-- Sign in button -->
        
            <button class="" type="submit">
              Sign in
            </button>

         
        </form>
      </div>
</template>

<script>
import http from "../http-common";
export default {
    name: "LoginUser",

    data(){
        return {
            login: {
                email: "",
                password: "",
            },
            test: false
            
        };
        
    },
    methods: {
        loginUser() {
            var data = {
                email: this.login.email,
                hash_password: this.login.password
            };
        // send email and password to server
            http.post("/auth/login", data).then(response => {
                let token = response.data.token;
                if(token){
                    alert("Success", "Login Successful", "Error");
                    localStorage.setItem("MasterCamp", JSON.stringify(response.data));
                    // navigate to a protected resource
                    this.$router.push("/"); 
                    console.log(response.data);
                    window.location.reload();
                    
                }
                else{ 
                    this.test = true;
                    alert("Error");
                    console.log(response.data);
                }
       
        })
        .catch( e => {
                    console.log(e);
                });
    }

}}

</script>
