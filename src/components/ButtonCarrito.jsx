import { useContext, useEffect, useState } from "react"
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBookmark} from '@fortawesome/free-solid-svg-icons'
import { useCarritoContext } from "../context/ContextCarrito"

const ButtonCarrito = ({item}) => {

    const [title, setTitle] = useState(true)        
    const { changeShopContent } = useCarritoContext()

    const check = (item) =>{

        let localArray 

        if(localStorage.getItem('shop')){ //si existe shop

            localArray = localStorage.getItem('shop').split(',')

            if(localArray.includes(item.toString())) localArray = localArray.filter(element => element != item.toString())//si ya esta en el localStorage, lo borro   
            else localArray.push(item)//sino, lo agrego
            
        }else localArray = [item]        
        
        checkName(item)//actualiza el boton de la carta
        localStorage.setItem('shop', localArray)//actualiza el localStorage
        changeShopContent(localArray, title)//actualiza el estado que emula al localSotage y activa la señal de abajo a la izquierda
    }

    const checkName = (item) =>{ //si el item está en el localStorage, devuelve true y se cambia el boton de add por remove
        if(localStorage.getItem('shop').split(',').includes(item.toString())) setTitle(false)
        else  setTitle(true)
    }

    useEffect(()=>{
        checkName(item)       
    },[item])

  return (
    <button onClick={() => {check(item), setTitle(!title)}} className={ title ? 'cardAddShop' : 'cardRemoveShop'}><FontAwesomeIcon icon={faBookmark} /></button>
  )
}

export default ButtonCarrito