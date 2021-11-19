import axios from "axios";
import { apiEndPoint } from '../constants/app';
import { setSessionStorage } from '../utils/storage';

export const login = async (data) => {

  try {
    const result = await axios.post(`${apiEndPoint}auth/login`, data);
   
    
    if (result.status==200) { 
     
      setSessionStorage("token",result.data.data.token);
      setSessionStorage("isAdmin",result.data.data.isAdmin);
      setSessionStorage("name",result.data.data.name);
   
    }
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
};

