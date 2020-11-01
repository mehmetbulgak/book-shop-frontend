import React from "react"
import { isAuthenticated } from "../auth"
import { Link } from "react-router-dom"
import "../css/admindashboard.css"

const AdminDashboard = () => {
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();

    const adminLinks = () => {
        return (
            <div>
                <h4 >Admin Links</h4>
                <ul>
                    <li>
                        <Link to="/create/category">
                            Create Category
                        </Link>
                    </li>
                    <li>
                        <Link to="/create/product">
                            Create Product
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/orders">
                            View Orders
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/products">
                            Manage Products
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }

    const adminInfo = () => {
        return (
            <div>
                <h3>User Information</h3>
                <ul>
                    <li>{name}</li>
                    <li>{email}</li>
                    <li>
                        {role === 1 ? "Admin" : "Registered User"}
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <div className="dashboard-container">
            <div className="admin-links">{adminLinks()}</div>
            <div className="admin-info">{adminInfo()}</div>
        </div>
    )
}

export default AdminDashboard