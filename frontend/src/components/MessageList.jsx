import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  useCreateConversationMutation,
  useGetConversationsQuery,
  useGetUsersQuery,
} from '../app/services/conversationApi';

import MessageBox from './MessageBox';

const MessageList = () => {
  const [search, setSearch] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');

  const user = useSelector(state => state.user);
  const { isLoading, data, refetch } = useGetConversationsQuery(user?._id);
  const { isLoading: userIsLoading, data: users } = useGetUsersQuery();
  const [createConversation] = useCreateConversationMutation();

  if (isLoading && userIsLoading) {
    return 'Loading....';
  }
  const addContactHandler = async e => {
    e.preventDefault();

    const emailSearch = contact.trim();

    const userToAdd = users?.find(u => u.email === emailSearch);

    if (userToAdd) {
      await createConversation({
        senderId: user._id,
        receiverId: userToAdd._id,
      }).unwrap();
      setContact('');
    } else {
      setError(
        'Cannot find any contact with that email, only add contacts registered to the website'
      );
    }

    refetch();
  };

  return (
    <>
      <form className='my-1 mb-1 flex gap-2 ' onSubmit={addContactHandler}>
        <input
          type='text'
          onChange={e => setContact(e.target.value)}
          value={contact}
          className='border-2 rounded border-gray-600 p-1'
          placeholder='Add Contacts (Email)'
        />
        <button className='bg-blue-400 text-white font-bold p-2 rounded'>
          Add
        </button>
      </form>
      {error && <p className='text-sm text-red-600'>{error}</p>}
      <div className='my-4 mb-4'>
        <input
          type='text'
          onChange={e => setSearch(e.target.value)}
          value={search}
          className='border-2 rounded border-gray-600 p-1 w-full'
          placeholder='Search Contacts'
        />
      </div>

      <div>
        {data && data.map(c => <MessageBox conversation={c} key={c._id} />)}
      </div>
    </>
  );
};

export default MessageList;
