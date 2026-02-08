import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  type = 'button',
  disabled = false
}) => {
  const baseStyles = "rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-10 py-5 text-lg"
  };

  const variants = {
    primary: "bg-navy-900 text-white hover:bg-navy-800 shadow-depth-md hover:shadow-depth-lg",
    secondary: "border-2 border-navy-200 bg-white text-navy-900 hover:border-navy-900 hover:bg-navy-50",
    outline: "border-2 border-navy-900 bg-transparent text-navy-900 hover:bg-navy-900 hover:text-white",
    gold: "bg-gradient-to-r from-gold-500 to-gold-400 text-navy-900 font-bold hover:shadow-gold"
  };

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const isMagnetic = variant === 'gold' && !disabled;
  const magneticX = useMotionValue(0);
  const magneticY = useMotionValue(0);
  const springX = useSpring(magneticX, { stiffness: 380, damping: 22, mass: 0.2 });
  const springY = useSpring(magneticY, { stiffness: 380, damping: 22, mass: 0.2 });

  const resetMagnet = () => {
    magneticX.set(0);
    magneticY.set(0);
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isMagnetic || !buttonRef.current) return;
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    const strength = 0.16;
    const maxOffset = 8;

    magneticX.set(Math.max(-maxOffset, Math.min(maxOffset, offsetX * strength)));
    magneticY.set(Math.max(-maxOffset, Math.min(maxOffset, offsetY * strength)));
  };

  return (
    <motion.button
      ref={buttonRef}
      whileHover={disabled ? {} : isMagnetic ? { scale: 1.02 } : { y: -1, scale: 1.01 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={isMagnetic ? { x: springX, y: springY } : undefined}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetMagnet}
      onBlur={resetMagnet}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};
