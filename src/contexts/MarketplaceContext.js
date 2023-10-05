import React, { createContext, useContext, useMemo, useEffect, useState, useRef, useCallback } from 'react';

export const MarketplaceContext = createContext();
export const MarketplaceConsumer = MarketplaceContext.Consumer;
export const useMarketplaceContext = () => useContext(MarketplaceContext);

export default function MarketplaceProvider(props) {
  const { children } = props;
  const [data, setData] = useState();
  const prevDataRef = useRef();

  const fetchAndSet = useCallback(() => {
    fetch(`http://localhost:4000/v1/marketplace-items`).then((resp) => resp.json().then((data) => {
      setData(data)
      prevDataRef.current = data;
    }));
  }, [data, prevDataRef, setData]) 

  useEffect(() => {
    if(prevDataRef.current !== data || !data){
      fetchAndSet();
    }
  }, [data]);

  const context = useMemo(() => {
    return ({
      items: data,
      refetch: () => fetchAndSet(),
    })
  }, [data])

  return(
    <MarketplaceContext.Provider value={context}>
      {children}
    </MarketplaceContext.Provider>
  )
}