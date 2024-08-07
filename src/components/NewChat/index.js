import React, { useState, useEffect } from 'react';
import Api from '../../db/Api';
import './NewChat.css';
import CloseIcon from '@mui/icons-material/Close';
import AttachFileIcon from '@mui/icons-material/AttachFile';

export default function NewChat({ setActiveChat, user, show, setShow }) {
  const [list, setList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const getList = async () => {
      if (user !== null) {
        let results = await Api.getContactList(user.id);
        setList(results);
      }
    };
    getList();
  }, [user]);

  const handleClose = () => setShow(!show);

  const addNewChat = async (userChat) => {
    if (selectedFile) {
      await Api.addNewChat(user, userChat, setActiveChat, selectedFile);
    } else {
      await Api.addNewChat(user, userChat, setActiveChat);
    }
    handleClose();
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className="sidebar newChat" style={{ top: show ? '60px' : '100vh' }}>
      <div className="sidebar--topo topo-transparent"></div>
      <div className="sidebar--content">
        <div className="sidebar--chatlist">
          <div className='sidebar--chatlist-top'>
            <h1>Contacts</h1>
            <div onClick={handleClose} className="newChat--closebutton">
              <CloseIcon style={{ color: 'black', fontSize: 30, cursor: 'pointer', 
               }} />
            </div>
          </div>
          <input
            type="file"
            id="attachment"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="attachment" className="newChat--attachment">
            <AttachFileIcon style={{ color: '#1DAB67', fontSize: 30, cursor: 'pointer' }} />
          </label>
          <div className="newChat--list">
            {list.map((item, key) => (
              <div onClick={() => { addNewChat(item) }} className="newChat--item" key={key}>
                <img className="newChat--itemAvatar" src={item.avatar} alt="" />
                <div className="newChat--itemName">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
