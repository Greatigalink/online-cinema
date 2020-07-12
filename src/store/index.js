import Vue from 'vue'
import Vuex from 'vuex'
import movie from './modules/movie'
import user from './modules/user'
import cookie from 'js-cookie'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginCookie: cookie.get('nameVerify')
  },
  getters: {
    getNowDate(){
      var d = new Date();
      var month = (d.getMonth()+1).toString();
      var day = d.getDate().toString();
      var hour = d.getHours().toString();
      var minutes = d.getMinutes().toString();
      month = month.length === 1 ? ('0' + month) : month;
      day = day.length === 1 ? ('0' + day) : day;
      hour = hour.length === 1 ? ('0' + hour) : hour;
      minutes = minutes.length === 1 ? ('0' + minutes) : minutes;
      var timeYMD = d.getFullYear() + '-' + month + '-' + day;
      var timeHM = hour + ':' + minutes;
      return timeYMD + ' ' + timeHM;
    }
  },
  modules: {
    movie,
    user
  },
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})