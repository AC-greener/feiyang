<template>
<el-container class="search-container" v-loading="loading">
  <div class="add-article">
  </div>
  <div class="searchbox">
    <el-dropdown :hide-on-click="false" class="btn-menu">
      <span class="el-dropdown-link">
        知识<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>知识</el-dropdown-item>
        <el-dropdown-item>方案</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <input v-model="keywords" id="search" type="text"
    placeholder="探索知识世界，从这里开始..." name="search" class="search"
    autocomplete="false"
    @keyup.enter="handleSearch">
    <button class="btn-search" @click="handleSearch">
      <i class="el-icon-search search-icon"></i>
    </button>
  </div>
  <div class="result-list">
    <el-row class="result-item"  v-for="(item, index) in searchResultList"  :key="index">
      <div class="item-cover">
        <img :src="baseUrl + item.cover.replace('/api','')" class="item-cover-image">
      </div>
      <div class="item-content">
        <div @click="toArticleDetail(item.id)" class="article-title">{{ item.title }}</div>
        <div class="article-content" v-html="item.content"></div>
      </div>
    </el-row>
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
      activeName: 'hot',
      baseUrl: `${BASE_URL}`,
      loading: false,
      searchResultList: [],
      hostList:[],
      latestList: []
    }
  },
  mounted() {
    var list = localStorage.getItem('searchResultList')
    if (list){
      this.searchResultList = JSON.parse(list)
    }
  },
  methods: {
    toArticleDetail(id) {
      this.$router.push('/article/' + id)
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    editArticle() {
      this.$router.push('/edit')
    },
    handleSearch() {
      if (this.keywords == ''){
        return
      }
      localStorage.removeItem('searchResultList')
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
        localStorage.setItem('searchResultList', JSON.stringify(this.searchResultList))
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
    width: 900px;
    padding-left: 220px;
    margin-top: 20px;
    /* margin-left: -210px; */
    overflow: hidden;
  }
  .result-item {
    margin-bottom: 15px;
    border: rgba(0,0,0,0) solid 1px;
    padding: 5px 30px;
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
    background: #50a392;
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
    margin-bottom: 30px;
    border: #fff 2px solid;
  }
  @keyframes add-bor{
    0%{
      border: #fff 2px solid;
    }
    100%{
      border: #000 2px solid;
    }
  }
  .searchbox:hover {
    animation: add-bor 0.5s linear;
    border: #000 2px solid;
  }
  .searchbox:active {
    animation: add-bor 0.2s linear;
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
.result-item:hover > .item-cover >.item-cover-image{
  animation: image-ani 0.4s linear;
  transform: scale(1.1, 1.1);
}
.result-item:hover > .item-content > .article-title{
  color: #000;
}
.result-item:hover > .item-content > .article-content{
  color: #000;
}
.item-cover{
  width: 160px;
  height: 110px;
  display: inline-block;
  margin-left: -170px;
  background-color: #eee;
}
.item-content{
  display: inline-block;
  margin-left: 30px;
  vertical-align: top;
  padding-top: 10px;
}
.item-cover-image{
  border-radius: 6px;
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
.el-tabs{
  outline: none;
  font-size: 20px;
}
.list-title{
  width: 600px;
}
.list-title-part-left{
  text-align: start;
  width: 49%;
  display: inline-block;
}
.list-title-part-right{
  text-align: start;
  width: 49%;
  display: inline-block;
}
.search-icon{
  font-size: 30px;
}
.search-icon:hover{
  font-size: 30px;
  font-weight: 900;
}
</style>
