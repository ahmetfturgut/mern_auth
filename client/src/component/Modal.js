import React, { useState, useEffect } from 'react'

const Modal = ({ handleSubmit, product }) => {

    const [productName, setProductName] = useState("");
    const [productDetail, setProductDetail] = useState("");
    const [productId, setProductId] = useState("");

    useEffect(() => {

        setProductName(product.productName ? product.productName : "");
        setProductDetail(product.productDetail ? product.productDetail : "");
        setProductId(product.id ? product.id : "");

    }, [product])

    return (
        <>
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Add Product</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label class="col-form-label">Product Name:</label>
                                    <input onChange={(e) => { setProductName(e.target.value) }} type="text" class="form-control" value={productName} id="productName" />
                                </div>
                                <div class="mb-3">
                                    <label class="col-form-label">Product Detail:</label>
                                    <textarea onChange={(e) => { setProductDetail(e.target.value) }} class="form-control" value={productDetail} id="productDetail"></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button id="modalClose" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={() => { handleSubmit({ productName: productName, productDetail: productDetail, id: productId }) }}>Save product</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
