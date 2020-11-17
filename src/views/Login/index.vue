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
          <el-input v-model="ruleForm.username" placeholder="请输入邮箱" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input show-password type="password" placeholder="请输入密码" v-model="ruleForm.password" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="passwords" v-show="model === 'register'">
          <el-input show-password type="password" placeholder="请再次输入密码" v-model="ruleForm.passwords" autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-row :gutter="11">
            <el-col :span="15">
              <el-input v-model.number="ruleForm.code" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button @click="GetSmsReq()" :disabled="codeButtonStatic.dis" class="block"
                type="success">{{codeButtonStatic.text}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit block" @click="submitForm('ruleForm')">
            {{ model === 'login' ? "登 录" : "注 册" }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

import { onMounted,reactive,ref } from '@vue/composition-api'
import { validateEmail,validatePass,validateVCode } from '@/utils/vaildate.js'
import { GetSms } from '@/axios/api/login'
export default {
  name: "login",
  setup(props,context) {  //主入口，data,生命周期，methods等
    //定义数据
    const menuTab=reactive([  //reactive创建响应式对象类型数据
      { text: "登录",current: true,type: "login" },
      { text: "注册",current: false,type: "register" },
    ])
    const model=ref("login");
    const codeButtonStatic=reactive({
      dis: false,
      text: "获取验证码"
    });
    const ruleForm=reactive({
      username: '',
      password: '',
      code: '',
      passwords: ""
    })
    const rules=reactive({
      username: [
        { validator: validateEmail,trigger: 'blur' }
      ],
      password: [
        { validator: validatePass,trigger: 'blur' }
      ],
      passwords: [
        { validator: validatePass,trigger: 'blur' }
      ],
      code: [
        { validator: validateVCode,trigger: 'blur' }
      ]
    })
    const i=ref(0)  //ref创建响应式基础类型数据
    console.log(menuTab);
    console.log(ruleForm); //.value获取值

    //生命周期函数
    onMounted(() => {

    })

    //定义函数
    const toggleMenu=((data) => {
      console.log(data);
      menuTab.forEach((item,index) => {
        item.current=false
      });
      data.current=true;
      model.value=data.type;
      context.refs["ruleForm"].resetFields();
    })
    const submitForm=((formName) => {
      context.refs[formName].validate((valid) => {
        if(valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    })
    const GetSmsReq=(() => {
      if(ruleForm.username=='') {
        context.root.$message({
          message: '邮箱不能为空！',
          type: 'error'
        });
        return
      }
      if(!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(ruleForm.username)) {
        context.root.$message({
          message: '邮箱格式有误！',
          type: 'error'
        });
        return
      }
      codeButtonStatic.dis=true;
      codeButtonStatic.text="发送中";

      GetSms({ username: ruleForm.username,module: model.value }).then(res => {
        console.log(res);
        context.root.$message({
          message: res.message,
          type: 'success'
        });
        codeButtonStatic.dis=false;
        codeButtonStatic.text="获取验证码";
      }).catch(e => {
        context.root.$message({
          message: e.message,
          type: 'error'
        });
        codeButtonStatic.value=false;
        codeButtonStatic.text="获取验证码";
      })


    })

    return {
      menuTab,
      toggleMenu,
      submitForm,
      ruleForm,
      model,
      rules,
      GetSmsReq,
      codeButtonStatic
    }
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

