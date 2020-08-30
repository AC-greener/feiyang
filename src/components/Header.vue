<template>
  <div class="header">
    <div class="logo">
      <el-image @click="home" src="/static/logo2.png" class="logo-icon"></el-image>
      <el-popover
      placement="bottom"
      title="知奇然用户"
      width="200"
      trigger="hover">
      <el-content>
        <el-button class="list-button-item" type="primary" v-if="hasLogin">
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
      <div class="user_avatar" slot="reference">知</div>
    </el-popover>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Header',
  data() {
    return {
      hasLogin: !!this.$store.userInfo.username
    }
  },
  methods: {
    home(){
      this.$router.push('/')
    }
    ,login(){
      this.$router.push('/login')
    },
    register(){
      this.$router.push('/regist')
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
}
 .logo-icon {
   width: 130px;
 }
 .user_avatar{
   width: 50px;
   height: 50px;
   line-height: 50px;
   text-align: center;
   color: #fff;
   font-size: 30px;
   float: right;
   border-style: none;
   background-color: #50a3a2;
   border-radius: 100px;
   border: #50a3a2 4px solid;
   margin-top: 50px;
   margin-right: 20px;
   padding: 0;
 }
 user_avatar:hover{
   background-color: #50a392;
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
</style>