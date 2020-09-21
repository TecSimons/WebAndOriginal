<template>
  <div id="app">
     <!-- <keep-alive> -->
    <router-view/>
     <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  name: 'App',

   mounted() {
    window.onBack = this.onBack;
  },  methods: {
      onBack(){
         this.$router.back();
        //  this.$router.go();
      }
  }

}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
  font-family: 'Droid Sans Fallback', Helvetica, Arial, sans-serif;

}

/* html,body{
      overflow-y:hidden;
} */

</style>
