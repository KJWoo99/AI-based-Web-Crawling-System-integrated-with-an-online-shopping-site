import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import axiosInstance from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../../components/FileUpload';
const categories = [
  { key: 1, value: 'AirPods' },
  { key: 2, value: 'iPhone' },
  { key: 3, value: 'iPad' },
  { key: 4, value: 'Mac' },
  { key: 5, value: 'Watch' },
  { key: 6, value: 'TV & Home' },
  { key: 7, value: 'Accessories' },
]


const UploadProductPage = () => {

  const [product, setProduct] = useState({
    title: '',
    selling_point: '',
    description: '',
    price: 0,
    categories: 1,
    images: []
  })

  const userData = useSelector(state => state.user?.userData);
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }


  const handleImages = (newImages) => {
    setProduct((prevState) => ({
      ...prevState,
      images: newImages
    }))
  }


  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      writer: userData.id,
      ...product
    }

    try {
      await axiosInstance.post('/products', body);
      navigate('/');
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <section>
      <div className='text-center m-7'>
        <h1>Product Upload</h1>
      </div>

      <form className='mt-6' onSubmit={handleSubmit}>

        <FileUpload images={product.images} onImageChange={handleImages} />

        <div className='mt-4'>
          <label htmlFor='title'>Name</label>
          <input
            className='w-full px-4 py-2 bg-white border rounded-md'
            name="title" id="title" onChange={handleChange} value={product.title}
          />
        </div>

        <div className='mt-4 '>
          <label htmlFor='selling point'>Selling Point</label>
          <input
            className='w-full px-4 py-2 bg-white border rounded-md'
            name="selling_point" id="selling_point" onChange={handleChange} value={product.selling_point}
          />
        </div>

        <div className='mt-4'>
         <label htmlFor='description'>Description</label>
         <textarea
          className='w-full px-4 py-2 bg-white border rounded-md'
          name="description" id="description" onChange={handleChange} value={product.description}
         />
        </div>


        <div className='mt-4'>
          <label htmlFor='price'>Price</label>
          <input
            className='w-full px-4 py-2 bg-white border rounded-md'
            type="number" name="price" id="price" onChange={handleChange} value={product.price}
          />
        </div>

        <div className='mt-4'>
          <label htmlFor='categories'>Category</label>
          <select
            className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
            name='categories' id='categories' onChange={handleChange} value={product.categories}
          >
            {categories.map(item => (
              <option key={item.key} value={item.key}>{item.value}</option>
            ))}
          </select>
        </div>

        <div className='mt-4'>
        <button 
            type='submit' 
            style={{
              borderRadius: '5px',
              backgroundColor: 'black',
              color: 'white',
              border: 'none',
              padding: '5px',
              fontSize: '18px',
              width: '100%',
             }}
            >
              Register
            </button>
        </div>

      </form>
    </section>
  )
}

export default UploadProductPage