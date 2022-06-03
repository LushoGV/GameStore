import {useState, useEffect, useContext} from 'react'
import CardGrid from '../components/CardGrid'
import { useCarritoContext } from '../context/ContextCarrito'
import useFetchApi from '../hooks/useFetchApi'
import SpecialPage from './SpecialPage'

const Carrito = () => {
    
    const [content, setContent] = useState(null)
    const [data] = useFetchApi(`games`)
    const { shopContent } = useCarritoContext()

    const info = () =>{

        let newArray = []
        if(shopContent != null && shopContent != ''){
            let localArray = shopContent
            localArray.forEach(item => {
                data.filter(element => {
                    if(element.id.toString() == item && !newArray.includes(element)) newArray.push(element) 
                })
            })
            return newArray
        }
       else return null
    }

    useEffect(()=>{
        setContent(info())
    },[data,shopContent])

  return (
      <>
      <header className='favoritesHeader'>
          <h2>favorites</h2>
            {content!=null&&<span>{content.length} games</span>}
      </header>
      {
      content==null ? <SpecialPage use={'carrito'}/> : 
      <section className='resultsGridContainer'>
      <CardGrid
            contentGrid={content}
        />
        </section>
        }
      </>
  )

}

export default Carrito