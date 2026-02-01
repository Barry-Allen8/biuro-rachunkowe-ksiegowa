
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
  const baseStyles = "px-8 py-4 rounded-full font-medium transition-all duration-500 flex items-center justify-center gap-2 relative overflow-hidden";

  const variants = {
    primary: "bg-[#004D40] text-white hover:bg-[#003d33] shadow-depth-md hover:shadow-depth-lg",
    secondary: "border border-gray-200 bg-transparent text-[#1D1D1F] hover:border-gray-300 hover:bg-gray-50", // Clearly secondary - border-only
    outline: "border border-[#E5E5E5] bg-transparent text-[#1D1D1F] hover:bg-gray-50"
  };

  return (
    <motion.button
      whileHover={{ y: -0.5 }} // Minimal lift - more grounded
      whileTap={{ scale: 0.98 }} // No bounce, just firm press
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }} // Slower, deliberate
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
};
