import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Message from './Message';
import {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useGetUserQuery,
  useSendMessageMutation,
} from '../app/services/conversationApi';
import { io } from 'socket.io-client';

const ChatMessage = () => {
  const [message, setMessage] = useState('');
  const { id } = useParams();
  const user = useSelector(state => state.user);
  const { data, isLoading } = useGetConversationsQuery(user._id);
  const currentChat = data?.find(c => c._id === id);
  const friendId = currentChat?.members?.find(u => u !== user._id);
  const { data: friend, isLoading: isFriendLoading } =
    useGetUserQuery(friendId);

  const scrollRef = useRef();
  const navigate = useNavigate();
  const {
    data: messages,
    isLoading: isLoadingMessages,
    refetch,
  } = useGetMessagesQuery(id);
  const [sendMessage] = useSendMessageMutation();
  const socket = useRef();

  useEffect(() => {
    socket.current = io('ws://localhost:4000');
    socket.current.on('getMessage', data => {
      if (data.receiverId === user._id) {
        refetch();
      }
    });
  }, [refetch, navigate, user._id, friend?.name]);

  useEffect(() => {
    socket.current.emit('addUser', user._id);
  }, [user]);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (isLoadingMessages && isLoading && isFriendLoading) {
    return 'Loading...';
  }

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await sendMessage({
        conversationId: id,
        sender: user._id,
        text: message,
      }).unwrap();

      socket.current.emit('sendMessage', {
        senderId: user._id,
        receiverId: friendId,
        text: message,
        conversationId: currentChat._id,
      });

      refetch();
    } catch (error) {
      console.log(error);
    }

    setMessage('');
  };

  return (
    <div className=''>
      <div className='sticky inset-x-0 top-0  z-10 bg-blue-400 text-white p-2 mb-5'>
        <div className='flex items-center gap-3'>
          <img
            src={friend?.imageUrl}
            className='w-12 h-12 rounded-full'
            alt='user-profile'
          />
          <p className='text-xl font-bold'>{friend?.name}</p>
        </div>
      </div>
      <div className='relative w-full h-full flex flex-col gap-2'>
        {messages &&
          messages?.map(m => (
            <Message
              key={m._id}
              text={m.text}
              date={m.createdAt}
              sent={m.sender === user._id}
            />
          ))}
        <div ref={scrollRef}></div>
      </div>
      <div className='sticky inset-x-0 bottom-4 '>
        <form className='flex gap-3 bg-white' onSubmit={handleSubmit}>
          <input
            type='text'
            onChange={e => setMessage(e.target.value)}
            value={message}
            className='border-2 rounded border-gray-600 p-1 w-full'
            placeholder='Write a message...'
          />
          <button className='bg-blue-500 text-white font-bold rounded p-3'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatMessage;
