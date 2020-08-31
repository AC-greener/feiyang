<template>
  <div class="header">
    <div class="logo">
      <div style="display:inline-block;"  @click="home">
        <div class="logo-image">
          <i class="el-icon-s-home"></i> 知奇然
        </div>
      </div>
      <el-popover
      placement="bottom"
      width="200"
      trigger="hover">
        <div>
          <el-button @click="editArticle" class="list-button-item" type="primary" v-if="hasLogin">
              <i class="el-icon-s-promotion icon"></i> 分享知识
          </el-button>
          <el-button @click="userCenter" class="list-button-item" type="primary" v-if="hasLogin">
              <i class="el-icon-user-solid icon"></i> 用户中心
          </el-button>
          <el-button class="list-button-item" type="primary" v-if="!hasLogin"
          @click="login">
              <i class="el-icon-s-help icon"></i> 用户登录
          </el-button>
          <el-button class="list-button-item" type="default" v-if="!hasLogin"
          @click="register">
              <i class="el-icon-s-custom icon"></i> 注册账号
          </el-button>
          <el-button @click="logout"  class="list-button-item" type="default" v-if="hasLogin">
              <i class="el-icon-s-opportunity icon"></i> 退出登录
          </el-button>
        </div>
        <div class="user_avatar" slot="reference">
          <i class="el-icon-user-solid" v-if="!hasLogin"></i>
          <i class="el-icon-s-operation" v-if="hasLogin"></i>
        </div>
      </el-popover>
    </div>
  </div>
</template>
<script>
import { Popover } from 'element-ui'
import axios from '../server/axios'
import BASE_URL from '@/server/config';
export default {
  name: 'Header',
  components: {
    'el-popover': Popover
  },
  data() {
    return {
      // hasLogin: !!this.$store.state.userinfo.username
    }
  },
  computed: {
    hasLogin() {
      console.log(!!this.$store.state.userinfo.username)
      return !!this.$store.state.userinfo.username
    }
  },
  mounted() {
  },
  methods: {
    home(){
      var refresh = this.$route.path == '/'
      this.$router.push('/')
      localStorage.removeItem('searchResultList')
      localStorage.removeItem('keyword')
      if (refresh){
        this.$router.go(0)
      }
    },
    login(){
      this.$router.push('/login')
    },
    register(){
      this.$router.push('/regist')
    },
    userCenter(){
      this.$router.push('/user')
    },
    editArticle() {
      this.$router.push('/edit')
    },
    logout() {
      axios.post(`${BASE_URL}/logout`)
        .then(res => {
          if(res.data.status !== 200) {
            this.$message({
              message: res.data.message,
              type: 'error'
            })
            return
          }
          this.$message({
            message: '退出成功',
            type: 'success'
          })
          localStorage.removeItem('user')
          localStorage.removeItem('token')
          this.$store.commit('logout')
          this.$router.push('/')
        })
        .catch(err => {
          this.$message({
            message: err,
            type: 'error'
          })
        })
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
  position: fixed;
  top: -15px;
  width: 100%;
  left: -18px;
  border-style: none;
  height: 80px;
  /* background: #50a392; */
}
 .logo-icon {
   width: 130px;
 }
 .logo-image{
   background-color:#50a392;
   border-radius: 100px;
   padding: 4px 10px;
   border: #50a392 2px solid;
   margin-left: 40px;
   color: #fff;
   font-size: 23px;
   margin-top: 30px;
 }
 .logo-image:hover{
   color: #104352;
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
   height: 50px;
   line-height: 50px;
   text-align: center;
   font-size: 30px;
   float: right;
   color: #fff;
   border-style: none;
   background-color: #50a3a2;
   border-radius: 100px;
   margin-top: 30px;
   margin-right: 10px;
   padding: 0 10px;
 }
 .user_avatar:hover{
   color: #104352;
 }
 .list-button-item{
   width: 100%;
   font-size: 16px;
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