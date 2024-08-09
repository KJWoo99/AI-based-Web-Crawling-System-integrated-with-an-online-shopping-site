import React from 'react'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/thunkFunctions';

const ProductInfo = ({ product }) => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(addToCart({ productId: product._id }))
    }
    return (
        <div>
            <p className='text-xl text-center font-semibold text-black'>Product Detail</p>
            <ul>
                <li><span className='font-semibold text-black'>Price:</span> {product.price} SG$</li>
                <li><span className='font-semibold text-black'>Sold:</span> {product.sold} Pieces</li>
                <li><span className='font-semibold text-black'>Selling Point:</span> {product.selling_point}</li>
                <li><span className='font-semibold text-black'>Description:</span><pre>{product.description}</pre></li>
            </ul>
            <div className='mt-3'>
                <button
                onClick={handleClick}
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
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default ProductInfo