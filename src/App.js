// src/App.js
import React, { useState } from 'react';
import Island from './Island';
import Texts from './Texts';
import './App.css';
import Game from './Game';  // 引入新的 Game 组件

const App = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [isGameOpen, setIsGameOpen] = useState(false);  // 新增 Game 状态

  const handleButtonClick = (section) => {
    console.log(`Navigating to ${section}`);
    if (section === 'Contact') {
      setIsContactOpen(true);
      setIsTeamOpen(false);
      setIsGameOpen(false);  // 关闭 Game
    }
    if (section === 'Team') {
      setIsTeamOpen(true);
      setIsContactOpen(false);
      setIsGameOpen(false);  // 关闭 Game
    }
    if (section === 'Game') {
      setIsGameOpen(true);
      setIsContactOpen(false);
      setIsTeamOpen(false);
    }
  };

  const closeGame = (e) => {
    if (e.target.classList.contains('game-overlay')) {
      setIsGameOpen(false);
    }
  };

  return (
    <div className="App">
      {/* 导航栏 */}
      <nav className="navbar">
        <div className="logo">
          <img src="/logo.png" alt="Game Logo" className="logo-image" />
        </div>

        <div className="nav-buttons">
          <button className="nav-button" onClick={() => handleButtonClick('Game')}>Game</button>
          <button className="nav-button" onClick={() => handleButtonClick('Team')}>Team</button>
          <button className="nav-button" onClick={() => handleButtonClick('Contact')}>Contact</button>
        </div>
      </nav>

      {/* Game 信纸页面 */}
      {isGameOpen && (
        <div className="game-overlay" onClick={closeGame}>
          <Game />
        </div>
      )}

      {/* Contact 卡片 */}
      {isContactOpen && (
        <div className="contact-overlay" onClick={(e) => {
          if (e.target.classList.contains('contact-overlay')) {
            setIsContactOpen(false);
          }
        }}>
          <div className="contact-card">
            <h2>Contact Us</h2>
            <p>Email: gege.fei@aalto.fi</p>
            <p>Phone: +358 442 463 898</p>
            <p>Address: Aalto University, Helsinki, Finland</p>
          </div>
        </div>
      )}

      {/* Team 卡片 */}
      {isTeamOpen && (
        <div className="team-overlay" onClick={(e) => {
          if (e.target.classList.contains('team-overlay')) {
            setIsTeamOpen(false);
          }
        }}>
          <div className="team-section-cards">
            <div className="team-card card1">
              <img src="/team1.png" alt="Member 1" />
              <h3>Hiski Huovila</h3>
              <p>Producer</p>
            </div>
            <div className="team-card card2">
              <img src="/team2.png" alt="Member 2" />
              <h3>Iiro Peltonen</h3>
              <p>Game Designer</p>
            </div>
            <div className="team-card card3">
              <img src="/team3.png" alt="Member 3" />
              <h3>Yidi Mao</h3>
              <p>Developer</p>
            </div>
            <div className="team-card card4">
              <img src="/team4.png" alt="Member 4" />
              <h3>Gege Fei</h3>
              <p>Lead Artist</p>
            </div>
            <div className="team-card card5">
              <img src="/team5.png" alt="Member 5" />
              <h3>Connor Zhang</h3>
              <p>Game Designer</p>
            </div>
          </div>
        </div>
      )}

      <div style={{ height: '100%', position: 'relative' }}> 
        <Island />
        <Texts />
      </div>
    </div>
  );
};

export default App;
