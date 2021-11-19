import { getSessionStorage } from "../utils/storage"

const Table = ({ productList, editProduct, deleteProduct }) => {

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Product Detail</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productList?.map((item, index) => {
                            return (
                                <tr>
                                    <th scope="row">{index+1}</th>
                                    <td>{item.productName}</td>
                                    <td>{item.productDetail}</td>
                                    {getSessionStorage("isAdmin") == "true" && <td><button onClick={() => { editProduct(item) }} type="button" class="btn btn-secondary" >Edit</button></td>}
                                    {getSessionStorage("isAdmin") == "true" && <td><button onClick={() => { deleteProduct(item) }} type="button" class="btn btn-danger" >Delete</button></td>}
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default Table