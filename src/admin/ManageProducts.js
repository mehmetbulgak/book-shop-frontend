import React, { useState, useEffect } from "react"
import { isAuthenticated } from "../auth"
import { Link } from "react-router-dom"
import { getProducts, deleteProduct } from "./apiAdmin"
import '../css/manageproduct.css'

const ManageProducts = () => {
    const [products, setProducts] = useState([])

    const { user, token } = isAuthenticated()

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setProducts(data)
            }
        })
    }

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                loadProducts()
            }
        })
    }

    useEffect(() => {
        loadProducts()
    }, [])

    return (
        <div className="manage-container">
            <h2 style={{ margin: "20px", borderBottom: "2px solid #007251" }}>
                Total {products.length} products
                </h2>
            <ul>
                {products.map((p, i) => (
                    <li
                        key={i}
                        className="manage-li"
                    >
                        <strong>{p.name}</strong>

                        <div className="manage-buttons">
                            <Link className="manage-update" to={`/admin/product/update/${p._id}`}>
                                <span>Update</span>
                            </Link>
                            <span className="manage-delete" onClick={() => destroy(p._id)}>Delete</span>
                        </div>
                    </li>
                ))}
            </ul>
            <br />
        </div>
    )
}

export default ManageProducts