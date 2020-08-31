<template>
<el-container class="article-container" v-loading="loading">
  <el-header>
  </el-header>
  
  <div v-show="showBackTop" class="backTop" @click="handleBackTopClick">
    <i class= "el-icon-caret-top" style="font-size:40px;line-height:50px;"></i>
    <div><span style="font-size: 14px;color:#fff">顶部</span></div>
  </div>
  <div class="like-btn" @click='handleLikeClick'>
    <i class='el-icon-star-on like-start' style="font-size:40px;line-height:50px;color:#fff"></i>
    <div><span style="font-size: 14px;color:#fff">{{this.star}}赞</span></div>
  </div>
  <el-main class="article-main">
    <el-row class="article-row" :gutter="10">
      <el-col :span="24">
        <h1 class="article-title">
          {{this.title}}
        </h1>
        <div v-html="this.content">

        </div>
      </el-col>
    </el-row>
  </el-main>
  <el-footer>
  </el-footer>
</el-container>
</template>

<script>
import axios from '../server/axios'
import BASE_URL from '@/server/config'
import { Row, Col, Container, Header, Footer ,Main, Backtop } from 'element-ui';
export default {
  components: {
    'el-row': Row,
    'el-col': Col,
    'el-header': Header,
    'el-main': Main,
    'el-footer': Footer,
    'el-backtop': Backtop
  },
  data() {
    return {
      loading: true,
      id: this.$route.params.id,
      title: '',
      content: '',
      star: 0,
      isLike: false,
      showBackTop: false
    }
  },

  mounted() {
    this.getArticleInfo()
    this.scrollListener()
  },
  destroyed() {
    this.removeScrollListener()
  },
  methods: {
    scrollListener() {
      document.addEventListener('scroll', () => {
        if(document.documentElement.scrollTop > 200) {
          this.showBackTop = true
        } else {
          this.showBackTop = false
        }
      })
    },
    removeScrollListener() {
      document.removeEventListener('scroll', this.scrollListener)
    },
    handleBackTopClick() {
      window.scroll({
        top: 0,
        behavior: 'smooth'
      });
    },
    getArticleInfo() {
      axios.get(`${BASE_URL}/article?id=${this.id}`)
        .then(res => {
          this.loading = false
          if(res.data.status !== 200) {
            this.$message({
              message: res.data.message,
              type: 'error'
            })
            return
          }
          this.title = res.data.data.title
          this.content = res.data.data.content
          this.star = res.data.data.star
        })
        .catch(err => {
          this.$message({
            message: err,
            type: 'error'
          })
          this.loading = false
        })
    },
    handleLikeClick() {
      this.isLike = true
      axios.get(`${BASE_URL}/article/like?id=${this.id}`)
        .then(res => {
          if(res.data.status !== 200) {
            this.$message({
              message: res.data.message,
              type: 'error'
            })
            return
          }
          this.$message({
            message: res.data.message,
            type: 'success'
          })
          this.getArticleInfo()
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped >
  .icon {
    cursor: pointer;
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  .icon.guzhang {
    width: 2em;
    height: 2em;
  }
 
  h1.article-title { 
    line-height: 48px;
    font-size: 32px;
    font-family: medium-content-title-font, Georgia, Cambria, "Times New Roman", Times, serif;
  }
  p {
    font-family: medium-content-serif-font, Georgia, Cambria, "Times New Roman", Times, serif;
    color: rgba(41, 41, 41, 1);
    font-size: 21px;
    line-height: 32px;
  }

  .article-main {
    width: 900px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    margin-bottom: 50px;
    background: white;
    border: 5px solid white;
    border-radius: 5px ;
  }
  .article-container {
    min-height: 100vh;
    background: #50a392;
    position: relative;
  }
  .article-container .like {
    position: fixed;
    top: 250px;
    right: 6px;
    padding-right: 10px;
    height: 60px;
    text-align: start;
    padding-left: 5px;
    font-size: 20px;
    color: #fff;
    vertical-align: top;
    border-radius: 8px;
    cursor: pointer;
  }
  .backTop {
    position: fixed;
    bottom: 110px;
    right: 60px;
    width: 50px;
    height: 50px;
    text-align: center;
    border-radius: 100px;
    border: #fff 2px solid;
    color: white;
    cursor: pointer;
  }
  .backTop:hover{
    background-color: #208392;
  }
  @keyframes like-ani{
    0%{
      background-color: #fff;
      /* color: #50a3a2; */
    }
    100%{
      background-color: #50a3a2;
      /* color: #fff; */
    }
  }
  .like:hover{
    animation: like-ani 0.5s linear;
    /* background-color: #50a3a2;
    color: #fff; */
  }
  .like-btn{
    position:fixed;
    right: 60px;
    bottom: 200px;
    border: #fff solid 2px;
    width: 50px;
    height: 50px;
    text-align: center;
    border-radius: 100px;
    cursor:pointer;
  }
  .like-btn:hover>.like-start{
    color: #FFD700;
  }
  .like-btn:hover{
    background-color: #208392;
  }
</style>