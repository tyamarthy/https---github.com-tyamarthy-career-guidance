// src/components/chatApp.js
import React, { useState } from 'react';
import { createChat, addMessage } from '../firebase/chatService';

const ChatApp = () => {
  console.log('ChatApp component is rendered');
  const [chatId, setChatId] = useState(null);
  const [message, setMessage] = useState('');
  const studentId = 'student_uid_12345';  // Use actual student Firebase UID
  const mentorId = 'mentor_uid_67890';    // Use actual mentor Firebase UID

  const handleCreateChat = async () => {
    const newChatId = await createChat(studentId, mentorId);
    setChatId(newChatId);
  };

  const handleSendMessage = async () => {
    if (chatId && message) {
      await addMessage(chatId, 'student', message);
      setMessage('');
    }
  };

  return (
    <div>
      {!chatId ? (
        <button onClick={handleCreateChat}>Start Chat</button>
      ) : (
        <div>
          <textarea 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message"
          />
          <button onClick={handleSendMessage}>Send Message</button>
        </div>
      )}
    </div>
  );
};

export default ChatApp;
