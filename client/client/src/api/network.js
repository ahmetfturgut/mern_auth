 
import { apiEndPoint } from '../constants/app';
import axios from "axios";
import { getSessionStorage } from '../utils/storage';
// export const postData = (type,url = '', data = {}, options = {}) => { 

let token = getSessionStorage('token') || '';
  

axios.defaults.baseURL = apiEndPoint;
axios.defaults.headers.common['Authorization'] = token;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

 