
import { apiEndPoint } from '../constants/app';
import axios from "axios";
import { getSessionStorage } from '../utils/storage';
import { toast } from 'react-toastify';
const httpStatus = require('http-status');


let token = getSessionStorage('token') || '';


axios.defaults.baseURL = apiEndPoint;
axios.defaults.headers.common['Authorization'] = token;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export const postData = async (path, httpType, data = {}) => {

  try {
    return await axios[httpType](path, data);

  } catch (err) { 
    
    if (err.response.status == httpStatus.UNPROCESSABLE_ENTITY) {
      let errors = err.response.data.errors;
      for (let i = 0; i < errors.length; i++) {

        toast.error(errors[i].message);
      }
    } else if (err.response.status == httpStatus.UNAUTHORIZED) {

      let error = err.response.data.message;
      toast.error(error);
      
    }
  }

}