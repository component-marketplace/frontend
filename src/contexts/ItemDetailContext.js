import React, { createContext, useContext, useCallback, useMemo, useEffect, useState, useRef } from 'react';
import { useParams } from "react-router-dom";

export const ItemDetailContext = createContext();
export const ItemDetailConsumer = ItemDetailContext.Consumer;
export const useItemDetailContext = () => useContext(ItemDetailContext);

export default function ItemDetailProvider(props) {
  const { children } = props;
  const [data, setData] = useState();
  const prevDataRef = useRef();
  const { itemId } = useParams();

  const fetchAndSet = useCallback(() => {
    fetch(`http://localhost:3000/v1/items/${itemId}`).then((resp) => resp.json().then((data) => {
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
      item: {
        ...data?.item, 
        costToBuild: data?.cost_to_build, 
        profit: data?.profit, 
        sales: data?.sale_receipts, 
        fg_buffer: data?.fg_buffer
      },
      components: data?.components,
      refetch: () => fetchAndSet(),
    })
  }, [data])

  return(
    <ItemDetailContext.Provider value={context}>
      {children}
    </ItemDetailContext.Provider>
  )
}