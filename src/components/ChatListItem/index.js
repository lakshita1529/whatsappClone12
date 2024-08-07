// src/components/ChatListItem.js
import React, { useState, useEffect } from 'react';
import './ChatListItem.css';

export default function ChatListItem({ onClick, data, active, name }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    if (data.lastMessageDate) {
      let d = new Date(data.lastMessageDate.seconds * 1000);
      let hours = d.getHours();
      let minutes = d.getMinutes();
      hours = hours < 10 ? `0${hours}` : hours;
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      setTime(`${hours}:${minutes}`);
    }
  }, [data]);

  return (
    <div>
      <div className={`chatListItem ${active ? 'active' : ''}`} onClick={onClick}>
        <div className="chatListItem--avatar" /> {/* Avatar placeholder */}
        <div className="chatListItem--details">
          <div className="chatListItem--name">{name}</div> {/* Display user name */}
          <div className="chatListItem--lastMsg">
            <p>{data.lastMessage}</p>
          </div>
          <div className="chatListItem--date">{time}</div>
        </div>
      </div>
      <hr className="divider" /> {/* Divider line */}
    </div>
  );
}
