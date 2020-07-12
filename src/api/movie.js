import axios from 'axios'

export const playMsg = (moviename) => axios({ //根据条件请求相应的电影场次信息
  method: 'post',
  url: 'http://212.64.90.182:5000/movieInfo',
  data: moviename
}).then(res => {
  return res.data;
}).catch(err => {
  return err;
})

export const theOrder = (theOrder) => axios({
  method: 'post',
  url: 'http://212.64.90.182:5000/buy',
  data: theOrder
}).then(res => {
  return res.data;
}).catch(err => {
  return err;
})

export const submitCom = (comMsg) => axios({
  method: 'post',
  url: 'http://212.64.90.182:5000/commit',
  data: comMsg
}).then(res => {
  return res.data;
}).catch(err => {
  return err;
})

export const comList = (movie_id) => axios({
  method: 'post',
  url: 'http://212.64.90.182:5000/comment',
  data: movie_id
}).then(res => {
  return res.data;
}).catch(err => {
  return err;
})