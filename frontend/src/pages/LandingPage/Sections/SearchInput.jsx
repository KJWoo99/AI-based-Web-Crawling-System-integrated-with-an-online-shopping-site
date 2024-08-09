import React from 'react'

const SearchInput = ({ onSearch, searchTerm }) => {
  return (
    <input 
      type='text'
      value={searchTerm}
      onChange={onSearch}
      placeholder='Search.'
      style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '5px', marginTop: '1px', width: '50%' }}
    />
  )
}

export default SearchInput