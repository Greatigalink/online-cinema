import cookie from 'js-cookie'
const state = {
  reqTag: [
    {key: '类型', value: '全部'},
    {key: '地区', value: '全部'},
    {key: '年份', value: '全部'}
  ],
  movieMsg: {}
}

const mutations = {
  setterReqTag(state, payload) {
    state.reqTag = payload.reqTag;
  },
  setterMovieMsg(state, movieMsg) {
    state.movieMsg = movieMsg;
    cookie.set('movieMsg',state.movieMsg,{expires:1});
  }
}

const getters = {
  getMovieMsg: (state) => (s) => {
    return cookie.get('movieMsg');
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
};