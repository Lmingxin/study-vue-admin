<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li v-for="(item,index) in menuTab" :key="index" :class="{'current':item.current}"
          @click="toggleMenu(item)">{{item.text}}</li>
      </ul>
      <el-form :model="ruleForm" status-icon :rules="rules" label-position="top" ref="ruleForm"
        class="login-form" size="medium">
        <el-form-item label="邮箱" prop="username">
          <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input show-password type="password" v-model="ruleForm.password" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-row :gutter="11">
            <el-col :span="15">
              <el-input v-model.number="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button class="block" type="success">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit block" @click="submitForm('ruleForm')">登 录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { validateEmail,validatePass,validateVCode } from '@/utils/vaildate.js'
export default {
  name: "login",
  data() {

    return {
      menuTab: [
        { text: "登录",current: true },
        { text: "注册",current: false },
      ],
      ruleForm: {
        username: '',
        password: '',
        code: ''
      },
      rules: {
        username: [
          { validator: validateEmail,trigger: 'blur' }
        ],
        password: [
          { validator: validatePass,trigger: 'blur' }
        ],
        code: [
          { validator: validateVCode,trigger: 'blur' }
        ]
      }
    }

  },
  mounted() {

  },
  methods: {
    toggleMenu(data) {
      console.log(data);
      this.menuTab.forEach((item,index) => {
        item.current=false
      });
      data.current=true;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

  },
}
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
  .menu-tab {
    text-align: center;
    li {
      display: inline-block;
      width: 88px;
      line-height: 36px;
      font-size: 14px;
      color: #fff;
      border-radius: 2px;
      cursor: pointer;
    }
    .current {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
  .login-form {
    .block {
      display: block;
      width: 100%;
    }
    .submit {
      margin-top: 29px;
    }
  }
}
</style>
<style lang="scss">
.login-form {
  margin-top: 29px;
  > .el-form-item {
    margin-bottom: 13px;
    > .el-form-item__label {
      margin-bottom: 3px;
      color: #fff;
      font-size: 14px;
      padding: 0;
    }
  }
}
</style>

