<template>
  <div class="loginRegist-login">

    <aside
      v-for="post in loginInputs"
      :key="post.id"
      :post="post"
    >
      <input :type="post.id == 1 ? 'text' : 'password'" :placeholder="loginWays ? post.key[0] : post.key[1]" v-model="post.value"/>
      <b>{{post.id == 1 ? nameWarning : keywordWarning}}</b>
      <el-button 
        v-if="!loginWays && post.key[1] == '验证码'" 
        type="primary" 
        size="mini"
        style="display: block;"
        :disabled="isSendVd"
        @click="sendVnCode"
        plain
        round
      >
        发送验证码
        <span>{{vnCode &lt;= 60 ? vnCode + 's' : ''}}</span>
      </el-button>
    </aside>
    
    <footer>
      <aside :style="{color: loginWays ? '#29b6f6' : '#757575'}" @click="loginWays = true">账号密码</aside>
      <aside :style="{color: loginWays ? '#757575' : '#29b6f6'}" @click="loginWays = false">手机验证码</aside>
      <aside :style="{color: '#757575'}">其他</aside>
    </footer>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'

export default {
  name: 'login',
  props: ['submitLogin'],
  data:function() {
    return {
      loginWays: true,
      loginMsg: [],
      vnCode: 61,
      isSendVd: false,
      loginInputs: [
        {id: 1, key: ['昵称','手机号'], value: ''},
        {id: 2, key: ['密码','验证码'], value: ''}
      ],
      nameWarning: '',
      keywordWarning: ''
    }
  },
  computed: {
    ...mapState({
      loginState: state => state.user.loginState,
      nameVerify: state => state.user.nameVerify
    })
  },
  methods: {
    sendVnCode() {
      var timer = null;
      this.vnCode--;
      this.isSendVd = true;
      timer = setInterval(() => {
        if(this.vnCode > 0) this.vnCode--;
        else {
          this.vnCode = 61;
          this.isSendVd = false;
          clearInterval(timer);
        }
      },1000);
    },
    submitMsg() {
      var nameVerify = {
        nickname: this.loginInputs[0].value,
        keyword: this.loginInputs[1].value
      }
      if(this.loginWays) {
        if(this.checkMsg()) {
          this.$store.commit('user/setNameVerify',nameVerify);
          this.$store.dispatch('user/loginName');
        }
      }
      else {
        this.$store.commit('user/setLoginState',-10);
      }
    },
    checkMsg() {
      var nameCheck = this.$store.getters['user/checkName'](this.loginInputs[0].value);
      var pwdCheck = this.$store.getters['user/checkPwd'](this.loginInputs[1].value);
      this.nameWarning = nameCheck ? '' : '用户名不能为空或包含空格';
      if(pwdCheck == 0) this.keywordWarning = '密码不能为空或包含空格'
      else if(pwdCheck == -1) this.keywordWarning = '密码长度不能小于5位'
      return (nameCheck == 1 && pwdCheck == 1) ? true : false;
    }
  }
}
</script>

<style lang="scss" scoped>
.loginRegist-login {
  margin: 20px 17% 0px 17%;
  padding: 1px;
  b {
    font-size: 9px;color: #ef5350;
  }
  footer {
    margin: 30px 0px 30px 0px;
    display: flex;
    aside {
      font-size: 13px;
      flex: 1;
      cursor: pointer;
    }
  }
}
</style>