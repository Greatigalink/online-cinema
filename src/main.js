// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/index.css'
import {Icon,Button,Message,Avatar,MessageBox} from 'element-ui';

axios.defaults.baseURL = 'http://212.64.90.182:5000';
Vue.config.productionTip = false;
Vue.use(VueAxios, axios)
Vue.use(Icon);
Vue.use(Button);
Vue.use(Avatar);
/* eslint-disable no-new */
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
