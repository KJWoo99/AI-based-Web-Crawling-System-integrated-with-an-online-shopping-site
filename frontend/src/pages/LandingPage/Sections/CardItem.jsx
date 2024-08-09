import React from 'react'
import { Link } from 'react-router-dom';
import ImageSlider from '../../../components/ImageSlider';

const CardItem = ({ product }) => {
    return (
        <div className='border-[1px] text-black'>
            <ImageSlider images={product.images} />
            <Link to={`/product/${product._id}`}>
                <p className='p-1'>{product.title}</p>
                <p className='p-1 text-xs text-black'>{product.price}SG$</p>
            </Link>
        </div>
    )
}

export default CardItem