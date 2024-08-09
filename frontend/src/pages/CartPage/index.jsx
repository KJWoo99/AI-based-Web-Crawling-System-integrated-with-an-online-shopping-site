import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems, payProducts, removeCartItem } from '../../store/thunkFunctions';
import CartTable from './Sections/CartTable';

const CartPage = () => {
  const userData = useSelector(state => state.user?.userData);
  const cartDetail = useSelector(state => state.user?.cartDetail);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputA, setInputA] = useState('');
  const [inputB, setInputB] = useState('');
  const [inputC, setInputC] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');

  useEffect(() => {
    let cartItemIds = [];

    if (userData?.cart && userData.cart.length > 0) {
      userData.cart.forEach(item => {
        cartItemIds.push(item.id);
      });
      const body = {
        cartItemIds,
        userCart: userData.cart,
      };
      dispatch(getCartItems(body));
    }
  }, [dispatch, userData]);

  useEffect(() => {
    calculateTotal(cartDetail);
  }, [cartDetail]);

  const calculateTotal = (cartItems) => {
    let total = 0;
    cartItems.map(item => total += item.price * item.quantity)
    setTotal(total.toFixed(2));
  }

  const handleRemoveCartItem = productId => {
    dispatch(removeCartItem(productId));
  };

  const handlePaymentClick = () => {
    setIsModalOpen(true);
  };

  const handleModalSubmit = () => {
    if (inputA.length !== 16) {
      setCardNumberError('Valid Card number must be 16 digits');
      return;
    }
    if (inputC.length !== 3) {
      setCardNumberError('SVC number must be 3 digits');
      return;
    }

    const [inputYear, inputMonth] = inputB.split('/').map(str => parseInt(str, 10));
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1; 

    if (inputYear < currentYear || (inputYear === currentYear && inputMonth < currentMonth)) {
      setCardNumberError('Invalid expiration date');
      return;
    }
    if (inputMonth < 1 || inputMonth > 12) {
      setCardNumberError('Invalid month. Please enter a valid month between 1 and 12.');
      return;
    }

    console.log('Input A:', inputA);
    console.log('Input B:', inputB);
    console.log('Input C:', inputC);

    setCardNumberError('');
    setIsModalOpen(false);
    dispatch(payProducts({ cartDetail }));
  };

  return (
    <section>
      <div className="text-center m-7">
        <h2 className="text-2xl">My Cart</h2>
      </div>

      {cartDetail?.length > 0 ? (
        <>
          <CartTable products={cartDetail} onRemoveItem={handleRemoveCartItem} />
          <div className="mt-10">
            <p>
              <span className="font-bold">Total:</span>
              {total} SG$
            </p>
            <button
              style={{
                borderRadius: '5px',
                backgroundColor: 'black',
                color: 'white',
                border: 'none',
                padding: '5px',
                fontSize: '18px',
                width: '15%',
              }}
              onClick={handlePaymentClick}
            >
              Buy Now
            </button>
          </div>
        </>
      ) : (
        <p>Cart is empty.</p>
      )}

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Enter Card Information (CardNumber, EXP, SVC)</h2>
            <input
              type="text"
              placeholder="Input CardNumber"
              value={inputA}
              onChange={e => setInputA(e.target.value)}
              style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }}
            />
            <input
              type="text"
              placeholder="Input EXP(YY/MM)"
              value={inputB}
              onChange={e => setInputB(e.target.value)}
              style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }}
            />
            <input
              type="text"
              placeholder="Input SVC"
              value={inputC}
              onChange={e => setInputC(e.target.value)}
              style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '5px' }}
            />
            {cardNumberError && <p style={{ color: 'red' }}>{cardNumberError}</p>}
            <button
               style={{
               borderRadius: '5px',
               backgroundColor: 'black',
               color: 'white',
               border: 'none',
               padding: '5px',
               fontSize: '18px',
               width: '15%',
              }}
              onClick={handleModalSubmit}>Submit</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartPage;
