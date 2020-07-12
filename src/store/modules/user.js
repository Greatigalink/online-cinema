import {loginNameVerify,userRegist} from '@/api/user'
import cookie from 'js-cookie'

const state = {
  loginState: -99,
  registResult: -99,
  nameVerify: {
    nickname: null,
    keyword: null
  },
  phoneVerify: {
    tel_number: null,
    authCode: null
  },
  registMsg: {
    nickname: null,
    keyword: null,
    tel_number: null,
    email: null
  },
  userMsg: {
    id: null,
    nickname: null,
    poster: null,
    email: null,
    tel_number: null
  }
}

const mutations = {
  setLoginState(state, loginState) {
    state.loginState = loginState;
  },
  setRegistResult(state, registResult) {
    state.registResult = registResult;
  },
  setNameVerify(state, nameVerify) {
    state.nameVerify = nameVerify;
  },
  setPhoneVerify(state, phoneVerify) {
    state.phoneVerify = phoneVerify;
  },
  setRegistMsg(state, registMsg) {
    state.registMsg = registMsg;
  },
  setUserMsg(state, userMsg) {
    state.userMsg = userMsg;
  },
  reSetMsg(state) {
    state.loginState = -99;
    state.nameVerify = {
      nickname: null,
      keyword: null
    }
  },
  reMoveCookie(state) {
    cookie.remove('nameVerify');
  }
}

const actions = {
  loginName({commit}) {
    loginNameVerify(state.nameVerify).then(res => {
      // console.log(res);
      if(res == 0) commit('setLoginState', 0);
      else if(res == 2) commit('setLoginState', 2);
      else if(res.nickname == state.nameVerify.nickname){
        commit('setLoginState', 1);
        commit('setUserMsg', res);
        cookie.set('nameVerify',state.nameVerify,{expires:3});
      }
      else commit('setLoginState', -1);
    }).catch(err => {
      commit('setLoginState', -2);
    })
  },

  registUser({commit}) {
    userRegist(state.registMsg).then(res => {
      // console.log('服务端' + res);
      if(res == 0) commit('setRegistResult',0);
      else if(res.nickname == state.registMsg.nickname){
        var nameVerify = {
          nickname: state.registMsg.nickname,
          keyword: state.registMsg.keyword
        }
        commit('setRegistResult',1);
        commit('setLoginState', 1);
        commit('setUserMsg', res);
        cookie.set('nameVerify',nameVerify,{expires:3});
      }
      else commit('setRegistResult',-1);
    }).catch(err => {
      commit('setRegistResult',-2);
    })
  }
}

const getters = {
  checkName: (state) => (name) => {
    var checkMsg = 1;
    var name = name;
    if(/\s/.test(name) == true || name === ''){
      checkMsg = 0;
    }
    return checkMsg;
  },
  checkPwd: (state) => (pwd) => {
    var checkMsg = 1;
    var pwd = pwd;
    if(/\s/.test(pwd) == true || pwd == '') checkMsg = 0;
    else if(pwd.length < 5) checkMsg = -1;
    return checkMsg;
  },
  checkContent: (state) => (con) => {
    var checkMsg = 1;
    var content = con.replace(/\s/g,'');
    if(content.length == 0){
      checkMsg = 0;
    }
    return checkMsg;
  },
  checkTel: (state) => (tel) => {
    var checkMsg = 1;
    var tel = tel;
    if(/1[0-9]{10}/g.test(tel) == false && tel != '') checkMsg = -1;
    return checkMsg;
  },
  checkEmail: (state) => (email) => {
    var checkMsg = 1;
    var email = email;
    var reg = /[a-zA-Z0-9_]+@[0-9a-zA-Z]+\.(com|net)/g;
    if(reg.test(email) == false && email != '') checkMsg = -1;
    return checkMsg;
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};