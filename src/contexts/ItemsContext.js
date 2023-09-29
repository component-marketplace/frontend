import React, { createContext, useContext, useMemo, useEffect, useState, useRef, useCallback } from 'react';

export const ItemsContext = createContext();
export const ItemsConsumer = ItemsContext.Consumer;
export const useItemsContext = () => useContext(ItemsContext);

export default function ItemsProvider(props) {
  const { children } = props;
  const [data, setData] = useState();
  const prevDataRef = useRef();

  const fetchAndSet = useCallback(() => {
    fetch(`http://localhost:3000/v1/items`).then((resp) => resp.json().then((data) => {
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
    <ItemsContext.Provider value={context}>
      {children}
    </ItemsContext.Provider>
  )
}