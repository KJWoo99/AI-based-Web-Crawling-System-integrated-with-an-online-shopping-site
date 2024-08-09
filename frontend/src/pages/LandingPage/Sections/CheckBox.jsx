import React from 'react'

const CheckBox = ({ categories, checkedCategories, onFilters }) => {
    const handleToggle = (categoryId) => {
        const currentIndex = checkedCategories.indexOf(categoryId);
        const newChecked = [...checkedCategories];
        if (currentIndex === -1) {
            newChecked.push(categoryId);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        onFilters(newChecked);
    }
    return (
        <div className='p-2 mb-3 bg-gray-200 rounded-md'>
            {categories?.map(category => (
                <div key={category._id}>
                    <input
                        type='checkbox'
                        onChange={() => handleToggle(category._id)}
                        checked={checkedCategories.indexOf(category._id) === -1 ? false : true}
                    />{" "}
                    <label>{category.name}</label>
                </div>
            ))}
        </div>
    )
}

export default CheckBox
