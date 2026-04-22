import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-bold rounded transition-colors focus:outline-none shadow-sm hover:shadow-md";
  
  const variants = {
    primary: "bg-violet-600 hover:bg-violet-700 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800 border border-gray-200 shadow-none hover:shadow-none",
    danger: "text-red-500 hover:text-red-700 hover:bg-red-50 shadow-none hover:shadow-none",
    ghost: "text-gray-600 hover:bg-gray-100 shadow-none hover:shadow-none"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-[10px]",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
