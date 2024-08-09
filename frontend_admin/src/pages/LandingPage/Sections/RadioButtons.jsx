import React from 'react'

const RadioButtons = ({ prices, checkedPrice, onFilters }) => {
  return (
    <div className='p-2 mb-3 bg-gray-200 rounded-md'>
      {prices?.map(price => (
        <div key={price._id}>
          <input
            checked={checkedPrice === price.array}
            onChange={e => onFilters(e.target.value)}
            type="radio"
            id={price._id}
            value={price._id}
          />
          {" "}
          <label htmlFor={price._id}>{price.name}</label>
        </div>
      ))}

    </div>
  )
}

export default RadioButtons