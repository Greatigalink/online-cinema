import {get,post} from './index'
import axios from 'axios'

export const loginNameVerify = (loginMsg) => axios({
  method: 'post',
  url: 'http://212.64.90.182:5000/customer',
  data: loginMsg
}).then(res => {
  return res.data;
}).catch(err => {
  return err;
})

export const userRegist = (registMsg) => axios({
  method: 'post',
  url: 'http://212.64.90.182:5000/register',
  data: registMsg
}).then(res => {
  return res.data;
}).catch(err => {
  return err;
})

export const userOrder = (user) => axios({
  method: 'post',
  url: 'http://212.64.90.182:5000/order',
  data: user
}).then(res => {
  return res.data;
}).catch(err => {
  return err;
})

export const reFund = (delMsg) => axios({
  method: 'post',
  url: 'http://212.64.90.182:5000/refund',
  data: delMsg
}).then(res => {
  return res.data;
}).catch(err => {
  return err;
})