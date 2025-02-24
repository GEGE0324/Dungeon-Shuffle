import React, { useEffect } from 'react';
import './App.css';

const Game = () => {
  useEffect(() => {
    const handleWheel = (event) => {
      // Prevent background scroll when scrolling within game card
      event.stopPropagation();
    };

    const gameCard = document.querySelector('.game-card');
    gameCard.addEventListener('wheel', handleWheel, { passive: false });

    // Cleanup event listener when component unmounts
    return () => {
      gameCard.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="game-overlay">
      <div className="game-card">
        <h2>Dungeon Shuffle</h2>
        <p>This is a beautiful letter-like page for the game.</p>
        <video src="/sample-video.mp4" controls className="game-video"></video>
        <img src="/sample-image.png" alt="Sample" className="game-image" />
        <p>I will make stairs and doors...</p>
         <p>I will make stairs and doors...</p>
         <p>I will make stairs and doors...</p>
         <p>I will make stairs and doors...</p>
         <p>I will make stairs and doors...</p>
         <p>I will make stairs and doors...</p>
         <p>I will make stairs and doors...</p>
         <p>I will make stairs and doors...</p>
         <p>I will make stairs and doors...</p>
         <p>I will make stairs and doors...</p>
         <p>I will make stairs and doors...</p>

        
      </div>
    </div>
  );
};

export default Game;
