import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetUserQuery } from '../app/services/conversationApi';

const MessageBox = ({ conversation }) => {
  const user = useSelector(state => state.user);

  const friendId = conversation?.members.find(m => m !== user?._id);

  const { data, isLoading } = useGetUserQuery(friendId);
  if (isLoading) {
    return 'Loading...';
  }

  return (
    <Link to={`chat/${conversation._id}`}>
      <div className='rounded-lg shadow-lg w-full border border-gray-300 p-2 my-5 hover:bg-gray-100 cursor-pointer'>
        <div className='flex items-center gap-2 p-2'>
          <img
            src={data?.imageUrl}
            alt='user-profile'
            className='w-77 h-7 rounded-full'
          />
          <div className='font-bold text-lg'>{data?.name}</div>
        </div>
      </div>
    </Link>
  );
};

export default MessageBox;
