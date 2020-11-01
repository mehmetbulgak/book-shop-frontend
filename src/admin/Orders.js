import React, { useState, useEffect } from "react"
import { isAuthenticated } from "../auth"
import { listOrders, getStatusValues, updateOrderStatus } from "./apiAdmin"
import moment from "moment"
import "../css/orders.css"

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [statusValues, setStatusValues] = useState([])

    const { user, token } = isAuthenticated()

    const loadOrders = () => {
        listOrders(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setOrders(data)
            }
        })
    }

    const loadStatusValues = () => {
        getStatusValues(user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setStatusValues(data)
            }
        })
    }

    useEffect(() => {
        loadOrders()
        loadStatusValues()
    }, [])

    const showOrdersLength = () => {
        if (orders.length > 0) {
            return (
                <h1 style={{ borderBottom: "2px solid #007251", marginBottom: "10px" }}>
                    Total orders: {orders.length}
                </h1>
            )
        } else {
            return <h1>No orders</h1>
        }
    }

    const showInput = (key, value) => (
        <div>
            <div>
                <div>{key}</div>
            </div>
            <input
                type="text"
                value={value}
                className="form-control"
                readOnly
            />
        </div>
    )

    const handleStatusChange = (e, orderId) => {
        updateOrderStatus(user._id, token, orderId, e.target.value).then(
            data => {
                if (data.error) {
                    console.log("Status update failed")
                } else {
                    loadOrders()
                }
            }
        )
    }

    const showStatus = o => (
        <div>
            <h3>Status: {o.status}</h3>
            <select
                onChange={e => handleStatusChange(e, o._id)}
            >
                <option>Update Status</option>
                {statusValues.map((status, index) => (
                    <option key={index} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    )

    return (
        <div className="order-container">
            {showOrdersLength()}
            <div className="order-item-container">
                {orders.map((o, oIndex) => {
                    return (
                        <div
                            key={oIndex}
                            className="order-item"
                        >
                            <h2>
                                <span style={{color:"#007251"}}>
                                    Order ID: {o._id}
                                </span>
                            </h2>

                            <ul>
                                <li>
                                    {showStatus(o)}
                                </li>
                                <li>
                                    Transaction ID: {o.transaction_id}
                                </li>
                                <li>
                                    Amount: ${o.amount}
                                </li>
                                <li>
                                    Ordered by: {o.user.name}
                                </li>
                                <li>
                                    Ordered on:{" "}
                                    {moment(o.createdAt).fromNow()}
                                </li>
                                <li>
                                    Delivery address: {o.address}
                                </li>
                            </ul>

                            <h3>
                                Total products in the order:{" "}
                                {o.products.length}
                            </h3>

                            {o.products.map((p, pIndex) => (
                                <div
                                    key={pIndex}
                                >
                                    {showInput("Product name", p.name)}
                                    {showInput("Product price", p.price)}
                                    {showInput("Product total", p.count)}
                                    {showInput("Product Id", p._id)}
                                </div>
                            ))}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Orders