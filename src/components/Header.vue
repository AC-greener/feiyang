<template>
  <div class="header">
    <div @click="toHome" class="logo">
      <img src="/static/logo2.png">
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
  z-index: 2;
  cursor: pointer;
  position: absolute;
  top: -15px;
  left: -18px;
}
 .header .logo img {
   width: 130px;
 }
</style>