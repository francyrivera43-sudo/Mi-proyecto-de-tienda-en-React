import React from 'react';

type BadgeVariant = 'default' | 'blue' | 'green' | 'red' | 'yellow' | 'purple';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-gray-700',
  blue:    'bg-blue-100 text-blue-700',
  green:   'bg-green-100 text-green-700',
  red:     'bg-red-100 text-red-700',
  yellow:  'bg-yellow-100 text-yellow-700',
  purple:  'bg-purple-100 text-purple-700',
};

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
