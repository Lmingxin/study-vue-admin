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
          <el-input show-password type="password" placeholder="请输入密码" v-model="ruleForm.password"
            autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="passwords" v-if="model === 'register'">
          <el-input show-password type="password" placeholder="请再次输入密码" v-model="ruleForm.passwords"
            autocomplete="off">
          </el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-row :gutter="11">
            <el-col :span="15">
              <el-input v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
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
import sha1 from 'js-sha1'
import { onMounted,reactive,ref } from '@vue/composition-api'
import { validateEmail,validatePass,validateVCode } from '@/utils/vaildate.js'
import { GetSms,Register,Login } from '@/axios/api/login'
export default {
  name: "login",
  setup(props,context) {  //主入口，data,生命周期，methods等

    //定义数据=================================================================
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
    const timer=ref(null);

    //生命周期函数=============================================================
    onMounted(() => { })

    //定义函数=================================================================

    //登录、注册模块切换事件
    const toggleMenu=((data) => {
      console.log(data);
      menuTab.forEach((item,index) => {
        item.current=false
      });
      data.current=true;
      model.value=data.type;
      //恢复验证码按钮初始状态
      clearInterval(timer.value);
      codeButtonStatic.dis=false;
      codeButtonStatic.text="获取验证码";
      //重置表单
      context.refs["ruleForm"].resetFields();
    })

    //表单提交事件
    const submitForm=((formName) => {
      context.refs[formName].validate((valid) => {
        if(valid) {
          //发送注册请求
          if(model.value=="register") {
            if(ruleForm.passwords!=ruleForm.password) {
              context.root.$message({
                message: '请确认两次输入的密码是否一致',
                type: 'error'
              })
              return
            }
            Register({
              username: ruleForm.username,
              password: sha1(ruleForm.password),
              code: ruleForm.code,
              module: model.value
            }).then(res => {
              console.log(res);
              context.root.$message({
                message: res.message,
                type: 'success'
              })
              //注册成功，调用模块切换事件
              toggleMenu(menuTab[0])
            })
          } else {
            //发送登录请求
            Login({
              username: ruleForm.username,
              password: sha1(ruleForm.password),
              code: ruleForm.code,
            }).then(res => {
              context.root.$message({
                message: res.message,
                type: 'success'
              })
              //重置表单
              context.refs["ruleForm"].resetFields();
            });

          }
        } else {
          console.log('请填写信息');
          return false;
        }
      });
    })

    //获取验证码
    const GetSmsReq=(() => {

      //判断邮箱格式是否有误
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
      //改变验证码按钮状态
      codeButtonStatic.dis=true;
      codeButtonStatic.text="发送中";

      //发送获取验证码请求
      GetSms({ username: ruleForm.username,module: model.value }).then(res => {
        console.log(res);
        context.root.$message({
          message: res.message,
          type: 'success'
        });
      }).catch(e => {
        context.root.$message({
          message: e.message,
          type: 'error'
        });
      })

      //开始倒计时
      countDown(60);
    })
    //验证码倒计时
    const countDown=((number) => {

      //在某些情况下定时器已经有了，但是按钮还可点，就会出现多个定时器。会造成按钮倒计时数字的混乱
      if(timer.value) clearInterval(timer.value);

      let time=number;
      timer.value=setInterval(() => {
        time--;
        if(time===0) {
          clearInterval(timer.value);
          codeButtonStatic.text="重新获取";
          codeButtonStatic.dis=false;
        } else {
          codeButtonStatic.text=`倒计时${time}秒`
        }

        console.log(time);
      },1000)
    })


    //3.0    要在视图上使用的数据、方法必须return出去
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

