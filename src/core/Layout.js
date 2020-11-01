import React from 'react'

const Layout = ({ title = 'Title', description = 'Description', children, clasName }) => (
    <div>
        <div>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
        <div className={clasName}>
            {children}
        </div>
    </div>
)

export default Layout