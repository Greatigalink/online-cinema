<template>
  <div class="loginRegist-regist">

    <aside
      v-for="post in registInputs"
      :key="post.id"
      :post="post"
    >
      <input :type="post.id == 2 ? 'password' : 'text'" :placeholder="post.key" v-model="post.value"/>
      <b>{{warnings[post.id - 1]}}</b>
    </aside>

    <footer>
      <aside :style="{color: '#757575'}">其他</aside>
    </footer>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'regist',
  props: ['submitRegist'],
  data:() => {
    return {
      vnCode: 61,
      isSendVd: false,
      registInputs: [
        {id: 1, key : ['昵称'], value: ''},
        {id: 2, key : ['密码'], value: ''},
        {id: 3, key : ['常用手机号(非必填)'], value: ''},
        {id: 4, key : ['邮箱(非必填)'], value: ''}
      ],
      warnings: [
        '','','',''
      ]
    }
  },
  computed: {
    ...mapGetters('user',{
      checkN: 'checkName',
      checkP: 'checkPwd',
      checkT: 'checkTel',
      checkE: 'checkEmail'
    })
  },
  methods: {
    submitRegistMsg() {
      var registMsg = {
        nickname: this.registInputs[0].value,
        keyword: this.registInputs[1].value,
        tel_number: this.registInputs[2].value,
        email: this.registInputs[3].value
      }
      if(this.checkMsg()) {
        this.$store.commit('user/setRegistMsg', registMsg);
        this.$store.dispatch('user/registUser');
        // console.log(this.$store.state.user.registMsg);
      }
    },
    checkMsg() {
      var check = [];
      this.warnings = ['','','',''];
      check[0] = this.checkN(this.registInputs[0].value);
      check[1] = this.checkP(this.registInputs[1].value);
      check[2] = this.checkT(this.registInputs[2].value);
      check[3] = this.checkE(this.registInputs[3].value);
      if(check[0] == 0) this.$set(this.warnings,0,'用户名不能包含空格或者为空');
      if(check[1] == 0) this.$set(this.warnings,1,'密码不能包含空格或者为空');
      else if(check[1] == -1) this.$set(this.warnings,1,'密码长度不能小于5位');
      if(check[2] == -1) this.$set(this.warnings,2,'电话格式不正确');
      if(check[3] == -1) this.$set(this.warnings,3,'邮箱格式不正确');
      return (check[0] == 1 && check[1] == 1 && check[2] == 1 && check[3] == 1) ? true : false;
    }
  }
}
</script>

<style lang="scss" scoped>
.loginRegist-regist {
  margin: 17px 15% 0px 15%;
  padding: 1px;
  b {
    font-size: 9px;color: #ef5350;
  }
  footer {
    margin: 20px 0px 20px 0px;
    display: flex;
    aside {
      font-size: 13px;
      flex: 1;
      cursor: pointer;
    }
  }
}
</style>