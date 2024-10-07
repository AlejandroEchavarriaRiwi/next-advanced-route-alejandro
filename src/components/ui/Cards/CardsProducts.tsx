import React, { useState } from 'react';
import styled from 'styled-components';

interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  onClick: () => void;
}

const CardContainer = styled.div`
  border: 1px solid #d1d1d1;
  border-radius: 8px;
  padding: 16px;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 12px;
`;

const ProductTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`;

const ProductPrice = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #666;
  margin-bottom: 8px;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: #777;
  margin-bottom: 12px;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`;

const RatingStar = styled.span`
  color: #ffd700;
  margin-right: 4px;
`;

const RatingCount = styled.span`
  font-size: 14px;
  color: #888;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const LikeButton = styled(Button)`
  background-color: green;
  color: white;
  margin-right: 8px;
`;

const AddToCartButton = styled(Button)`
  background-color: #424242;
  color: white;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: auto;
`;

const ProductCard: React.FC<ProductProps> = ({ id, title, price, description, image, rating, onClick }) => {
  const [liked, setLiked] = useState(false);
  const [inCart, setInCart] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleAddToCart = () => {
    setInCart(!inCart);
  };

  return (
    <CardContainer onClick={onClick}> {}
      <ProductImage src={image} alt={title} />
      <ProductTitle>{title}</ProductTitle>
      <ProductPrice>${price.toFixed(2)}</ProductPrice>
      <ProductDescription>{description.substring(0, 100)}...</ProductDescription>
      <RatingContainer>
        <RatingStar>★</RatingStar>
        <RatingCount>{rating.rate} ({rating.count} reviews)</RatingCount>
      </RatingContainer>
      <ButtonContainer>
        <LikeButton onClick={(e) => { e.stopPropagation(); handleLike(); }}> {}
          {liked ? '❤️' : '🤍'} {}
        </LikeButton>
        <AddToCartButton onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}>
          {inCart ? 'Remove from Cart' : 'Add to Cart'}
        </AddToCartButton>
      </ButtonContainer>
    </CardContainer>
  );
};

export default ProductCard;
