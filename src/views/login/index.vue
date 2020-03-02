<template>
  <div class='login'>
    <!-- 表单 -->
    <el-card class='login-card'>
      <!-- 表单内容 -->
      <!-- 头部logo部分 -->
       <div class='title'>
         <img src="../../assets/img/logo_index.png" alt="">
       </div>
       <!-- 表单 -->
       <el-form ref="myForm" :model="loginForm" :rules="loginRules" style="margin-top:20px">
         <!-- 表单容器 -->
         <el-form-item prop="mobile">
           <!-- 表单域 -->
           <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
         </el-form-item>
         <!-- 验证码 -->
         <el-form-item prop="code">
           <el-input v-model="loginForm.code" style="width:60%" placeholder="请输入验证码"></el-input>
           <!-- 放置一个按钮 -->
           <el-button style="float:right" plain>发送验证码</el-button>
         </el-form-item>
         <!-- 表单域 -->
         <el-form-item prop="checken">
           <!-- 是否同意被人家坑 -->
           <el-checkbox v-model="loginForm.checken">我已阅读同意用户协议和隐私条款</el-checkbox>
         </el-form-item>
         <!-- 按钮 -->
         <el-form-item>
           <el-button @click="login" style="width:100%" type="primary">登录</el-button>
         </el-form-item>
       </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        checken: false // 协议
      },
      loginRules: { // 验证规则
        mobile: [{ required: true, message: '您的手机号不能为空' },
          { pattern: /^1[3-9]\d{9}$/, message: '您手机号格式不对' }
        ],
        code: [
          { required: true, message: '验证码不能为空' },
          { pattern: /^\d{6}$/, message: '验证码应是六位' }
        ],
        checken: [{
          validator: function (rule, value, callback) {
            value ? callback() : callback(new Error('您没勾选协议'))
          }
        }]
      }
    }
  },
  methods: {
    login () {
      this.$refs.myForm.validate(function (isOk) {
        if (isOk) {
          console.log('验证成功')
        }
      })
    }
  }
}
</script>

<style lang='less' scoped>
// 加了scoped属性 就只会对当前自己的组件起作用
// 如果需要写less 需要在style标签中 lang='less'
.login {
  background-image: url('../../assets/img/login_bg.jpg');
  height: 100vh;// 当前屏幕可视区域分成100份
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width:440px;
    height: 340px;
    .title {
      text-align: center;
      img {
         height: 40px;
      }
    }
  }
}
</style>
