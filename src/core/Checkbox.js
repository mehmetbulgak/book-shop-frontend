import React, { useState } from "react"

const Checkbox = ({ categories, handleFilters }) => {
    const [checked, setCheked] = useState([])

    const handleToggle = c => () => {
        const currentCategoryId = checked.indexOf(c)
        const newCheckedCategoryId = [...checked]
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(c)
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }
        console.log(newCheckedCategoryId)
        setCheked(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId)
    }

    return categories.map((c, i) => (
        <div key={i}>
            <div>
                <input
                    onChange={handleToggle(c._id)}
                    value={checked.indexOf(c._id === -1)}
                    type="checkbox"
                />
                <label>{c.name}</label>
            </div>
        </div>
    ))
}

export default Checkbox