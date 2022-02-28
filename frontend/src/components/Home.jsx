import { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import MessageRoutes from './MessageRoutes';

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const user = useSelector(state => state.user);
  const scrollRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    scrollRef.current.scrollTo(0, 0);
  }, [user, navigate]);
  return (
    <div className='flex bg-gray-50 lg:flex-row flex-col h-screen transition-height duration-75 ease-out'>
      <div className='hidden lg:flex h-screen flex-initial z-40'>
        <Sidebar />
      </div>
      <div className='flex lg:hidden flex-row'>
        <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
          <HiMenu
            fontSize={40}
            className='cursor-pointer'
            onClick={() => setToggleSidebar(true)}
          />

          {user && (
            <div>
              <img
                src={user?.imageUrl}
                alt='logo'
                className='w-16 rounded-full border border-gray-200 shadow-md'
              />
            </div>
          )}
        </div>
        {toggleSidebar && (
          <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-20 animate-slide-in '>
            <div className='absolute w-full flex justify-end items-center p-2'>
              <AiFillCloseCircle
                fontSize={30}
                className='cursor-pointer'
                onClick={() => setToggleSidebar(false)}
              />
            </div>
            <Sidebar closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div
        className='pb-2 flex-1 h-screen overflow-y-scroll relative'
        ref={scrollRef}
      >
        <MessageRoutes />
      </div>
    </div>
  );
};

export default Home;
