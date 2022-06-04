import { createContext, useContext, useEffect, useState } from "react";
import useLockScroll from "../hooks/useLockScroll";

export const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {

    const [loader, setLoader] = useState(true)
    const changeLoader = (newState) =>setLoader(newState)

    useLockScroll(loader)

    useEffect(()=>{
        changeLoader(false)
    },[])
    
    const contextContent = {
        loader,
        changeLoader
    }

    return(
    <LoaderContext.Provider value={contextContent}>
        {children}
    </LoaderContext.Provider>
    )
}

export const useLoaderContext = () =>{

    const { loader,changeLoader } = useContext(LoaderContext)

    return {loader,changeLoader} 
}