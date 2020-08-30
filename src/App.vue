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
<style>
  body {
    padding: 0;
    margin: 0;
  }
  .is-active{
    color: #50a392 !important;
  }
  .search-input .el-input__inner {
    height: 60px;
    font-size: 16px;
    border: none;
    width: 300px;
    /* padding: 20px 10px!important; */
  }
</style>

