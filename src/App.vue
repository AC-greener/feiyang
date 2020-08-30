<template>
  <div id="app">
    <Header/>
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  components: {
    Header
  }
}
</script>
<style >
 body {
   padding: 0;
   margin: 0;
}
.is-active{
  color: #50a392 !important;
}
</style>

