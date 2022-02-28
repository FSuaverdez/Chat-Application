import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../app/slices/authSlice';
import { useCallback } from 'react';
import MessageList from './MessageList';

const Sidebar = ({ closeToggle }) => {
  const user = useSelector(state => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  const logout = useCallback(() => {
    dispatch(authActions.LOGOUT());
    navigate('/');
  }, [navigate, dispatch]);

  return (
    <div className='flex flex-col  bg-white h-full overflow-y-scroll min-w-620 hide-scrollbar'>
      <div className='flex flex-col'>
        <Link
          to='/'
          className='flex px-5 gap-2 pt-1 items-center mt-4'
          onClick={handleCloseSidebar}
        >
          <h2 className='text-2xl font-bold ml-4 text-blue-500 w-full'>
            Chap Application
          </h2>
        </Link>
        {user ? (
          <div className='bg-white rounded-lg shadow-lg mx-3 p-2 mt-5 my-6 flex justify-around items-center  '>
            <div className='flex items-center  '>
              <div
                className='flex   gap-2  items-center justify-center '
                onClick={handleCloseSidebar}
              >
                <img
                  src={user.imageUrl}
                  alt='user-rpofile'
                  className='w-10 h-10 rounded-full'
                />
                <p className='text-sm'>{user.name}</p>
              </div>
              <button
                type='button'
                className='text-sm text-white rounded bg-blue-500 items-center justify-center mx-auto py-1 px-2 ml-2'
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <Link
            to={`login`}
            className='text-white rounded bg-blue-500 items-center justify-center mx-auto py-1 px-3'
            onClick={handleCloseSidebar}
          >
            Login
          </Link>
        )}
        <div className='flex flex-col gap-2 px-3'>
          {/* CHAT LIST GO HERE */}
          <MessageList />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
