import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../store/thunkFunctions';
import { AiOutlineShoppingCart } from 'react-icons/ai';

const routes = [
  { to: '/login', name: 'Login', auth: false },
  { to: '/register', name: 'Register', auth: false },
  { name: 'Review', auth: true, external: true },
  { name: 'QnA', auth: true, external: true },
  { to: 'https://cloud.mongodb.com/v2/64981a8dcd63682f6552f7ef#/metrics/replicaSet/64981af35b58003f114a8ae7/explorer/test/payments/find', name: 'MongoDB', auth: true, external: true },
  { to: '/product/upload', name: 'Upload', auth: true },
  { to: '/user/cart', name: 'Cart', auth: true, icon: <AiOutlineShoppingCart style={{ fontSize: '1.4rem' }} /> },

  { to: '/history', name: 'History', auth: true },
  { to: '', name: 'Log out', auth: true },
];

const NavItem = ({ mobile }) => {
  const isAuth = useSelector(state => state.user?.isAuth);
  const cart = useSelector(state => state.user?.userData?.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser())
      .then(() => {
        navigate('/login');
      });
  };

  const handleReviewButtonClick = () => {
    window.open('http://localhost:5173/review_admin_hidden', '_blank', 'width=800,height=600');
  };

  const handleQnAButtonClick = () => {
    window.open('http://localhost:5173/qna_admin_hidden', '_blank', 'width=800,height=600');
  };

  return (
    <ul className={`text-md justify-center w-full flex gap-4 ${mobile && "flex-col bg-black h-full"} items-center`}>
      {routes.map(({ to, name, auth, icon, external }) => {
        if (isAuth !== auth) return null;

        if (name === 'Log out') {
          return (
            <li key={name} className='py-2 text-center border-b-4 cursor-pointer'>
              <Link
                onClick={handleLogout}
              >
                {name}
              </Link>
            </li>
          );
        } else if (name === 'QnA') {
          return (
            <li key={name} className='py-2 text-center border-b-4 cursor-pointer'>
              <button onClick={handleQnAButtonClick}>
                {name}
              </button>
            </li>
          );
        } else if (name === 'Review') {
          return (
            <li key={name} className='py-2 text-center border-b-4 cursor-pointer'>
              <button onClick={handleReviewButtonClick}>
                {name}
              </button>
            </li>
          );
        } else if (icon) {
          return (
            <li className='relative py-2 text-center border-b-4 cursor-pointer' key={name}>
              <Link to={to} >
                {icon}
                <span className='absolute top-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -right-3'>
                  {cart?.length}
                </span>
              </Link>
            </li>
          );
        } else {
          return (
            <li key={name} className='py-2 text-center border-b-4 cursor-pointer'>
              {external ? (
                <a href={to} target='_blank' rel='noopener noreferrer'>
                  {name}
                </a>
              ) : (
                <Link to={to} >{name}</Link>
              )}
            </li>
          );
        }
      })}
    </ul>
  );
};

export default NavItem;
