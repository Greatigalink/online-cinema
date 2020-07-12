<template>
  <div id="loginRegist">
    <div class="loginRe-content">
      <img src="../../assets/images/logo.png"/>

      <div v-if="loginState == 1" class="login-true">
        <i class="el-icon-circle-check"> 已登录</i>
      </div>

      <div v-else>
        <header>
          <section :style="{color: logOrRe ? '#29b6f6' : '#757575'}" @click="logOrRe = true"><i class="el-icon-s-custom"></i>登录</section>
          <section :style="{color: logOrRe ? '#757575' : '#29b6f6'}" @click="logOrRe = false"><i class="el-icon-s-order"></i>注册</section>
        </header>

        <div>
          <section v-if="logOrRe">
            <Login ref="login"></Login>
          </section>
          <section v-else>
            <Regist ref="regist"></Regist>
          </section>
        </div>

        <footer class="logRe-submit">
          <el-button type="primary" icon="el-icon-user" @click="loginOrRe">{{logOrRe ? '登录' : '注册'}}</el-button>
        </footer>
      </div>
      

      
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import login from '../component/loginRegist/login'
import regist from '../component/loginRegist/regist'

export default {
  name: 'loginRegist',
  components: {
    'Login': login,
    'Regist': regist
  },
  data:function() {
    return {
      logOrRe: true,
      submitLogin: false,
      submitRegist: false
    }
  },
  computed: {
    ...mapState({
      loginState: state => state.user.loginState,
      registResult: state => state.user.registResult
    })
  },
  watch: {
    loginState:function(n,o) {
      if(n != -99) {
        if(this.logOrRe)this.openLogin();
      }
    },
    registResult:function(n,o) {
      if(n != -99) {
        this.openRegist();
      }
    }
  },
  methods: {
    loginOrRe() {
      if(this.logOrRe) {
        if(this.loginState != 1) this.$store.commit('user/setLoginState',-99);
        this.$refs.login.submitMsg();
      }
      else {
        if(this.registResult != 1) this.$store.commit('user/setRegistResult',-99); 
        this.$refs.regist.submitRegistMsg();
      }
    },
    //登录判断
    openLogin() {
      var msg,type;
      switch(this.loginState) {
        case 1 : msg = (this.logOrRe ? '登录' : '注册') + '成功，自动跳转';type = 'success'; break;
        case 0 : msg = '密码错误';type = 'error';break;
        case -1 : msg = '请求服务器超时,无法登陆';type = 'error';break;
        case 2 : msg = '该用户未注册';type = 'warning';break;
      }
      this.$message({
        showClose: true,
        message: msg,
        type: type
      });
      if(this.loginState == 1) this.jumpHome();
      else this.$store.commit('user/setLoginState',-99); 
    },
    //注册判断
    openRegist() {
      var msg,type;
      // console.log(this.registResult);
      switch(this.registResult) {
        case 1 : msg = (this.logOrRe ? '登录' : '注册') + '成功，自动跳转';type = 'success'; break;
        case 0 : msg = '该用户已被注册';type = 'warning';break;
        case -1 : msg = '请求服务器超时,无法注册';type = 'error';break;
        case -2 : msg = '服务器出错请重试';type = 'warning';break;
      }
      this.$message({
        showClose: true,
        message: msg,
        type: type
      });
      if(this.registResult == 1) this.jumpHome();
      else this.$store.commit('user/setRegistResult',-99); 
    },
    jumpHome() {
      this.$router.push({
        path: '/home',
        name: 'home'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#loginRegist {
  min-height: 630px;
  padding: 1px 1px 20px 1px;
  background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
}
.loginRe-content {
  margin: 110px 37% 0px 37%;
  box-shadow: 5px 5px 10px #bdbdbd;
  border-radius: 10px;
  padding: 1px;
  background-color: white;
  img {
    margin-top: 20px;
  }
  header {
    display: flex;
    margin-top: 20px;
    section {
      flex: 1;
      font-size: 17px;
      letter-spacing: 5px;
      font-weight: bold;
      cursor: pointer;
    }
  }
  @media screen and (min-width: 450px) and (max-width: 960px){
    margin: 130px 15% 0px 15%;
  }
  @media screen and (max-width: 430px){
    margin: 130px 2% 0px 2%;
  }
}
.logRe-submit {
  margin-bottom: 20px;
}
.login-true {
  color: green;
  font-size: 20px;
  margin: 50px 0px 100px 0px;
}
</style>