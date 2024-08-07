import firebase from 'firebase/compat/app';
import { auth, db, storage } from './firebaseConfig';

const Api = {
  onChatList: (userId, setChatList) => {
    setChatList([
      { chatId: '1', name: 'User 1', avatar: 'https://via.placeholder.com/150' },
      { chatId: '2', name: 'User 2', avatar: 'https://via.placeholder.com/150' }
    ]);
  },
  addUser: async (user) => {
    console.log('User added:', user);
  },
  getContactList: async (userId) => {
    return [
      { id: 'user1', name: 'User One', avatar: 'https://via.placeholder.com/150' },
      { id: 'user2', name: 'User Two', avatar: 'https://via.placeholder.com/150' }
    ];
  },
  addNewChat: async (user, userChat, setActiveChat, selectedFile = null) => {
    const newChat = { chatId: 'newChatId', name: userChat.name, avatar: userChat.avatar };
    setActiveChat(newChat);
    console.log('New chat started with:', userChat.name);
  },
  onChatContent: (chatId, setList, setUsers) => {
    setList([
      { sender: 'user1', message: 'Hello!', type: 'text' },
      { sender: 'user2', message: 'Hi!', type: 'text' }
    ]);
    setUsers(['user1', 'user2']);
    return () => {};
  },
  getChatMessages: async (chatId) => {
    return [
      { sender: 'user1', message: 'Hello!', type: 'text', timestamp: new Date().toISOString() },
      { sender: 'user2', message: 'Hi!', type: 'text', timestamp: new Date().toISOString() }
    ];
  },
  sendMessage: async (messageData, chatId) => {
    console.log('Message sent:', { messageData, chatId });
    return messageData;
  },
  uploadAttachment: async (file) => {
    return 'https://via.placeholder.com/300';
  },
  editMessage: async (newMessage, chatId) => {
    console.log('Message edited:', { newMessage, chatId });
    return newMessage;
  },
  GooglePopup: async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await auth.signInWithPopup(provider);
      return result;
    } catch (error) {
      console.error('Google login failed', error);
      return null;
    }
  }
};

export default Api;
