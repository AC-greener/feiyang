<template>
  <div class="header">
    <div @click="toHome" class="logo">
      <img src="../assets/logo2.png">
    </div>
  </div>
</template>
<script>
export default {
  name: 'Header',
  methods: {
    toHome() {
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
.header {
  /* height: 50px; */
  position: relative;
  /* margin-bottom: 100px; */
}
.header .logo {
  cursor: pointer;
  position: absolute;
  top: -15px;
  left: -18px;
}
 .header .logo img {
   width: 130px;
 }
</style>