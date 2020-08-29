<template>
<el-container class="search-container">
  <div class="add-article">
    <el-button @click="editArticle">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fabu"></use>
      </svg>
    </el-button>
  </div>
  <div class="searchbox">
    <button class="btn-menu">
    </button>
    <input v-model="keywords" id="search" type="text" placeholder="Search..." name="search" class="search">
    <button class="btn-search" @click="handleSearch">
      <img src="https://img.icons8.com/cotton/24/000000/search--v2.png">
    </button>
  </div>
  <div class="result-list">
    <el-row class="result-item"  v-for="(item, index) in searchResultList"  :key="index">
      <div @click="toArticleDetail(item.id)" class="article-title">{{ item.title }}</div>
      <div class="article-content">{{ item.content }}</div>
    </el-row>
  </div>
</el-container>
</template>

<script>
// import  from 'vue-router'
import { Container, Button, Row } from 'element-ui'
import axios from 'axios'
import BASE_URL from '@/server/config'
export default {
  components: {
    'el-container': Container,
    'el-button': Button,
    'el-row': Row
  },
  name: 'SearchBar',
  props: {
    msg: String
  },
  data() {
    return {
      keywords: '',
      searchResultList: [
        {
          title: 'nodejs 从入门到放弃放弃放弃放弃放弃放弃放弃放弃放弃放弃放弃放弃11221',
          content: 'hello world',
          id: 1
        },
        {
          title: '你不知道的js',
          content: 'hello world',
          id: 2
        },
      ]
    }
  },
  mounted() {

  },

  methods: {
    toArticleDetail(id) {
      this.$router.push('/article/' + id)
    },
    editArticle() {
      this.$router.push('/edit')
    },
    handleSearch() {
      axios.post(`${BASE_URL}/search`, {
        keywords: this.keywords,
        size: 10,
        page: 1
      }).then(res => {
        console.log(res.data.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped >
.border {
  border: 1px solid red;
}
  .result-list {
    width: 600px;
    margin-top: 30px;
    /* margin-left: -210px; */
    overflow: hidden;
  }
  .result-item {
    margin-bottom: 15px;
  }
  .article-title {
    font-family: medium-content-sans-serif-font,"Lucida Grande","Lucida Sans Unicode","Lucida Sans",Geneva,Arial,sans-serif!important;
    font-size: 24px!important;
    font-weight: 600px;
    height: 40px;
    width: 600px;
    color: rgba(0, 0, 0, .84);
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
  .article-content {
    font-size: 16px;
    font-weight: 400px;
    color: rgba(0,0,0,.54)
  }
  .icon {
    cursor: pointer;
    width: 1.5em;
    height: 1.5em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .search-container {
    height: 900px;
    background: #2F94D8;
    position: relative;
    display: flex;
    /* justify-content: center;    */
    flex-direction: column; 
    align-items: center;
  }
  .add-article {
    position: absolute;
    right: 30px;
    top: 30px;
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
    display: flex;
    margin-top: 150px;
    margin-left: auto;
    margin-right: auto;
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
