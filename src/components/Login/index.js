import React, { useState } from 'react';
import Api from '../../db/Api.js';
import './Login.css';
import image from '../../assests/preview.png';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Login({ onReceive }) {
  const [loginOptions, setLoginOptions] = useState(false);

  const handleLoginOption = () => setLoginOptions(!loginOptions);

  const handleGoogleLogin = async () => {
    let result = await Api.GooglePopup();
    if (result) {
      onReceive(result.user);
    }
  };

  return (
    <section className="container-login">
      <div className="login-topbar">
        <div className="topbar--version">
          <div className="topbar--login" onClick={handleLoginOption}>
            <div>Login</div>
            <KeyboardArrowDownIcon
              style={{ color: '#ccc', transform: `rotate(${loginOptions ? '180deg' : '0'})` }}
            />
          </div>
          <div className="login-options" style={{ display: loginOptions ? 'flex' : 'none' }}>
            <div className="login--option" onClick={handleGoogleLogin}>Google</div>
          </div>
        </div>
      </div>
      <div className="login-main">
        <div className="login-main--top">
          <img
            className="login-main--top-img"
            src="https://i.pinimg.com/originals/f5/28/cc/f528cc010d8a9bfcef07d08106976d0f.png"
            alt=""
          />
          <h1>Message any Time anywhere 💬</h1>
        </div>
      </div>
      <div className="login-main--content">
        <img src={image} alt="preview" />
      </div>
      <div className="footer">
        &copy; 2024 <a href="https://ernane-dev.netlify.app/">Developed by Lakshita</a>
      </div>
    </section>
  );
}
