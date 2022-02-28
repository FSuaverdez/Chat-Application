import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatMessage from './ChatMessage';

const MessageRoutes = () => {
  return (
    <Routes>
      <Route path='/chat/:id' element={<ChatMessage />} />
    </Routes>
  );
};

export default MessageRoutes;
