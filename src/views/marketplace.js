import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useMarketplaceContext } from '../contexts/MarketplaceContext';

const Marketplace = styled((props) => {
  const { className } = props;
  const { items } = useMarketplaceContext();
  const [newItemOpen, setNewItemOpen] = useState();

  return(
    <div className={className}>
      <h1>Marketplace</h1>
    </div>
  )
})`
  width: 100%;
`;

export default Marketplace;