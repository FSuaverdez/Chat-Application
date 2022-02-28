import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:5000/';
export const conversationApi = createApi({
  reducerPath: 'conversationApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: builder => ({
    getConversations: builder.query({
      query: userId => ({
        url: 'conversation/' + userId,
      }),
    }),
    getConversation: builder.query({
      query: userId => ({
        url: 'conversation/' + userId,
      }),
    }),
    getUser: builder.query({
      query: friendId => ({
        url: 'conversation/user/' + friendId,
      }),
    }),
    getMessages: builder.query({
      query: conversationId => ({
        url: 'message/' + conversationId,
      }),
    }),
    sendMessage: builder.mutation({
      query: ({ conversationId, sender, text }) => ({
        url: 'message',
        method: 'POST',
        body: { conversationId, sender, text },
      }),
    }),
    createConversation: builder.mutation({
      query: ({ senderId, receiverId }) => ({
        url: 'conversation',
        method: 'POST',
        body: { senderId, receiverId },
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: 'user',
      }),
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetUserQuery,
  useGetMessagesQuery,
  useSendMessageMutation,
  useGetUsersQuery,
  useCreateConversationMutation,
} = conversationApi;
