import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false
}) => {
  const baseStyles = 'rounded-lg px-6 py-3 font-medium transition-colors duration-200';
  
  const variants = {
    primary: 'bg-cyan-400 hover:bg-cyan-500 text-white',
    secondary: 'bg-purple-600 hover:bg-purple-700 text-white',
    outline: 'border-2 border-purple-600 text-purple-600 hover:bg-purple-50'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {children}
    </button>
  );
};

export default Button; 