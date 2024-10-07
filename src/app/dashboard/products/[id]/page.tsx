'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { fetchProduct } from '../../../../redux/features/productSlice';
import { RootState } from '../../../../redux/store';
import styled from 'styled-components';
import { AppDispatch } from '@/redux/store/store';

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #d1d1d1;
  border-radius: 8px;
  background-color: #f8f8f8;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: green;
`;

const Description = styled.p`
  font-size: 16px;
  color: #555;
`;

const Loader = styled.div`
  text-align: center;
  font-size: 18px;
  color: #666;
`;

const ProductDetails: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const { product, loading, error } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [id, dispatch]);

  if (loading) return <Loader>Loading...</Loader>;
  if (error) return <div>Error: {error}</div>;

  if (!product) {
    return <div>No product found.</div>;
  }

  return (
    <Container>
      <Title>{product.title}</Title>
      <Image
        src={product.image}
        alt={product.title}
        onError={(e) => (e.currentTarget.src = '/path/to/fallback/image.jpg')}
      />
      <Price>${product.price.toFixed(2)}</Price>
      <Description>{product.description}</Description>
      <p>Category: {product.category}</p>
      <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
    </Container>
  );
};

export default ProductDetails;
