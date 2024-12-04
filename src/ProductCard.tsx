// src/components/ProductCard.tsx
import React from 'react';
import './ProductCard.css';

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
}

const ProductCard = ({ id, name, image }: ProductCardProps) => {
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <p>{name}</p>
    </div>
  );
};

export default ProductCard;
