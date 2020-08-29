<template>
<el-container class="article-container">
  <el-header>
    header
  </el-header>
  <div class="like" @click='handleLikeClick'>
    <svg class="icon guzhang" aria-hidden="true">
      <use xlink:href="#icon-guzhang2"></use>
    </svg>
    <span style="color: rgb(117, 117, 117">100</span>
  </div>
  <el-main class="article-main">
    <el-row class="article-row" :gutter="10">
      <el-col :span="24">
        <h1 class="article-title">
          Detect Faces, Texts, and Even Barcodes with Chrome’s Shape Detection API
        </h1>
        <p>
          As a web developer, we would have had many instances where we were required to install external libraries to handle the detection of elements such as faces,text, and barcode. This was because there was no web standard API for developers to utilize.
        </p>
        <p>
          Tip: Use Bit (Github) to share, document, and manage reusable React components from different projects.
           It’s a great way to increase code reuse, speed up development, and build apps that scale.
        </p>
        <p>
          Tip: Use Bit (Github) to share, document, and manage reusable React components from different projects.
           It’s a great way to increase code reuse, speed up development, and build apps that scale.
        </p>
        <p>
          Tip: Use Bit (Github) to share, document, and manage reusable React components from different projects.
           It’s a great way to increase code reuse, speed up development, and build apps that scale.
        </p>
        <p>
          Tip: Use Bit (Github) to share, document, and manage reusable React components from different projects.
           It’s a great way to increase code reuse, speed up development, and build apps that scale.
        </p>
        <p>
          Tip: Use Bit (Github) to share, document, and manage reusable React components from different projects.
           It’s a great way to increase code reuse, speed up development, and build apps that scale.
        </p>
        <p>
          Tip: Use Bit (Github) to share, document, and manage reusable React components from different projects.
           It’s a great way to increase code reuse, speed up development, and build apps that scale.
        </p>
        <p>
          Tip: Use Bit (Github) to share, document, and manage reusable React components from different projects.
           It’s a great way to increase code reuse, speed up development, and build apps that scale.
        </p>
      </el-col>
    </el-row>
  </el-main>
  <el-footer>
    footer
  </el-footer>
</el-container>

</template>

<script>
import axios from 'axios'
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
      id: this.$route.params.id
    }
  },
  mounted() {
    this.getArticleInfo()
  },
  methods: {
    getArticleInfo() {
      
      axios.get(`${BASE_URL}/article/${this.id}`)
        .then(res => {

        })
        .catch(err => {
          console.log(err)
        })
    },
    handleLikeClick() {
      axios.get(`${BASE_URL}/article/like/id?=${this.id}`)
        .then(res => {

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
    top: 260px;
    left: 220px;
  }
</style>