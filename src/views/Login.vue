<template>
  <div class="wrapper">
    <div class="container">
      <h1>Welcome Login</h1>
      <form class="form">
        <input required v-model='loginForm.username' type="text" placeholder="Username">
        <input required v-model='loginForm.password' type="password" placeholder="Password">
        <button @click="login"  :loading='loginForm.loading'>Login</button>
      </form>
    </div>
    <ul class="bg-bubbles">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script>
// import axios from 'axios'
import axios from '../server/axios'
import { Form, FormItem } from 'element-ui'
import BASE_URL from '@/server/config';
export default {
  name: 'Login',
  components: {
    'el-form': Form,
    'el-form-item': FormItem
  },
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        loading: false
      }
    }
  },
  mounted() {

  },
  methods: {
    login() {
      if (!this.loginForm.username.endsWith('@360.cn')){
        this.$message({
            message: '请使用公司邮箱登录！',
            type: 'error'
          })
          return
      }
      if (this.loginForm.password.length > 30 || this.loginForm.password.length < 6){
        this.$message({
            message: '用户密码长度6~30！',
            type: 'error'
          })
          return
      }
      this.loginForm.loading = true
      axios.post(`${BASE_URL}/login`, {
        user: this.loginForm.username,
        password: this.loginForm.password
      })
      .then(res => {
        this.loginForm.loading = false
        if(res.data.status !== 200) {
          this.$message({
            message: res.data.message,
            type: 'error'
          })
          return
        }
        axios.defaults.headers.common['Authorization'] = res.data.data
        this.$store.commit('changeUserInfo', {
          username: this.loginForm.username
        })
        localStorage.setItem('user', this.loginForm.username)
        localStorage.setItem('token', res.data.data)
        setTimeout(() => {
          this.$router.push('/')
        }, 1000)
        this.$message({
          message: '登录成功，即将跳转到首页~',
          type: 'success'
        })
      })
      .catch(err => {
        this.loginForm.loading = false
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
@import url(https://fonts.googleapis.com/css?family=Source+Sans+Pro:200,300);
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-weight: 300;
}

.wrapper {
  color: white;
  background: #50a3a2;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.wrapper.form-success .container h1 {
  transform: translateY(85px);
}
.container {
  margin-top: -100px;
  max-width: 600px;
  padding: 80px 0;
  text-align: center;
  color: white;
}
.container h1 {
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 40px;
  transition-duration: 1s;
  transition-timing-function: ease-in-put;
  font-weight: 200;
}
form {
  padding: 20px 0;
  position: relative;
  z-index: 2;
}
form input {
  appearance: none;
  outline: 0;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background-color: rgba(255, 255, 255, 0.2);
  width: 250px;
  border-radius: 3px;
  padding: 10px 15px;
  margin: 0 auto 10px auto;
  display: block;
  text-align: center;
  font-size: 18px;
  color: white;
  transition-duration: 0.25s;
  font-weight: 300;
}
form input:hover {
  background-color: rgba(255, 255, 255, 0.4);
}
form input:focus {
  background-color: white;
  width: 300px;
  color: #53e3a6;
}
form button {
  appearance: none;
  outline: 0;
  background-color: white;
  border: 0;
  padding: 10px 15px;
  color: #53e3a6;
  border-radius: 3px;
  width: 250px;
  cursor: pointer;
  font-size: 18px;
  transition-duration: 0.25s;
}
form button:hover {
  background-color: #f5f7f9;
}
.bg-bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.bg-bubbles li {
  position: absolute;
  list-style: none;
  display: block;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.15);
  bottom: -160px;
  animation: square 25s infinite;
  transition-timing-function: linear;
}
.bg-bubbles li:nth-child(1) {
  left: 10%;
}
.bg-bubbles li:nth-child(2) {
  left: 20%;
  width: 80px;
  height: 80px;
  animation-delay: 2s;
  animation-duration: 17s;
}
.bg-bubbles li:nth-child(3) {
  left: 25%;
  animation-delay: 4s;
}
.bg-bubbles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-duration: 22s;
  background-color: rgba(255, 255, 255, 0.25);
}
.bg-bubbles li:nth-child(5) {
  left: 70%;
}
.bg-bubbles li:nth-child(6) {
  left: 80%;
  width: 120px;
  height: 120px;
  animation-delay: 3s;
  background-color: rgba(255, 255, 255, 0.2);
}
.bg-bubbles li:nth-child(7) {
  left: 32%;
  width: 160px;
  height: 160px;
  animation-delay: 7s;
}
.bg-bubbles li:nth-child(8) {
  left: 55%;
  width: 20px;
  height: 20px;
  animation-delay: 15s;
  animation-duration: 40s;
}
.bg-bubbles li:nth-child(9) {
  left: 25%;
  width: 10px;
  height: 10px;
  animation-delay: 2s;
  animation-duration: 40s;
  background-color: rgba(255, 255, 255, 0.3);
}
.bg-bubbles li:nth-child(10) {
  left: 90%;
  width: 160px;
  height: 160px;
  animation-delay: 11s;
}
@-webkit-keyframes square {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-700px) rotate(600deg);
  }
}
@keyframes square {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-700px) rotate(600deg);
  }
}

</style>