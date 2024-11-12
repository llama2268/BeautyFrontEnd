// src/components/ProductCard.tsx
import React from 'react';
import './ProductCard.css';

interface ProductCardProps {
  id: number;
  name: string;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, image }) => {
  return (
    <div className="product-card" key={id}>
      <img src={image} alt={name} />
      <p>{name}</p>
    </div>
  );
};

export default ProductCard;
