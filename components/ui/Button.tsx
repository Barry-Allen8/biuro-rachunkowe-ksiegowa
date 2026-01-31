
import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  className = '', 
  type = 'button' 
}) => {
  const baseStyles = "px-8 py-4 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-[#004D40] text-white hover:bg-[#003d33] shadow-lg shadow-[#004d40]/20",
    secondary: "bg-[#1D1D1F] text-white hover:bg-black",
    outline: "border border-[#E5E5E5] bg-transparent text-[#1D1D1F] hover:bg-gray-50"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};
