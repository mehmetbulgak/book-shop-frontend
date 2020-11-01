import React, { useState } from 'react'
import { isAuthenticated } from '../auth'
import { Link } from 'react-router-dom'
import { createCategory } from './apiAdmin'
import '../css/addcategory.css'

const AddCategory = () => {
    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const { user, token } = isAuthenticated()

    const handleChange = (e) => {
        setError('')
        setName(e.target.value)
    }

    const clickSubmit = e => {
        e.preventDefault()
        setError("")
        setSuccess(false)
        createCategory(user._id, token, { name }).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setError("")
                setSuccess(true)
            }
        })
    }

    const newCategoryForm = () => (
        <form onSubmit={clickSubmit}>
            <label>Name</label>
            <input type="text" onChange={handleChange} value={name} autoFocus required />
            <button>Create Category</button>
        </form>
    )

    const showSuccess = () => {
        if (success) {
            return <h3>{name} is created</h3>
        }
    }

    const showError = () => {
        if (error) {
            return <h3>Category should be unique</h3>
        }
    }

    const goBack = () => (
        <div>
            <Link to='/admin/dashboard'>Go back to dashboard</Link>
        </div>
    )

    return (
        <div>
            <div className="addcategory-container">
                <h2>Add a new category</h2>
                {showSuccess()}
                {showError()}
                {newCategoryForm()}
            </div>

            <div className="goback">
                {goBack()}
            </div>
        </div>
    )
}

export default AddCategory