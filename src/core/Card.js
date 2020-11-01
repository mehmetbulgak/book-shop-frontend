import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ShowImage from './ShowImage'
import moment from 'moment'
import { addItem, updateItem, removeItem } from './cartHelpers'

const Card = ({ product,
    showViewProductButton = true,
    showAddToCartButton = true,
    showRemoveProductButton = false,
    cartUpdate = false,
    setRun = f => f,
    run = undefined }) => {
    const [redirect, setRedirect] = useState(false);
    const [count, setCount] = useState(product.count);

    const showViewButton = showViewProductButton => {
        return (
            showViewProductButton && (
                <Link to={`/product/${product._id}`}>
                    <button className='viewButton'>View Product</button>
                </Link>
            )
        )
    }

    const addToCart = () => {
        addItem(product, () => {
            setRedirect(true)
        })
    }

    const shouldRedirect = redirect => {
        if (redirect) {
            return <Redirect to="/cart" />
        }
    }

    const showAddToCart = (showAddToCartButton) => {
        return showAddToCartButton && (
            <button className="addButton" onClick={addToCart}>
                Add to cart
            </button>
        )
    }

    const showStock = quantity => {
        return quantity > 0 ? (
            <span>In Stock </span>
        ) : (
                <span>Out of Stock </span>
            )
    }

    const handleChange = productId => event => {
        setRun(!run)
        setCount(event.target.value < 1 ? 1 : event.target.value)
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value)
        }
    }

    const showCartUpdateOptions = cartUpdate => {
        return (
            cartUpdate && (
                <div>
                    <div>
                        <div>
                            <span>Adjust Quantity</span>
                        </div>
                        <input type="number" value={count} onChange={handleChange(product._id)} />
                    </div>
                </div>
            )
        )
    }

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton && (
                <button
                    onClick={() => {
                        removeItem(product._id)
                        setRun(!run)
                    }}
                    className="removeButton"
                >
                    Remove Product
                </button>
            )
        )
    }

    return (
        <div className="card">
            {shouldRedirect(redirect)}
            <ShowImage item={product} url='product' />
            <h4>{product.name}</h4>
            <p className="card-desc">{product.description}</p>
            <h3 className="card-price"><b>${product.price}</b></h3>
            <p>Category: {product.category && product.category.name}</p>
            <p className="card-date">Added on: {moment(product.createdAt).fromNow()}</p>
            {showStock(product.quantity)}
            {showViewButton(showViewProductButton)}
            {showAddToCart(showAddToCartButton)}
            {showRemoveButton(showRemoveProductButton)}
            {showCartUpdateOptions(cartUpdate)}
        </div>
    )
}

export default Card