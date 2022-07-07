
<script>
export default {
 name:"Logout-user",
  beforeMount(){
        
        localStorage.clear();
        window.location.replace("/");
              
 }
}
</script>

<style>

</style>