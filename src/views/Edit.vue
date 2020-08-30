<template>
<el-container style="padding-top: 100px">
  <!-- <el-header>
  </el-header> -->
  <el-main style="padding-bottom: 0">
    <el-form :model='articleForm'  ref="articleForm" label-position='left'  class="demo-ruleForm">
      <el-form-item
        label="文章标题:"
        prop="articleTitle"
        :rules="[
          { required: true, message: '标题不能为空'},
        ]"
      >
        <el-input style='width: 400px' placeholder="请输入文章标题" v-model="articleForm.articleTitle"   autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item 
        label="文章类型:" 
        prop="articleType"
        :rules="[
          { required: true, message: '标题不能为空'},
        ]"
      >
        <el-radio-group v-model="articleForm.articleType">
          <el-radio label="1">知识分享</el-radio>
          <el-radio label="2">问题解决</el-radio> 
        </el-radio-group>
      </el-form-item>
    </el-form>
    <editor 
      :options="defaultOptions"
      height="395px"
      @change="onEditorChange"
      ref="toastuiEditor"
    />
    <el-button class="button-submit"  @click="submitForm('articleForm')" type="primary">发布文章</el-button>
  </el-main>
</el-container>
</template>

<script>
import axios from '../server/axios'
import { Button, Container, Header, Main, Form, FormItem } from 'element-ui'
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/vue-editor';
import BASE_URL from '@/server/config';
export default {
    components: {
      editor: Editor,
      'el-button': Button,
      'el-container': Container,
      'el-header': Header,
      'el-main': Main,
      'el-form': Form,
      'el-form-item': FormItem,
    },
  data() {
    return {
      articleForm: {
        articleTitle: '',
        articleType: '1'
      },
      defaultOptions: {
        minHeight: '560px',
        previewStyle: 'vertical',
        useCommandShortcut: true,
        useDefaultHTMLSanitizer: true,
        usageStatistics: false,
        hideModeSwitch: false,
        toolbarItems: [
          'heading',
          'bold',
          'italic',
          'strike',
          'divider',
          'hr',
          'quote',
          'divider',
          'ul',
          'ol',
          'task',
          'indent',
          'outdent',
          'divider',
          'table',
          'image',
          'link',
          'divider',
          'code',
          'codeblock'
        ]
      }
    }
  },

  methods: {
    getHtml() {
      const html = this.$refs.toastuiEditor.invoke('getHtml');
      return html
    },
    onEditorChange() {
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post(`${BASE_URL}/article`, {
            title: this.articleForm.articleTitle,
            content: this.getHtml(),
            author: 'tongtong',
            article_type: this.articleForm.articleType
          })
            .then(res => {
              if(res.data.status !== 200) {
                this.$message({
                  message: res.data.message,
                  type: 'error'
                })
                return
              }
              this.$message({
                message: '发布成功',
                type: 'success'
              })
            })
            .catch(err => {
              this.$message({
                message: '发布失败',
                type: 'error'
              });
          })
        } else {
          return false
        }
      });
    },
  }
}
</script>

<style scoped>
  .button-submit {
    float: right;
    margin: 20px 40px;
  }
</style>
