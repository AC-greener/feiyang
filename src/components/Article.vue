<template>
<el-container class="article-container">
  <el-header>
  </el-header>
  <el-main class="article-main ">
    <div class="like" @click='handleLikeClick'>
      <svg style="fille: red; color: blue" class="icon guzhang" aria-hidden="true">
        <use xlink:href="#icon-guzhang2"></use>
      </svg>
      <span style="margin-left: 36px;margin-top: 11px;font-size: 14px;color: rgb(117, 117, 117">{{this.star}}</span>
    </div>
    <el-row class="article-row " :gutter="10">
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
      star: ''
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
    width: 70%;
    padding-left: 150px;
    padding-right: 150px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    margin-bottom: 50px;
    position: relative;
  }

  .article-row {
    position: relative;
  }
  .article-main .like {
    z-index: 1;
    position: absolute;
    left: 0;
    top: 156px;
  }
  .article-main .like * {
    position: fixed;
  }
</style>