<template>

  <div class="login-container">
    <el-form ref="loginForm"
             :model="loginForm"
             :rules="loginRules"
             class="login-form"
             auto-complete="on"
             label-position="left">
      <el-form-item prop="email">
        <el-input ref="email"
                  v-model="loginForm.name"
                  placeholder="Email"
                  name="email"
                  type="text"
                  tabindex="1"
                  auto-complete="on">
          <span slot="prefix"
                class="prefix-icon">
            <svg-icon icon-class="email" />
          </span>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input :key="passwordType"
                  ref="password"
                  v-model="loginForm.password"
                  :type="passwordType"
                  placeholder="Password"
                  name="password"
                  tabindex="2"
                  auto-complete="on"
                  @keyup.enter.native="handleLogin">
          <span slot="prefix"
                class="prefix-icon">
            <svg-icon icon-class="password" />
          </span>
          <span slot="suffix"
                class="show-pwd"
                @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-input>
      </el-form-item>

      <div class="tip">
        还没有账号？
        <router-link to="/account/register">
          <span class="to-register">去注册</span>
        </router-link>
        <router-link :to="{name: 'ResetPassword'}">
          <span class="to-reset">找回密码</span>
        </router-link>
      </div>

      <el-button class="login-btn"
                 :loading="loading"
                 type="primary"
                 style="width:100%;"
                 @click.native.prevent="handleLogin">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    const validateEmail = (rule, value, callback) => {
      if (!validEmail(value)) {
        callback(new Error('请输入正确的合法邮箱'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        name: '',
        password: ''
      },
      loginRules: {
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        password: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  created() {
    this.redirect = this.$route.query.redirect
    console.log(this.redirect)
    if (this.redirect === '/login' || this.redirect === '/register' || this.redirect === '/resetPassword') {
      this.redirect = '/'
    }
  },  
  methods: {
    async GetMessage () {
      try {
        await this.$service.notification.Get.call(this)
      } catch (error) {
        this.$service.errorHandle.call(this, error)
      }
    },
    validEmail(str) {
      // return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(str)
      return /^[a-z0-9A-Z]+[- | a-z0-9A-Z._\+]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(
        str
      )
    },
        showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('user/login/pass', this.loginForm)
            .then(() => {
              //this.$router.push({ path: this.redirect || '/' })
              this.GetMessage()
              this.$router.push({ name: 'Tab' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
  //  ,
  // async mounted () {
  //   if (this.$route.query) {
  //     let query = this.$route.query
  //     try {
  //       await this.$service.user.Login.call(this, query.code, query.state)
  //       this.GetMessage()
  //       this.$router.push({ name: 'Tab' })
  //     } catch (error) {
  //       this.$service.errorHandle.call(this, error, message => {
  //         this.$notify.error({
  //           title: message
  //         })
  //       })
  //     }
  //   } else {
  //     this.$router.push({ name: 'NotLogin' })
  //   }
  // }
}
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  height: auto;
  width: 100%;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 80%;
    max-width: 100%;
    padding: 20px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .prefix-icon {
    font-size: 14px;
    margin-left: 5px;
  }

  .show-pwd {
    margin-right: 15px;
  }

  .tip {
    font-size: 15px;
    .to-register {
      color: lightskyblue;
    }
    .to-reset {
      color: lightskyblue;
      float: right;
    }
  }

  .login-btn {
    margin-top: 22px;
    margin-bottom: 50px;
  }
}
</style>