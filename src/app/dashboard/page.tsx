'use client'
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import NavbarDashboard from '../../components/ui/NavBar/NavBarDashboard';
import ProductCard from '../../components/ui/Cards/CardsProducts';
import styled from 'styled-components';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  color: #666;
  font-size: 18px;
  margin-top: 20px;
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
`;

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated') {
      fetchProducts();
    }
  }, [status, session]);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('An error occurred while fetching products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductClick = (id: number) => {
    router.push(`/auth/products/${id}`);
  };

  if (status === 'loading') {
    return <LoadingMessage>Loading session...</LoadingMessage>;
  }

  if (status === 'unauthenticated') {
    return <ErrorMessage>Access denied. Please log in.</ErrorMessage>;
  }

  return (
    <>
      <NavbarDashboard />
      <DashboardContainer>
        <Title>Dashboard</Title>
        {isLoading && <LoadingMessage>Loading products...</LoadingMessage>}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ProductGrid>
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              {...product} 
              onClick={() => handleProductClick(product.id)} // Pass click handler
            />
          ))}
        </ProductGrid>
      </DashboardContainer>
    </>
  );
}
