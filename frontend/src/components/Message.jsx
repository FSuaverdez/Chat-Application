import React from 'react';
import moment from 'moment';
const Message = ({ text, sent, date }) => {
  return (
    <>
      <div
        className={`w-350 rounded p-2 ${
          sent
            ? 'self-end bg-blue-500 text-white mr-3'
            : 'self-start bg-gray-200 text-black ml-3'
        }`}
      >
        {text}
      </div>
      <div
        className={`${
          sent ? 'self-end mr-3' : 'self-start ml-3'
        } text-gray-600 text-sm pb-10`}
      >
        {moment(date).startOf('ss').fromNow()}
      </div>
    </>
  );
};

export default Message;
