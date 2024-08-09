import React from 'react'

const CartTable = ({ products, onRemoveItem }) => {


    const renderCartImage = (images) => {
        if(images.length> 0) {
            let image = images[0]
            return `${import.meta.env.VITE_SERVER_URL}/${image}`
        } 
    }


    const renderItems = (
        products.length > 0 && products.map(product => (
            <tr key={product._id}>
                <td>
                    <img
                        className='w-[70px]'
                        alt='product'
                        src={renderCartImage(product.images)}
                    />
                </td>
                <td>
                    {product.quantity} Quantity
                </td>
                <td>
                    {product.price} SG$
                </td>
                <td>
                    <button onClick={() => onRemoveItem(product._id)}>
                        Delete
                    </button>
                </td>
            </tr>
        ))
    )

    return (
        <table className='w-full text-sm text-left text-black'>
            <thead className='border-[1px]'>
                <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>SG$</th>
                    <th>Delete</th>

                </tr>
            </thead>

            <tbody>
                {renderItems}
            </tbody>
        </table>
    )
}

export default CartTable