import React, { useState, useEffect } from 'react'
import { read, listRelated } from './apiCore'
import Card from './Card'
import '../css/viewProduct.css'
import '../css/home.css'

const Product = props => {
    const [product, setProduct] = useState({})
    const [relatedProduct, setRelatedProduct] = useState([])
    const [setError] = useState(false)

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProduct(data)
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error)
                    } else {
                        setRelatedProduct(data)
                    }
                })
            }
        })
    }

    useEffect(() => {
        const productId = props.match.params.productId
        loadSingleProduct(productId)
    }, [props])

    return (
        <div className="view-container">
            <div>
                {product && product.description && <Card product={product} showViewProductButton={false} />}
            </div>

            <div>
                <hr></hr>
                <h4>Related products</h4>
                <div className="related-container">
                    {relatedProduct.map((p, i) => (
                        <div key={i}>
                            <Card product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Product