import React, { useState, useEffect } from 'react';
import './ChatWindow.css';
import Api from '../../db/Api';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';

export default function ChatWindow({ user, data }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [editingMessage, setEditingMessage] = useState(null);
  const [attachment, setAttachment] = useState(null);

  useEffect(() => {
    // Fetch messages for the chat
    const fetchMessages = async () => {
      const chatMessages = await Api.getChatMessages(data.chatId);
      setMessages(chatMessages);
    };
    fetchMessages();
  }, [data.chatId]);

  const handleSendMessage = async () => {
    if (message.trim() || attachment) {
      let newMessage;
      if (editingMessage) {
        newMessage = { ...editingMessage, message, type: attachment ? 'image' : 'text', attachment };
        await Api.editMessage(newMessage, data.chatId); // Edit the message in the API
        setMessages((prevMessages) =>
          prevMessages.map((msg) => (msg.id === newMessage.id ? newMessage : msg))
        );
      } else {
        newMessage = {
          id: new Date().getTime(), // Unique ID for the new message
          sender: user.id,
          message,
          type: attachment ? 'image' : 'text',
          attachment,
          timestamp: new Date().toISOString(),
        };
        await Api.sendMessage(newMessage, data.chatId); // Send the message to the API
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
      setMessage('');
      setAttachment(null);
      setEditingMessage(null);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const attachmentUrl = await Api.uploadAttachment(file); // Upload the file to your storage and get the URL
      setAttachment(attachmentUrl);
    }
  };

  const handleEditMessage = (msg) => {
    setMessage(msg.message);
    setAttachment(msg.attachment);
    setEditingMessage(msg);
  };

  return (
    <div className="chatWindow">
      <div className="chatWindow--header">
        <img className="chatWindow--avatar" src="https://t4.ftcdn.net/jpg/05/11/55/91/360_F_511559113_UTxNAE1EP40z1qZ8hIzGNrB0LwqwjruK.jpg" alt="Avatar" />
        <div className="chatWindowItem--name">Rohit</div>
        <div className="chatWindow--title">{data.title}</div>
      </div>
      <div className="chatWindow--messages">
        {messages.map((msg, index) => (
          <div key={msg.id || index} className={`message ${msg.sender === user.id ? 'outgoing' : 'incoming'}`}>
            {msg.attachment && (
              <div className="message--attachment">
                <img src={msg.attachment} alt="Attachment" />
              </div>
            )}
            <div className="message--text">{msg.message}</div>
            {msg.sender === user.id && (
              <EditIcon className="edit-icon" onClick={() => handleEditMessage(msg)} />
            )}
          </div>
        ))}
      </div>
      <div className="chatWindow--input">
        <input
          type="file"
          id="attachment"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <label htmlFor="attachment" className="chatWindow--attachmentIcon">
          <AttachFileIcon />
        </label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <SendIcon onClick={handleSendMessage} className="chatWindow--sendButton" />
      </div>
    </div>
  );
}
