<template>
  <div class="user-container">

    <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>确认删除文章《{{deleteArticle.title}}》吗？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmDelete()">确 定</el-button>
  </span>
</el-dialog>

    <div style="height:70px"></div>
    <div class="user-main-body">

      <el-row :gutter="25">
        <el-col :span="openCal ? 8 : 1" style="position:fixed">
          <div class="user-info" style="padding:0">
            <el-calendar :range="['2019-07-04', '2019-09-24']" v-if="openCal">
              <template
                slot="dateCell"
                slot-scope="{date, data}">
                {{ data.day.split('-').slice(2)[0] }}
                <el-popover
                  v-if="dealMyDate(data.day) && dealMyDate(data.day) != '&'"
                  placement="top"
                  width="200"
                  trigger="hover">
                  <p style="color:#000">
                    今日提交数量：{{dealMyDate(data.day).split('&')[0]}}<br>
                    今日通过数量：{{dealMyDate(data.day).split('&')[1]}}
                  </p>
                  <div slot="reference"> <!--这里原本有动态绑定的class，去掉-->
                    <p>
                    <div style="width:100%;height:100%;">
                      <span class="number" style="color:rgb(56,85,157);" v-if="dealMyDate(data.day).split('&')[0] != undefined">
                      {{dealMyDate(data.day).split('&')[0]}}</span>
                      <span v-if="dealMyDate(data.day).split('&').length > 1">|</span>
                    <span class="number" style="color:#50a392" v-if="dealMyDate(data.day).split('&')[1] != undefined">
                      {{dealMyDate(data.day).split('&')[1]}}</span>
                    </div>
                    </p>
                  </div>
                </el-popover>
              </template>
            </el-calendar>
            <i class="el-icon-caret-left colapse" @click="closeCalendar" v-if="openCal"></i>
            <div v-if="!openCal">
              <i class="el-icon-s-claim open" @click="openCalendar"></i>
            </div>
            <div v-if="!openUser">
              <i class="el-icon-user-solid open" @click="openUserFun"></i>
            </div>
          </div>
        </el-col>

        <el-col :span="openCal ? 16 : 23" style="float:right">
          <div class="user-info" style="padding: 20px;" v-if="openUser">
            <el-row :gutter="20">
              <el-col :span="8">
                <div>
                  <div class="user-avatar"><i class="el-icon-user-solid" 
                  style="font-size:70px;line-height:90px;color:#50a392"></i></div>
                  <div class="user-name">{{user}}</div>
                </div>
              </el-col>
              <el-col :span="16">
                <div class="float-right" v-if="!openCal" @click="closeUser">&lt;&lt;收起</div>
                <div class="user-data">
                  <el-row :gutter="20">
                    <el-col :span="8">
                      <div class="data-num">{{total}}</div>
                      <div class="data-name">总文章数</div>
                    </el-col>
                    <el-col :span="8">
                      <div class="data-num" style="color:rgb(56,85,157);">
                        {{today}}
                      </div>
                      <div class="data-name">今日提交</div>
                    </el-col>
                    <el-col :span="8">
                      <div class="data-num" style="color: #50a392;">
                        {{today_pass}}
                      </div>
                      <div class="data-name">今日通过</div>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>
          <div style="margin-top:20px"></div>
          <el-row :gutter="20" v-loading="loading">
          <el-col :span="24" v-for="item in historyArticleList" :key="item.id" class="article-item">
            <div class="article-item-box">
             
              <div class="user-atricle-title" @click="viewDetails(item.id)"> 《{{item.title}}》</div>
              <div class="user-article-time">
                {{user}} 于
                {{item.created_at.split('T')[0]}} {{item.created_at.split('T')[1].substr(0,8)}} 
                发布在
                <font color="#000">{{type_interp[item.article_type]}}</font>
                <el-tag :style="'color:#fff;background-color:' + colors[Number(item.status)]">
                  {{dict[item.status]}}
                </el-tag>
                <el-button size="small" type="default" @click="deleteArticleFunc(item)">删除</el-button>
              </div>
              <div @click="viewDetails(item.id)" v-html="item.content" style="max-height:200px" class="user-article-content"></div>
            </div>
          </el-col>
        </el-row>
        </el-col>

      </el-row>

    </div>
  </div>
