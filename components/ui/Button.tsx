import React from 'react';
import { motion } from 'framer-motion';

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

  return (
    <motion.button
      whileHover={disabled ? {} : { y: -1, scale: 1.01 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};
