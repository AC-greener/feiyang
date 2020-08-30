<template>
<el-container class="search-container" v-loading="loading">
  <div class="add-article">
  </div>
  <div class="searchbox">
    <button class="btn-menu">
    </button>
    <input v-model="keywords" id="search" type="text"
    placeholder="Search..." name="search" class="search"
    @keyup.enter="handleSearch">
    <button class="btn-search" @click="handleSearch">
      <img src="https://img.icons8.com/cotton/24/000000/search--v2.png">
    </button>
  </div>
  <div class="result-list">
    <transition name="el-fade-in-linear">
    <el-row class="result-item"  v-for="(item, index) in searchResultList"  :key="index">
      <div class="item-cover">
        <img :src="baseUrl + item.cover" class="item-cover-image">
      </div>
      <div class="item-content">
        <div @click="toArticleDetail(item.id)" class="article-title">{{ item.title }}</div>
        <div class="article-content" v-html="item.content"></div>
      </div>
    </el-row>
    </transition>
  </div>
</el-container>
</template>

<script>
import { Container, Button, Row } from 'element-ui'
import axios from '../server/axios'
import BASE_URL from '@/server/config'
export default {
  components: {
    'el-container': Container,
    'el-button': Button,
    'el-row': Row
  },
  name: 'SearchBar',
  data() {
    return {
      keywords: '',
      baseUrl: `${BASE_URL}`,
      loading: false,
      searchResultList: [
        {
          title: 'nodejs 从入门到放弃放弃放弃放弃放弃放弃放弃放弃放弃放弃放弃放弃11221',
          content: 'I love Mediums membership — it gives me access to the stories I love by the writers I love, and it allows me to heaaaaaaaaaaaaaaaalp support those writers financially.—Kayt Molina, Medium member',
          id: 159869469164
        },
        {
          title: '你不知道的js',
          content: 'hello world ',
          id: 159869469164
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
      if (this.keywords == ''){
        return
      }
      this.loading = true
      this.searchResultList = []
      axios.post(`${BASE_URL}/search`, {
        keyword: this.keywords,
        size: 10,
        page: 1
      }).then(res => {
        this.loading = false
        if(res.data.status !== 200) {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
          return
        }
        this.searchResultList = res.data.data.data
      }).catch(err => {
        this.loading = false
        this.$message({
          message: err,
          type: 'error'
        })
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
    width: 1000px;
    padding-left: 220px;
    margin-top: 20px;
    /* margin-left: -210px; */
    overflow: hidden;
  }
  .result-item {
    margin-bottom: 15px;
    border: rgba(0,0,0,0) solid 1px;
    padding: 20px 30px;
    cursor: pointer;
  }
  .article-title {
    font-family: medium-content-sans-serif-font,"Lucida Grande","Lucida Sans Unicode","Lucida Sans",Geneva,Arial,sans-serif!important;
    font-size: 24px!important;
    font-weight: 600px;
    height: 40px;
    width: 600px;
    color: rgb(18 10 18 / 74%);
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
  .article-title:hover{
    text-decoration: underline;
  }
  .article-content {
    position: relative;
    font-size: 16px;
    font-weight: 400px;
    color: rgba(0,0,0,.54);
    /* height: 46px; */
    line-height: 23px;
    max-height: 46px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
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
    min-height: 900px;
    background: #eff;
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
    border: #fff 2px solid;
  }
  .searchbox:hover {
    border: #000 2px solid;
  }
  .searchbox:active {
    border: #000 2px solid;
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
    font-size: 20px;
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
.result-item:hover{
  border-radius: 5px;
}
.item-cover{
  width: 160px;
  height: 120px;
  display: inline-block;
  margin-left: -170px;
  background-color: #eee;
}
.item-content{
  display: inline-block;
  margin-left: 30px;
}
.item-cover-image{
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
@keyframes image-ani{
  0%{
    transform: scale(1, 1);
  }
  100%{
    transform: scale(1.1, 1.1);
  }
}
.item-cover-image:hover{
  animation: image-ani 0.4s linear;
  transform: scale(1.1, 1.1);
}
</style>
