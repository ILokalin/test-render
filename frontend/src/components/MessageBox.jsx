import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useGetMessagesQuery } from '../api/messagesApi.js';
import { selectCurrentChannelId } from '../store/slice/appSlice.js';
import socket from '../socket.js';
import Loading from './Spinner.jsx';

const MessageBox = () => {
  const { data: messages, isLoading, refetch } = useGetMessagesQuery();
  const currentChannelId = useSelector(selectCurrentChannelId);
  const filtredMessages = messages?.filter((message) => message.channelId === currentChannelId);
  const messageRef = useRef(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [messages?.length, currentChannelId]);

  useEffect(() => {
    const handleNewMessage = async () => {
      await refetch();
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage');
    };
  }, [refetch, messageRef]);

  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5" ref={messageRef}>
      {isLoading && <Loading />}
      {filtredMessages?.map((message) => (
        <div className="text-break mb-2" key={message.id}>
          <b>{message.username}</b>
          :
          {' '}
          {message.message}
        </div>
      ))}
    </div>
  );
};

export default MessageBox;