</template>
<script>
import BASE_URL from '@/server/config';
import axios from '../server/axios'
export default {
  data() {
    return {
      openCal: true,
      openUser: true,
      loading: false,
      user: localStorage.getItem('user'),
      resDate: [],
      passDate: [],
      counting: [],
      total: 0,
      today: 0,
      dialogVisible: false,
      today_pass: 0,
      colors: ['','#888','#409EFF','#67C23A', '#ff3300'],
      dict: ['','待审核','审核中','审核通过','未过审'],
      type_interp: ['','知识分享','解决方案'],
      page: 1,
      deleteArticle: {},
      size: 10,
      historyArticleList: []
    }
  },
  mounted(){
    this.loadData()
  },
  methods: {
    closeUser(){
      this.openUser = false
    },
    openUserFun(){
      this.openUser = true
    },
    closeCalendar(){
      this.openCal = false
    },
    openCalendar(){
      this.openCal = true
      this.openUser = true
    },
    viewDetails(id){
      this.$router.push('/article/' + id)
    },
    loadData(){
      this.loading = true
      axios.post(`${BASE_URL}/article/history`, {
        page: this.page,
        size: this.size
      }).then(res =>{
        if(res.data.status !== 200) {
            this.$message({
              message: res.data.message,
              type: 'error'
            })
            return
          }
          this.historyArticleList = res.data.data.data.article_data
          this.today = res.data.data.data.today_count
          this.total = res.data.data.count
          this.today_pass = res.data.data.today_pass
          for (let i in res.data.data.data.data_count){
            let cnt = res.data.data.data.data_count[i]
            if (cnt > 0){
              this.resDate.push({
                "date": i,
                "total": cnt
              })
            }
          }
          for (let i in res.data.data.data.pass_count){
            let cnt = res.data.data.data.pass_count[i]
            if (cnt > 0){
              this.passDate.push({
                "date": i,
                "pass": cnt
              })
            }
          }
          this.loading = false
      }).catch(err => {
        this.$message({
          message: err,
          type: 'error'
        })
        this.loading = false
      })
    },
    deleteArticleFunc(article){
      this.deleteArticle = article
      this.dialogVisible = true
    },
    confirmDelete(){
      axios.delete(`${BASE_URL}/article`, {
        id: this.deleteArticle.id
      }).then(res =>{
        this.$message({
          message: res.data.message,
          type: res.data.status == 200 ? 'success' : 'error'
        })
        this.deleteArticle = {}
        this.dialogVisible = false
      }).catch(err => {
        this.$message({
          message: err,
          type: 'error'
        })
        this.deleteArticle = {}
        this.dialogVisible = false
      })
    },
    dealMyDate(v) {
      let len = this.resDate.length
      let res = ""
      for(let i=0; i<len; i++){
        if(this.resDate[i].date == v) {
          res = this.resDate[i].total + '&' + this.passDate[i].pass
          break
        }
      }
      return res
    }
  },
}
</script>

<style>
.user-container{
  background-color: #50a392;
  min-height: 900px;
}
.user-main-body{
  width: 96%;
  margin-left: 2%;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.article-item{
  margin-bottom: 20px;
}
.article-item-box{
  background-color: #fff;
  padding: 5px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
}
.article-item-box:hover{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.4)
}
.user-avatar{
  width: 90px;
  height: 90px;
  background-color: #ddd;
  border-radius: 6px;
  margin: 0 auto;
}
.user-name{
  margin-top: 10px;
  font-size: 20px;
  color: #000;
}
.user-info{
  background-color: #fff;
  padding: 5px;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 30px 20px;
  text-align: center;
}
.user-data{
  margin-top: 50px;
}
.data-name{
  font-size: 15px;
}
.data-num{
  font-size: 30px;
  font-weight: 600;
}
.user-info .number{
  color: #ff3300;
  font-size: 14px;
}
.float-right{
  float: right;
  color: #50a392;
  font-size: 14px;
  cursor: pointer;
}
.user-article-content{
  overflow: hidden;
  padding: 10px;
}
.user-atricle-title{
  font-size: 30px;
  font-weight: 700;
}
.user-article-time{
  margin-left: 10px;
  color: #888;
  font-size: 15px;
}
.colapse{
  float:right;
  margin-top:-350px;
  cursor: pointer;
  font-size: 35px;
  margin-right: -10px;
}
.colapse:hover{
  color: #50a392;
  font-size: 38px;
}
.open{
  cursor: pointer;
  font-size: 30px;
  color: #50a392;
}
.open:hover{
  font-size: 31px;
}
</style>
