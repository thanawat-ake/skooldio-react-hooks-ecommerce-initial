import { useState, useEffect } from 'react';
import styled from 'styled-components';

import BaseContainer from '../components/Container';
import Button from '../components/Button';
import Input from '../components/Input';

import { useParams } from 'react-router-dom';

import { numberWithCommas } from '../utils';

const Container = styled(BaseContainer)`
  padding-top: 78px;
  padding-bottom: 78px;
  display: grid;
  grid-template-columns: 1fr;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 96px;
  }
`;

const ProductImage = styled.img`
  width: 100%;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 40px;
  line-height: 60px;
  font-weight: 600;
  margin-bottom: 72px;
`;

const Subtitle = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 32px;
  line-height: 48px;
  font-weight: 400;
  color: #000000;
`;

const Description = styled.p`
  font-size: 24px;
  line-height: 36px;
  font-weight: 300;

  color: #000000;
  margin-top: 0;
  margin-bottom: 72px;
`;

/**
 * Below is the main ProductDetail component.
 */
export const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(false);
    fetch('https://us-central1-skooldio-react-hooks.cloudfunctions.net/products/' + productId)
      .then((resp) => resp.json())
      .then((data) => {
        setProduct(data);
        setLoading(true);
      });
  });
  if (loading || !product) return <div>Loading...</div>;
  return (
    <Container>
      <ProductImage src={product.imageUrl} alt={`${product.name}`} />
      <ProductInfo>
        <Subtitle>
          <span>{product.category}</span>
          <span>฿{numberWithCommas(product.price)}</span>
        </Subtitle>
        <Title>{product.name}</Title>
        <Description>{product.description}</Description>
        <Input style={{ marginBottom: '40px' }} type={'number'} label={'Quantity'} />
        <Button>Add to Cart</Button>
      </ProductInfo>
    </Container>
  );
};

export default ProductDetail;
