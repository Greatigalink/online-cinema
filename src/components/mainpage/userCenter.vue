<template>
  <div id="userCenter">
    <el-tabs tab-position="left" style="margin-top: 80px;">
      <!-- <el-tab-pane label="个人信息">个人信息</el-tab-pane> -->
      <el-tab-pane label="订单管理">订单管理</el-tab-pane>
      <div v-if="loginState == 1">
       <Order></Order>
      </div>
      <div class="center-warning" v-else>
        <p>请先登录</p>
      </div>
    </el-tabs>
  </div>
</template>

<script>
import {Tabs,TabPane} from 'element-ui'
import {mapState} from 'vuex'
import order from '../component/userCenter/orderControl'
export default {
  name: 'userCenter',
  components: {
    ElTabs: Tabs,
    ElTabPane: TabPane,
    'Order': order
  },
  computed: {
    ...mapState({
      loginState: state => state.user.loginState
    })
  }
}
</script>

<style lang="scss" scoped>
#userCenter {
  margin-top: 50px;
  min-height: 550px;
  border: 1px #bdbdbd solid;
}
.center-warning {
  margin-top: 100px;
  font-size: 20px;
  color: #e57373;
  font-weight: bold;
}
</style>