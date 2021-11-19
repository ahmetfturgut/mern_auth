import axios from "axios";
import { toast } from "react-toastify";
import { apiEndPoint } from '../constants/app';
import { HttpTypes } from "../utils/enums";
import {postData} from './network';

export const addProductService = async (data) => {

  try {

 
    let result = await postData("product/create", HttpTypes.POST, data)

    if (result.status == 200) {
      toast.success("Successful Transaction")
      return result.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};


export const updateProductService = async (data) => {

  try { 
    let result = await postData("product/update/"+data.id, HttpTypes.PUT, data) 

    if (result.status == 200) {
      toast.success("Successful Transaction")
      return result.data.data;
    }
  } catch (error) {
    console.log(error);
  }
}; 



export const deleteProductService = async (data) => {

  try {


    let result = await axios.delete("product/delete/"+data.id, data);

    if (result.status == 200) {
      toast.success("Successful Transaction")
      return result.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = async () => {
  try {
    const result = await axios.get(`${apiEndPoint}product/getAllProduct`);

    if (result.status == 200) {
      return result.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};



