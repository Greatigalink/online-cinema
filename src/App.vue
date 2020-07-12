<template>
  <div id="app">
    <router-view></router-view>
    <Guide></Guide>
    <Bottom></Bottom>
    <el-backtop style="background-color: #757575;color: white;"><i class="el-icon-upload2"></i></el-backtop>
  </div>
</template>

<script>
import Guide from '../src/components/component/other/guide'
import Bottom from '../src/components/component/other/bottom'
import {Backtop} from 'element-ui'
export default {
  name: 'App',
  components: {
    'Guide': Guide,
    'Bottom': Bottom,
    ElBacktop: Backtop
  }
}
</script>

<style>
body {
  margin: 0px;
  padding: 0px;
  overflow-y: auto !important;
  padding-right: 0 !important;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
