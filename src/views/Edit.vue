<template>
<el-container style="padding-top: 50px">
  <!-- <el-header>
  </el-header> -->
  <el-main>
    <h1>文章标题:</h1> 
    <el-form :model='articleForm'  ref="articleForm" label-position='left'  class="demo-ruleForm">
      <el-form-item
        prop="articleTitle"
        :rules="[
          { required: true, message: '标题不能为空'},
        ]"
      >
        <el-input style='width: 400px' placeholder="请输入文章标题" v-model="articleForm.articleTitle"   autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <editor 
      :options="defaultOptions"
      height="560px"
      @change="onEditorChange"
      ref="toastuiEditor"
    />
    <el-button class="button-submit"  @click="submitForm('articleForm')" type="primary">发布文章</el-button>
  </el-main>
</el-container>
</template>

<script>
import aioxs from 'axios'
import { Button, Container, Header, Main, Form, FormItem } from 'element-ui'
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/vue-editor';
import axios from 'axios';
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
      this.getHtml()
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getHtml()
          axios.post(`${BASE_URL}/article`, {
            title: this.articleForm.articleTitle,
            content: this.getHtml(),
            author: 'tongtong'
          })
            .then(res => {
              this.$message({
                message: '发布成功',
                type: 'success'
              });
            console.log(res)
          })
            .catch(err => {
              this.$message({
                message: '发布失败',
                type: 'success'
              });
          })
        } else {
          return false;
        }
      });
    },
  }
}
</script>

<style scoped>
  .button-submit {
    float: right;
    margin: 30px 40px;
  }
</style>
