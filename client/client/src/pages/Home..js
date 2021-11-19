
import React, { useState, useEffect } from "react";
import { clearSessionStorage, getSessionStorage } from "../utils/storage";
import { addProductService, getProducts, updateProductService,deleteProductService } from "../api/product";
import Modal from '../component/Modal'
import Table from '../component/Table'

const Home = (props) => {

    const [productList, setProductList] = useState([])
    const [productDto, setProductDto] = useState({}) 

    const productAction = async (data) => {

        if (data.id) {
            let products = [...productList];
            let updateProduct = await updateProductService(data);
            let currentElementIndex = products.findIndex((x) => x.id === updateProduct.id);

            if (currentElementIndex === -1) {
                return;
            }

            products[currentElementIndex] = data;

            setProductList(products)
            document.getElementById("modalClose").click();
        } else {

            let newProduct = await addProductService(data);

            setProductList((oldArr) => [...oldArr, newProduct]);
            document.getElementById("modalClose").click();
        }



    }
    const editProduct = async (product) => {
        document.getElementById("modelOpen").click();
        setProductDto(product);
    }

    const deleteProduct = async (product) => {

        await deleteProductService(product);
        let products = [...productList]; 
        products = products.filter(p => p.id != product.id);

        setProductList(products);

    }

    const fetchData = async () => {
        let product = await getProducts();
        setProductList(product)
    }

    useEffect(() => {
        let token = getSessionStorage("token");
        if (!token) {
            props.history.push("/");
            return
        }

        fetchData();
    }, []);

    return (
        <>

            
            <div className="m-5">
                <div className=" d-flex justify-content-end">
                    <button onClick={() => {
                        clearSessionStorage();
                        props.history.push("/");

                    }} type="button" className="btn btn-danger d-flex justify-content-end">LogOut</button>
                    {
                        getSessionStorage("isAdmin") == "true" && 
                        <button id="modelOpen" type="button" class="btn btn-success" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >Ürün Ekle</button>
                    }

                </div>
                {productList?.length > 0 &&
                    <Table productList={productList} editProduct={editProduct} deleteProduct={deleteProduct}  ></Table>
                }
            </div>
            <Modal product={productDto} handleSubmit={productAction} />
        </>

    )
}

export default Home