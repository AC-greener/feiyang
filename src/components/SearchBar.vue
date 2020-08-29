<template>
<div class="searchbox">
  <button class="btn-menu">
  </button>
  <input v-model="keywords" id="search" type="text" placeholder="Search..." name="search" class="search">
  <button class="btn-search" @click="handleSearch">
    <img src="https://img.icons8.com/cotton/24/000000/search--v2.png">
  </button>
</div>
</template>

<script>
import axios from 'axios'
import BASE_URL from '@/server/config'
export default {
  name: 'SearchBar',
  props: {
    msg: String
  },
  data() {
    return {
      keywords: '11'
    }
  },
  mounted() {

  },

  methods: {
    handleSearch() {
      axios.post(`${BASE_URL}/search/`, {
        keywords: this.keywords
      }).then(res => {
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
      console.log(this.$store.state.userinfo)
    }
  }
}
</script>

<style  >
body {
  margin: 0;
  padding: 16px;
  flex: 1;
  background: #2F94D8;
  justify-content: center;
  align-items: center;
  font-family: 'Lexend Deca', sans-serif;
  overflow-Y: none !important;
}

  button img {
    transition: transform .25s;
  }

  button:focus {
    outline: none;
  }
input {
  font-family: 'Lexend Deca', sans-serif;
}
input::placeholder {
  font-family: 'Lexend Deca', sans-serif;
}

input:focus {
  outline: none;
}
.searchbox {
  height: 60px;
  width: 450px;
  max-width: 100%;
  background: white;
  border-radius: 10px;
  position: relative;
  left: 0;
  right: 0;
  margin: 0 auto;
  top: 50px;
  display: flex;


}
  .searchbox>.btn-menu {
    padding: 16px;
    background: transparent;
    border: none;
    cursor: pointer;
  }

  .searchbox>.search {
    border: none;
    width: 100%;
  }

  .searchbox>.btn-search {
    padding: 16px;
    background: transparent;
    border: none;
    cursor: pointer;
  }


@keyframes slideInUp {
  from {
    -webkit-transform: translate3d(0, 15%, 0);
    transform: translate3d(0, 15%, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
</style>
