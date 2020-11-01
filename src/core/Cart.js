import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';
import '../css/cart.css'

const Cart = () => {
    const [items, setItems] = useState([])
    const [run, setRun] = useState(false)

    useEffect(() => {
        setItems(getCart())
    }, [run])

    const showItems = items => {
        return (
            <div>
                <h2 style={{borderBottom:"2px solid #005A41"}}>Your cart has {`${items.length}`} items</h2>
                {items.map((product, i) => (
                    <Card
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                    />
                ))}
            </div>
        )
    }

    const noItemsMessage = () => (
        <h2>
            Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
        </h2>
    )

    return (
        <div className='cart-container'>
            <div className='cart-container-left'>
                {items.length > 0 ? showItems(items) : noItemsMessage()}
            </div>
            <div className='cart-container-right'>
                <h2 style={{borderBottom:"2px solid #005A41"}}>Your cart summary</h2>
                <Checkout products={items} />
            </div>
        </div>
    )
}

export default Cart;