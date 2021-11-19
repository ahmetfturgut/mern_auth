import { HttpTypes } from "../utils/enums";
import {postData} from './network';
import { setSessionStorage } from '../utils/storage'; 

export const login = async (data) => {

  try { 
    let result = await postData("auth/login", HttpTypes.POST, data)
     
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

