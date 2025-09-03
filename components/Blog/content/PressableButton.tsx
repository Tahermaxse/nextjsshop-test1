'use client';
import React, { useState } from "react";
import { motion } from "framer-motion";

const PressableButton = () => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    setIsPressed(true);
  };

  const handleRelease = () => {
    setIsPressed(false);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
    <div className="flex-0 hidden justify-end lg:flex">
      <button
        className="relative cursor-pointer select-none w-[320px]"
        onMouseDown={handleClick}
        onMouseUp={handleRelease}
        onTouchStart={handleClick}
        onTouchEnd={handleRelease}
        aria-label="Launch button"
      >
        <img
          alt="Button bottom layer"
          className="z-1 relative"
          src="/buttons/bottom.svg"
        />
        <motion.img
          alt="Button middle layer"
          className="z-2 absolute left-0 top-0"
          src="/buttons/middle1.svg"
          animate={{ y: isPressed ? 24 : 0, scale: isPressed ? 0.98 : 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
        <img
          alt="Button top layer"
          className="z-3 absolute left-0 top-0"
          src="/buttons/top.svg"
        />
      </button>
    </div>
    </div>
  );
};

export default PressableButton;