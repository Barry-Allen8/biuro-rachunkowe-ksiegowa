
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
  const baseStyles = "px-8 py-4 rounded-full font-medium transition-all duration-300 ease-studio flex items-center justify-center gap-2 relative overflow-hidden";

  const variants = {
    primary: "bg-[#004D40] text-white hover:bg-[#003d33] shadow-studio hover:shadow-studio-hover",
    secondary: "bg-[#F5F5F7] text-[#1D1D1F] hover:bg-[#EAEAEA]", // Adjusted for lower visual weight
    outline: "border border-[#E5E5E5] bg-transparent text-[#1D1D1F] hover:bg-gray-50"
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};
