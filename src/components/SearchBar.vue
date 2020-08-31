<template>
  <el-container class="search-container" v-loading="loading">

    <div style="margin-top: 60px;color: #fff;font-size:130px;font-weight:800"
    v-show="!searchResultList.length && !showImptyTips">{{now}}</div>
    <div class="searchbox" :style="!searchResultList.length && !showImptyTips?'':'margin-top:150px;'">
      <el-autocomplete
        class="search-input"
        v-model="keywords"
        :fetch-suggestions="getSearchRecommend"
        placeholder="探索知识世界，从这里开始..."
        :trigger-on-focus="false"
        @change="handleSearch"
      ></el-autocomplete>
      <button class="btn-search" @click="handleSearch">
        <i class="el-icon-search search-icon"></i>
      </button>
    </div>
    <!-- 热门推荐 -->
    <el-row :gutter="30" v-show="!searchResultList.length && !showImptyTips" class="hot-list">
      <el-col :span="11" v-show="hostList.length" style="margin-left: 70px;">
        <span>知奇然热搜榜:</span>
        <div class='hot-item-wrapper'>
          <div class="hot-item" v-for="(item, index) in hostList" :key="index" @click="toArticleDetail(item.id)">
            {{index+1}}.&nbsp;&nbsp;{{item.title}}
          </div>
        </div>
      </el-col>
      <el-col :span="11" v-show="latestList.length">
        <span>知奇然最新榜:</span>
        <div class="hot-item"  v-for="(item, index) in latestList" :key="index" @click="toArticleDetail(item.id)">
          {{index+1}}.&nbsp;&nbsp;{{item.title}}
        </div>
      </el-col>
    </el-row>
    <div class="result-list">
      <el-row class="result-item"  v-for="(item, index) in searchResultList"  :key="index">
        <div class="item-cover" @click="toArticleDetail(item.id)">
          <img :src="baseUrl + item.cover.replace('/api','')" class="item-cover-image">
        </div>
        <div class="item-content" @click="toArticleDetail(item.id)" >
          <div class="article-title">{{ item.title }}</div>
          <div class="article-content" >{{item.content.replace(/<[^>]+>/g, '')}}</div>
          <div class="article-author">作者：{{item.author}} 时间：
            {{(!item.time || item.time.length == 1 || item.time.length < 10) ? '2020-08-30' : item.time.split(' ')[0].split('T')[0]}}</div>
        </div>
      </el-row>
    </div>
    
    <div v-show="showImptyTips">
      没有找到您要搜索的内容，换个词试一试吧~
    </div>
    <el-pagination
      :hide-on-single-page="1"
      class="search-paginaton"
      @current-change='handleCurrentChange'
      @prev-click="handleCurrentChange"
      @next-click="handleCurrentChange"
      :page-size="10"
      layout="prev, pager, next"
      :total="this.totalLength">
    </el-pagination>
  </el-container>
</template>

