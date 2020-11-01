import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../auth'
import { createProduct, getCategories } from './apiAdmin'
import '../css/addproduct.css'

const AddProduct = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    })

    const { user, token } = isAuthenticated()

    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                })
            }
        })
    }

    useEffect(() => {
        init()
    }, [])

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value })
    }

    const clickSubmit = event => {
        event.preventDefault()
        setValues({ ...values, error: '', loading: true })

        createProduct(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    loading: false,
                    createdProduct: data.name
                })
            }
        })
    }

    const newPostForm = () => (
        <form onSubmit={clickSubmit}>
            <p>Post Photo</p>
            <input className="photoinput" onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />

            <label>Name</label>
            <input onChange={handleChange('name')} type="text" value={name} />

            <label>Description</label>
            <textarea onChange={handleChange('description')} value={description} />

            <label>Price</label>
            <input onChange={handleChange('price')} type="number" value={price} />

            <label>Category</label>
            <select onChange={handleChange('category')}>
                <option>Please select</option>
                {categories &&
                    categories.map((c, i) => (
                        <option key={i} value={c._id}>
                            {c.name}
                        </option>
                    ))}
            </select>

            <label >Shipping</label>
            <select onChange={handleChange('shipping')}>
                <option>Please select</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
            </select>

            <label>Quantity</label>
            <input onChange={handleChange('quantity')} type="number" value={quantity} />

            <div className='addproduct-button'><button>Create Product</button></div>
        </form>
    )

    const showError = () => (
        <div style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is created!</h2>
        </div>
    )

    const showLoading = () =>
        loading && (
            <div>
                <h2>Loading...</h2>
            </div>
        )

    return (
        <div>
            <h2 className='addproduct-header'>Add a new product</h2>
            <div className="addproduct-container">
                {showLoading()}
                {showSuccess()}
                {showError()}
                {newPostForm()}
            </div>
        </div>
    )
}

export default AddProduct