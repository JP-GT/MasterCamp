//<template>
  <div class="container">
    <div class="row">
      <div v-if="!submitted" class="">
        <form
          class=""
          style="margin-top:70px;height:auto;padding-top:100px !important;"
          @submit.prevent="saveUser"
        >
          <input
            type="text"
            id="fullName"
            class=""
            placeholder="FullName"
            required
            v-model="user.fullName"
          />
          <input
            type="email"
            id="email"
            class=""
            placeholder="Email"
            required
            v-model="user.email"
          />
          <!-- Password -->
          <input
            type="password"
            id="password"
            class="form-control"
            placeholder="Password"
            required
            v-model="user.password"
          />
          <p>
            Already have an account??<router-link to="/login"
              >click here</router-link
            >
            <!-- Sign in button -->
              <button class="" type="submit" v-on:click="saveUser">
                Sign in
              </button>
        
          </p>
        </form>
      </div>
     <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" v-on:click="newUser">Add</button>
    </div>
    </div>
  </div>
</template>

<script>
import http from "../http-common";
export default {
    name: "RegisterUser",
    data() {
        return {
            user: {
            id: 0,
            fullName: "",
            email: "",
            password: "",
            role:"",
            basket: {}
            },
            submitted: false
        };
    },
    methods: {
        saveUser(){
            var data = {
                fullName: this.user.fullName,
                email: this.user.email,
                hash_password: this.user.password,
            };
            http
                .post("/auth/register", data)
                .then(response => {
                    let token = response.data.token;
                    if(token){
                        localStorage.setItem("MasterCamp", JSON.stringify(response.data));
                        this.$router.push("/");
                        console.log(response.data);
                        window.location.reload();
                    }
                    //this.$session.start();
                    else{ 
                        console.log(response.data);
                    }
                })
                .catch( e => {
                    console.log(e);
                });
            this.submitted = true;
        },
        newUser(){
            this.submitted = false;
            this.user = {};
        }
    }
    }

</script>

<style>

</style>