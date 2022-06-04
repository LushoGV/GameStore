import { createContext, useContext, useEffect, useState } from "react";

export const InputContext = createContext();

export const InputProvider = ({ children }) => {

  const [inputState, setInputState] = useState(false)
  const inputActive = () => setInputState(!inputState)

  const contextContent = {
    inputState,
    inputActive
  };

  return (
    <InputContext.Provider value={contextContent}>
        {children}
    </InputContext.Provider>
  );
};

export const useInputContext = () =>{
  
  const { inputState, inputActive } = useContext(InputContext)

  return {inputState, inputActive}
}
