import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../auth'
import { Redirect } from 'react-router-dom'
import { getProduct, getCategories, updateProduct } from './apiAdmin'
import '../css/addproduct.css'

const UpdateProduct = ({ match }) => {
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
        error: false,
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    })
    const [categories, setCategories] = useState([])

    const { user, token } = isAuthenticated()
    const {
        name,
        description,
        price,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values

    const init = productId => {
        getProduct(productId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    shipping: data.shipping,
                    quantity: data.quantity,
                    formData: new FormData()
                })
                initCategories()
            }
        })
    }

    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setCategories(data)
            }
        })
    }

    useEffect(() => {
        init(match.params.productId)
    }, [])

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value })
    }

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true })

        updateProduct(match.params.productId, user._id, token, formData).then(data => {
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
                    error: false,
                    redirectToProfile: true,
                    createdProduct: data.name
                })
            }
        })
    }

    const newPostForm = () => (
        <form onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
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

            <label>Shipping</label>
            <select onChange={handleChange('shipping')} className="form-control">
                <option>Please select</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
            </select>

            <label className="text-muted">Quantity</label>
            <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity} />

            <div className='addproduct-button'><button>Update Product</button></div>
        </form>
    )

    const showError = () => (
        <div style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    )

    const showSuccess = () => (
        <div style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is updated!</h2>
        </div>
    )

    const showLoading = () =>
        loading && (
            <div>
                <h2>Loading...</h2>
            </div>
        )

    const redirectUser = () => {
        if (redirectToProfile) {
            if (!error) {
                return <Redirect to="/" />;
            }
        }
    }

    return (
        <div>
            <div className="addproduct-container">
                {showLoading()}
                {showSuccess()}
                {showError()}
                {newPostForm()}
                {redirectUser()}
            </div>
        </div>
    )
}

export default UpdateProduct