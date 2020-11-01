import React, { useState, useEffect } from 'react'
import { getProducts } from './apiCore'
import Card from './Card'
import Search from './Search'
import '../css/home.css'

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <div>
            <Search />
            <h2 style={{ margin: '0 auto', width: '80%' }}>New Arrivals</h2>
            <div className="home-container">
                {productsByArrival.map((product, i) => (
                    <div key={i}>
                        <Card product={product} />
                    </div>
                ))}
            </div>

            <h2 style={{ margin: '30px auto 0 auto', width: '80%' }}>Best Sellers</h2>
            <div className="home-container">
                {productsBySell.map((product, i) => (
                    <div key={i}>
                        <Card product={product} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Home