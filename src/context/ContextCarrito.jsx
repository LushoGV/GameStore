import { useContext, useEffect, createContext, useState } from "react";

export const CarritoContext = createContext();

export const CarritoProvider = ({children}) => {

    const [shopContent, setShopContent] = useState();
    const [alertState, setAlertState] = useState();
    const [alertStateValue, setAlertStateValue] = useState(false);
    const checkShop = () => localStorage.shop ? setShopContent(localStorage.shop.split(',')) : (localStorage.setItem('shop', ''), setShopContent(localStorage.shop.split(',')))
  
    const changeShopContent = (newContent, value) => {

     
        setTimeout(() => {
          setAlertState(true);//activa la alerta
        }, 1000);
    
        setTimeout(() => {
          setAlertState(false);
        }, 4000);
    
    
      setAlertState(false);
      setShopContent(newContent);
      setAlertStateValue(value);
    };

    const contextContent = {
        shopContent,
        changeShopContent,
        alertState,
        alertStateValue,
    }

    
  useEffect(()=>{
    checkShop()
  },[])

  return (
    <CarritoContext.Provider value={contextContent}>
        {children}
    </CarritoContext.Provider>
  )
}

export const useCarritoContext = () =>{
  
    const { shopContent, changeShopContent, alertState, alertStateValue, } = useContext(CarritoContext)
  
    return {shopContent, changeShopContent, alertState, alertStateValue,}
  }