
import React, { useState, useEffect } from "react";
import { clearSessionStorage, getSessionStorage } from "../utils/storage";
import { addProductService, getProducts, updateProductService, deleteProductService } from "../api/product";
import Modal from '../component/Modal'
import Table from '../component/Table'

const Home = (props) => {

    const [productList, setProductList] = useState([])
    const [productDto, setProductDto] = useState({})

    const productAction = async (data) => {
        if (data.id) {
            //Update Product
            let products = [...productList];
            let updateProduct = await updateProductService(data);
            if (typeof updateProduct != "undefined") {

                let currentElementIndex = products.findIndex((x) => x.id === updateProduct.id);

                if (currentElementIndex === -1) {
                    return;
                }

                products[currentElementIndex] = data;

                setProductList(products);
            }

            document.getElementById("modalClose").click();
        } else {
            // Create Product
            delete data.id;
            let newProduct = await addProductService(data);
            if (typeof newProduct != "undefined") {

                setProductList((oldArr) => [...oldArr, newProduct]);
            }
            document.getElementById("modalClose").click();
        }



    }

    const editProduct = async (product) => {
        // Open and Set Modal For Edit
        document.getElementById("modelOpen").click();
        setProductDto(product);
    }

    const deleteProduct = async (product) => {
        // Delete Product
        let deletedProduct = await deleteProductService(product);
        if (typeof deletedProduct != "undefined") {

            let products = [...productList];
            products = products.filter(p => p.id != product.id);

            setProductList(products);
        }

    }

    const fetchData = async () => {
         //Get All Products
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
                <div className=" d-flex justify-content-start">
                     
                    {
                        getSessionStorage("isAdmin") == "true" &&
                        <button id="modelOpen" type="button" class="btn btn-success" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >Ürün Ekle</button>
                    }

                </div>
                <div className=" d-flex justify-content-end">
                    <button onClick={() => {
                        clearSessionStorage();
                        props.history.push("/");

                    }} type="button" className="btn btn-danger d-flex justify-content-end">LogOut</button>
                    

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
