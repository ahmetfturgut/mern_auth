import axios from "axios";
import { apiEndPoint } from '../constants/app';
import network from './network';

export const addProductService = async (data) => {

  try {


    let result = await axios.post("product/create", data);

    if (result.status == 200) {

      return result.data.data;
    }
  } catch (error) {
    console.log(error);
  }
};


export const updateProductService = async (data) => {

  try {


    let result = await axios.put("product/update/"+data.id, data);

    if (result.status == 200) {

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



