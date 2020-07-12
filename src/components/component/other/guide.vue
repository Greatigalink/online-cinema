<template>
  <div 
    class="guide" 
    :style="{backgroundColor: this.$route.path == '/loginRegist' ? 'white' : ''}"
  >

    <section>
      <aside 
        :style="{color: this.$route.path == '/home' ? '#f57c00' : '#212121'}"
        @click="jumpRoute('home')"
      >
        <i class="el-icon-s-home"></i> 首页
      </aside>
      <aside title="未开发">
        <i class="el-icon-film"></i> 影厅
      </aside>
      <aside
        :style="{color: this.$route.path == '/buyMovie' ? '#f57c00' : '#212121'}"
        @click="jumpRoute('buyMovie')"
      >
        <i class="el-icon-shopping-cart-2"></i> 购票
      </aside>
    </section>

    <footer>
      <section>
        <b v-show="loginState == 1">Hi ~ &nbsp;&nbsp;{{this.userMsg.nickname}}</b>
        <router-link v-show="loginState != 1" to="/loginRegist">
          <el-button type="primary" round>登录 | 注册</el-button>
        </router-link>
      </section>

      <section>
        <el-dropdown @command="handleCommand">
          <el-avatar :src="getAvatar()"></el-avatar>
          <el-dropdown-menu v-if="loginState == 1" slot="dropdown">
            <el-dropdown-item command="center">个人中心</el-dropdown-item>
            <el-dropdown-item command="exit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
          <el-dropdown-menu v-else slot="dropdown">
            <el-dropdown-item>请先登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </section>
      
    </footer>
    
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {Dropdown,DropdownMenu,DropdownItem} from 'element-ui'
export default {
  name: 'Guide',
  components: {
    ElDropdown: Dropdown,
    ElDropdownMenu: DropdownMenu,
    ElDropdownItem: DropdownItem
  },
  data:() => {
    return {
      defaultAvatar: require('../../../assets/images/defaultAvatar.png'),
      loginAvatar: 'http://101.37.83.157:3000/images/iconimg/loginAvatar.png'
    }
  },
  computed: {
    ...mapState({
      loginState: state => state.user.loginState,
      userMsg: state => state.user.userMsg
    })
  },
  methods: {
    jumpRoute(s) {
      this.$router.push({
        path: '/' + s,
        name: s
      })
    },
    getAvatar() {
      if(this.loginState != 1) return this.defaultAvatar;
      else if(this.userMsg.poster == null && this.loginState == 1) return this.loginAvatar;
      else return this.userMsg.poster;
    },
    handleCommand(command) {
      switch(command) {
        case 'exit': this.open();break;
        case 'center': this.jumpCenter();break;
      }
    },
    jumpCenter() {
      if(this.$route.path != '/userCenter') {
        this.$router.push({
          path: '/userCenter',
          name: 'userCenter'
        });
      }
    },
    open() {
        this.$confirm('退出登录将会清除本地登录信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '已退出!',
          });
          this.$store.commit('user/reSetMsg');
          this.$store.commit('user/reMoveCookie');
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消退出'
          });          
        });
    }
  },
  created() {
    var loginCookie = this.$store.state.loginCookie;
    if(loginCookie != undefined) {
      this.$store.commit('user/setNameVerify',JSON.parse(loginCookie))
      this.$store.dispatch('user/loginName');
      // console.log(JSON.parse(loginCookie))
    }
  }
}
</script>

<style lang="scss" scoped>
.guide {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 50px;
  display: flex;
  animation: guide 0.5s;
  section:nth-child(1) {
    flex: 0.3;
    display: flex;
    padding-left: 1%;
    aside {
      flex: 1.5;
      color: #212121;
      font-size: 14px;
      font-weight: bold;
      letter-spacing: 2px;
      padding-top: 15px;
      border-bottom: 3px white solid;
      transition: all 0.8s;
      cursor: pointer;
    }
    aside:hover {
      border-bottom-color:#f57c00;
    }
    @media screen and (min-width: 450px) and (max-width: 1024px) {
      flex: 0.8;
    }
  }
  footer {
    flex: 1;
    padding: 5px 0px 0px 0px;
    display: flex;
    section:nth-child(1) {
      margin:0px 5px 0px auto;
      flex: 0.4;
      a {
        margin-left: auto;
      }
      b {
        margin: 11px 0px 0px auto;
        font-size: 14px;
        color: #f57c00;
      }
    }
    section:nth-child(2) {
      margin:0px 37px 0px 5px;
      span {background-color: white;}
      div {cursor: pointer;}
    }
  }
  @keyframes guide {
    from {top: -50px; opacity: 0;}
    to {top: 0px; opacity: 1;}
  }
}
</style>