import React from 'react';

interface InputProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  icon?: string;
  id?: string;
  required?: boolean;
  className?: string;
}

export default function Input({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  icon,
  id,
  required = false,
  className = '',
}: InputProps) {
  return (
    <div className="relative w-full">
      {icon && (
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 pointer-events-none">
          {icon}
        </span>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-4 py-2 border border-gray-200 rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${className}`}
      />
    </div>
  );
}
