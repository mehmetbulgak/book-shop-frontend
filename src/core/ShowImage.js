import React from "react"

const ShowImage = ({ item, url }) => (
    <div>
        <img
            src={`http://localhost:8000/api/${url}/photo/${item._id}`}
            alt={item.name}
        />
    </div>
)

export default ShowImage