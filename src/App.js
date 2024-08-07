import React, { useState, useEffect } from 'react';
import Api from './db/Api';
import './App.css';
import ChatListItem from './components/ChatListItem';
import ChatIntro from './components/ChatIntro';
import ChatWindow from './components/ChatWindow';
import NewChat from './components/NewChat';
import Login from './components/Login';
import NotDisturb from './components/NotDisturb';
import TopBar from './components/TopBar';
import StatusList from './components/status/StatusList';
import ForumIcon from '@mui/icons-material/Forum';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AddIcon from '@mui/icons-material/Add';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';

export default function App() {
  const [user, setUser] = useState(null);
  const [chatList, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState({});
  const [showNewChat, setShowNewChat] = useState(false);
  const [showStatusList, setShowStatusList] = useState(false);

  useEffect(() => {
    if (user === null) {
      setUser(JSON.parse(localStorage.getItem('user')));
    } else {
      Api.onChatList(user.id, setChatList);
    }
  }, [user]);

  const handleNewChat = () => {
    setShowNewChat(!showNewChat);
  };

  const handleLoginData = async (u) => {
    const newUser = {
      id: u.uid,
      name: u.displayName,
      email: u.email,
      avatar: u.photoURL,
      provider: u.providerData.providerId,
    };
    await Api.addUser(newUser);
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const handleToggleStatusList = () => {
    setShowStatusList(!showStatusList);
  };

  if (user === null) return <Login onReceive={handleLoginData} />;

  return (
    <div className="app-window">
      <NewChat
        setActiveChat={setActiveChat}
        chatList={chatList}
        user={user}
        show={showNewChat}
        setShow={setShowNewChat}
      />
      <TopBar user={user} chatList={chatList} setUser={setUser} setChatList={setChatList} />
      <div className="MainContent">
        <div className="sidebar">
          <div className="sidebar--topo"></div>
          <div className="sidebar--content">
            <div className="sidebar--actions">
              <div className="sidebar--actions--btn">
                <ForumIcon style={{ color: '#1DAB67', fontSize: 40 }} />
                <p className="sidebar--actions-label">Messages</p>
              </div>
              <div className="sidebar--actions--btn">
                <LocalPhoneIcon style={{ color: '#A5A5A5', fontSize: 40 }} />
                <p className="sidebar--actions-label">Calls</p>
              </div>
              <div className="sidebar--actions--btn" onClick={handleToggleStatusList}>
                <DonutLargeIcon
                  style={{ color: showStatusList ? '#1DAB67' : '#A5A5A5', fontSize: 40 }}
                />
                <p className="sidebar--actions-label">Status</p>
              </div>
            </div>
            <div className="sidebar--chatlist">
              <div className="sidebar--chatlist-disturb">
                <NotDisturb />
              </div>
              {showStatusList ? (
                <StatusList />
              ) : chatList.length > 0 ? (
                chatList.map((item, key) => (
                  <ChatListItem
                    key={key}
                    data={item}
                    active={activeChat.chatId === item.chatId}
                    onClick={() => setActiveChat(item)}
                    name={key % 2 === 0 ? 'Mira' : 'Lakshita'} // Alternate names
                  />
                ))
              ) : (
                <div className="not-chat-search">
                  <div className="chat-notfound" style={{ marginTop: 20 }}>
                    <ForumIcon style={{ color: '#ccc', fontSize: 50 }} />
                    <p className="sidebar--actions-label" style={{ color: '#999' }}>No Chat found</p>
                  </div>
                </div>
              )}
              <div className="sidebar--chatlist-newChat">
                <h1>You've come to an end.</h1>
                <p>Add more friends!</p>
                <div className="sidebar--chatlist--btn-more" onClick={handleNewChat}>
                  <AddIcon style={{ color: '#fff', fontSize: 40 }} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="contentarea">
          {activeChat.chatId !== undefined ? (
            <ChatWindow user={user} data={activeChat} />
          ) : (
            <ChatIntro />
          )}
        </div>
      </div>
    </div>
  );
}
