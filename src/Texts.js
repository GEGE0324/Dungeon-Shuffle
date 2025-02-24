import React, { useState, useEffect } from 'react';
import './App.css';

const textArray = [
  "In the deepest part of the dungeon, a mysterious plant—Dudu—grows in the darkness.",
  "Its fruit glows faintly, as if containing an indescribable power.",
  "The wizard carefully transports this mysterious fruit to the island using an ancient basket and pulley.",
  "The wizard carefully transports this mysterious fruit to the island using an ancient basket and pulley.",
  "The wizard carefully transports this mysterious fruit to the island using an ancient basket and pulley.",
  "Every vine carries endless secrets, and every creaking sound tells the story of time's passage.",
  "Every vine carries endless secrets, and every creaking sound tells the story of time's passage.",
  "Every vine carries endless secrets, and every creaking sound tells the story of time's passage.",
  "The fruit melts in the fire, its crystalline liquid gradually, carrying mysterious energy.",
  "The scorching flames devour the fruit, and the flowing liquid quietly accumulates invisible power.",
  "The scorching flames devour the fruit, and the flowing liquid quietly accumulates invisible power.",
  "The scorching flames devour the fruit, and the flowing liquid quietly accumulates invisible power.",
  "The liquid dries in the easterly wind, gradually crystallizing into transparent crystals.",
  "The liquid dries in the easterly wind, gradually crystallizing into transparent crystals.",
  "The liquid dries in the easterly wind, gradually crystallizing into transparent crystals.",
  "Each crystal glows with ancient energy, pure yet mysterious, as if hiding an unsolvable riddle.",
  "The storeroom beneath the island holds all of the wizard's crystals.",
  "The storeroom beneath the island holds all of the wizard's crystals.",
  "They quietly sparkle, waiting for the day they will be awakened again to release the forgotten power.",
  "In this treehouse, the wizard left his memories and wisdom.",
  "Each ancient book, each alchemical instrument, tells the story of his past.",
  "From the balcony, the wizard gazes into the distance, the lights illuminating the entire island, and also lighting up his memories.",
  "These crystal lamps hanging from the trees seem to be the bond between him and the past, never severed.",
  "The entire island, bathed in the gentle sea breeze and the glow of the crystal lamps, feels like an endless dream.",
  "The wind blows, the lights sway, and the wizard's legend will live on forever.",
  "The wizard has left, but his memory still sparkles in every corner of the island.",
  "On this mysterious land, his story continues."
];


const Texts = () => {
  const [scrollProgress, setScrollProgress] = useState(0);  // 用于存储百分比进度
  const [isScrolling, setIsScrolling] = useState(false);  // 判断是否在滚动

  const maxProgress = textArray.length - 1;  // 进度的最大值

  // 计算当前应该显示的文字
  const getCurrentTextIndex = () => {
    return Math.floor((scrollProgress / 100) * maxProgress);
  };

  useEffect(() => {
    const handleWheel = (e) => {
      let newProgress = scrollProgress;

      // 每次滚动调整进度百分比，避免超过 0 和 100
      if (e.deltaY > 0) {
        newProgress = Math.min(scrollProgress + 1, 100);  // 向下滚动时，增加进度（每次滚动增加1%）
      } else {
        newProgress = Math.max(scrollProgress - 1, 0);  // 向上滚动时，减少进度（每次滚动减少1%）
      }

      setScrollProgress(newProgress);  // 更新进度百分比
    };

    window.addEventListener('wheel', handleWheel);

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [scrollProgress]);

  return (
    <div className="floating-text" style={{ position: 'absolute', bottom: '2%', left: '50%', transform: 'translateX(-50%)' }}>
      <div>{textArray[getCurrentTextIndex()]}</div>
    </div>
  );
};

export default Texts;
