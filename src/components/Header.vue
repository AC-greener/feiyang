<template>
  <div class="header">
    <div class="logo">
      <div style="display:inline-block;"  @click="home">
        <div class="logo-image">
          <div class="logo-image-inner">知</div>
        </div>
        <div class="sub-title">知奇然 知其所以然.</div>
      </div>
      <el-popover
      placement="bottom"
      title="知奇然用户"
      width="200"
      trigger="hover">
        <el-content>
          <el-button @click="editArticle" class="list-button-item" type="primary" v-if="hasLogin">
              <i class="el-icon-promotion icon"></i> 分享知识
          </el-button>
          <el-button class="list-button-item" type="primary" v-if="!hasLogin"
          @click="login">
              <i class="el-icon-s-help icon"></i> 用户登录
          </el-button>
          <el-button class="list-button-item" type="default" v-if="!hasLogin"
          @click="register">
              <i class="el-icon-s-custom icon"></i> 注册账号
          </el-button>
          <el-button class="list-button-item" type="default" v-if="hasLogin">
              <i class="el-icon-s-opportunity icon"></i> 退出登录
          </el-button>
        </el-content>
        <div class="user_avatar" slot="reference">
          <i class="el-icon-user-solid" v-if="!hasLogin"></i>
          <i class="el-icon-s-operation" v-if="hasLogin"></i>
        </div>
      </el-popover>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Header',
  data() {
    return {
      hasLogin: !!this.$store.state.userinfo.username
    }
  },
  mounted() {
    console.log(this.hasLogin)
  },
  methods: {
    home(){
      this.$router.push('/')
      localStorage.removeItem('searchResultList')
      localStorage.removeItem('keyword')
    }
    ,login(){
      this.$router.push('/login')
    },
    register(){
      this.$router.push('/regist')
    },
    editArticle() {
      this.$router.push('/edit')
    }
  }
}
</script>
<style scoped>
.header {
  /* height: 50px; */
  position: relative;
  /* margin-bottom: 100px; */
  width: 100%;
  border-style: none;
}
.header .logo {
  z-index: 2;
  cursor: pointer;
  position: absolute;
  top: -15px;
  width: 100%;
  left: -18px;
  border-style: none;
  height: 80px;
}
 .logo-icon {
   width: 130px;
 }
 .logo-image{
   background-color:#50a392;
   height: 54px;
   border-radius: 100px;
   border: #50a392 2px solid;
   width:54px;
   margin-left: 70px;
   margin-top: 30px;
 }
 .sub-title{
   margin-left: 30px;
   margin-top: 4px;
   color: #fff;
   background: #50a392;
   padding: 4px 10px;
   font-size: 15px;
 }
 .user_avatar{
   width: 50px;
   height: 50px;
   line-height: 50px;
   text-align: center;
   font-size: 30px;
   float: right;
   color: #fff;
   border-style: none;
   background-color: #50a3a2;
   border-radius: 100px;
   border: #fff 2px solid;
   margin-top: 30px;
   margin-right: 10px;
   padding: 0;
 }
 .user_avatar:hover{
   background-color: rgb(90,132,200);
 }
 .list-button-item{
   width: 100%;
   height: 40px;
   background-color: #50a3a2;
   margin: 5px 0 0 0;
   color: #fff;
  border-style: none;
 }
.list-button-item:hover{
   background-color: rgb(90,132,200);
}
.logo-image-inner{
  background-color:#50a392;
   height:50px;
   font-size: 40px;
   font-weight: 300;
   border-radius: 100px;
   border: #fff 2px solid;
   width:50px;
   color:#fff;
   text-align:center;
   line-height: 50px;
   display: inline-block;
}
</style>