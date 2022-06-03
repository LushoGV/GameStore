import { useEffect } from 'react'

const useLockScroll = (estado) => {
  
    const { body } = document;

    const LockScroll = (prueba) => prueba == true ? body.style.overflow = 'hidden' : body.style.overflow = 'auto'
        
    useEffect(()=>{

        LockScroll(estado)

    },[estado])


}

export default useLockScroll