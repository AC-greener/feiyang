<template>
<el-container class="article-container">
  <el-header>
  </el-header>
  <div class="like" @click='handleLikeClick'>
    <i class="el-icon-s-opportunity" style="font-size:30px;line-height:55px;"></i>
    <span>{{this.star}} 人喜欢</span>
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
import { Row, Col, Container, Header, Footer ,Main } from 'element-ui';
export default {
  components: {
    'el-row': Row,
    'el-col': Col,
    'el-header': Header,
    'el-main': Main,
    'el-footer': Footer
  },
  data() {
    return {
      id: this.$route.params.id,
      title: '',
      content: '',
      star: 0
    }
  },
  mounted() {
    this.getArticleInfo()
  },
  methods: {
    getArticleInfo() {
      axios.get(`${BASE_URL}/article?id=${this.id}`)
        .then(res => {
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
        })
    },
    handleLikeClick() {
      axios.get(`${BASE_URL}/article/like?id=${this.id}`)
        .then(res => {
          if(res.data.status !== 200) {
            return
          }
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
    fill: red;
  }
  .guzhang.active {
    fill: blue;
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
  .border {
    border: 1px solid red;
  }
  .article-main {
    width: 800px;
    /* width: 62%; */
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    margin-bottom: 50px;
  }
  .article-container {
   position: relative;
  }
  .article-container .like {
    position: fixed;
    top: 250px;
    padding-right: 10px;
    height: 60px;
    border: #50a3a2 solid 2px;
    text-align: start;
    padding-left: 5px;
    font-size: 20px;
    color: #50a3a2;
    vertical-align: top;
    border-radius: 8px;
    left: 10px;
    cursor: pointer;
  }
  @keyframes like-ani{
    0%{
      background-color: #fff;
      color: #50a3a2;
    }
    100%{
      background-color: #50a3a2;
      color: #fff;
    }
  }
  .like:hover{
    animation: like-ani 0.5s linear;
    background-color: #50a3a2;
    color: #fff;
  }
</style>