<script>
import BackGround from '@/components/Background'
import { Container, Button, Row, Autocomplete, Pagination } from 'element-ui'
import axios from '../server/axios'
import BASE_URL from '@/server/config'
import aioxs from 'axios';
export default {
  components: {
    'el-container': Container,
    'el-button': Button,
    'el-row': Row,
    'el-autocomplete': Autocomplete,
    'el-pagination': Pagination,
    BackGround
  },
  name: 'SearchBar',
  data() {
    return {
      keywords: '',
      activeName: 'hot',
      now: '',
      baseUrl: `${BASE_URL}`,
      loading: false,
      searchResultList: [],
      hostList:[],
      latestList: [],
      totalLength: 1,
      currentPage: 1,
      showImptyTips: false
    }
  },
  mounted() {
    this.getLatestList()
    this.getHotList()
    this.updateNow()
    this.searchResultList = this.$store.state.searchHistory
    window.setInterval(()=> {
      this.updateNow()
    },1000)
    window.setInterval(()=> {
      this.getHotList()
      this.updateNow()
    },60000)
  },
  methods: {
    updateNow(){
      var today=new Date()
      var h=today.getHours()
      var m=today.getMinutes()
      var s=today.getSeconds()
      if (h < 10){
        h = '0' + h
      }
      if (m < 10) {
        m = '0' + m
      }
      if (s < 10){
        s = '0' + s
      }
      this.now = h + ':' + m + ':' + s
    },
    getHotList() {
      aioxs.get(`${BASE_URL}/ranking?type=hot`)
        .then(res => {
          if(res.data.data) {
            this.hostList = res.data.data.reverse().slice(0, 10)
          }
        })
        .catch(err => {
          this.$message({
            message: err,
            type: 'error'
          })
        })
    },
    getLatestList() {
      aioxs.get(`${BASE_URL}/ranking?type=latest`)
        .then(res => {
          if(res.data.data) {
            this.latestList = res.data.data.reverse().slice(0, 10)
          }
        })
        .catch(err => {
          this.$message({
            message: err,
            type: 'error'
          })
        })
    },
    getSearchRecommend(keyword, cb) {
      axios.post(`${BASE_URL}/search/hints`, {
        keyword
      })
      .then(res => {
        const result = []
        res.data.data.forEach((item, index) => {
          result.push({value: item})
        })
        cb(result)
      })
      .catch(err => {
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    toArticleDetail(id) {
      this.$router.push('/article/' + id)
    },
    handleClick(tab, event) {
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
        page: this.currentPage
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
        this.totalLength = res.data.data.count
        if(this.totalLength === 0) {
          this.showImptyTips = true
        }
        this.$store.commit('changeSearchHistory', {
          searchHistory: this.searchResultList
        })
      }).catch(err => {
        this.loading = false
        this.$message({
          message: err,
          type: 'error'
        })
      })
    },
    handleCurrentChange(currentSize) {
      this.currentPage = currentSize
      this.handleSearch()
    }
  }
}
</script>

<style scoped >
  .icon {
      width: 1em; height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
  }
  .hot-list {
    margin-top: 40px;
    width: 850px;
    font-family: medium-content-sans-serif-font,"Lucida Grande","Lucida Sans Unicode","Lucida Sans",Geneva,Arial,sans-serif!important;
    color: white;
  }
  .hot-list span {
    color: white;
    font-weight: 400;
    font-size: 19px;
  }
  .hot-list .hot-item{
    /* display: inline-block; */
    font-size: 14px;
    cursor: pointer;
    margin: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .hot-list .hot-item:hover{
    border-bottom: 1px solid white;
    /* text-decoration: underline; */
  }
  .search-container .search-paginaton, .search-container .search-paginaton button{
    background: #50a392;
  }
  .search-container-bg{
    background-image: linear-gradient(to top right, blue, pink);
  }
  .search-input {
    margin-left: 3px;
    margin-top: 5px;
  }
  .border {
    border: 1px solid red;
  }
  .result-list {
    width: 900px;
    padding-left: 220px;
    margin-top: 20px;
    overflow: hidden;
  }
  .result-item {
    margin-bottom: 15px;
    border: rgba(0,0,0,0) solid 1px;
    padding: 0 30px;
    cursor: pointer;
  }
  .article-title {
    font-family: medium-content-sans-serif-font,"Lucida Grande","Lucida Sans Unicode","Lucida Sans",Geneva,Arial,sans-serif!important;
    font-size: 24px!important;
    font-weight: 600px;
    height: 40px;
    width: 700px;
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
    width: 700px;
    font-weight: 400px;
    color: rgba(0,0,0,.54);
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
    min-height: 100vh;
    background: #50a392;
    position: relative;
    display: flex;
    flex-direction: column; 
    align-items: center;
    padding-bottom: 60px;
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
    margin-top: 20px;
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
      border: #251e1eb0 2px solid;
    }
  }
  .searchbox:hover {
    animation: add-bor 0.5s linear;
    border: #251e1eb0 2px solid;
  }
 
  .searchbox:active {
    animation: add-bor 0.5s linear;
    border: #251e1eb0 2px solid;
  }
  .searchbox>.btn-menu {
    padding: 20px 16px 16px 16px;
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
  transform: scale(1.1);
}
.article-author{
  color: #222;
  font-size: 15px;
}
.rank-item:hover{
  text-decoration: underline;
}
</style>
