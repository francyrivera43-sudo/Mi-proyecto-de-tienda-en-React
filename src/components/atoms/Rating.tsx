import React from 'react';

interface RatingProps {
  rate?: number;
}

export default function Rating({ rate = 4 }: RatingProps) {
  // Asumiendo un máximo de 5 estrellas
  const fullStars = Math.round(rate);
  
  return (
    <div className="flex items-center text-[10px] text-yellow-500 mb-2">
      {'⭐'.repeat(fullStars)}
      {'☆'.repeat(5 - fullStars)}
    </div>
  );
}
