import {useState, useEffect} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Card from './Card'
import Loader from './Loader'

const CardGrid = ({contentGrid}) => {

  const [cont, setCont] = useState([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)

    useEffect(()=>{
      
      if((contentGrid.contentPage)){
        if(page == 0) contentGrid.contentPage&&setCont(contentGrid.contentPage[0])
        else{
          setTimeout(()=>{
            contentGrid.contentPage&&setCont(prevCont => prevCont.concat(contentGrid.contentPage[page]))
          },[1000])
          }
        contentGrid.contentPage&&setHasMore(page < contentGrid.contentPage.length-1)
      }else{
       setCont(contentGrid)
       setHasMore(false)
      }
     
    },[contentGrid,page])

  return (
    <InfiniteScroll dataLength={cont.length}
    hasMore={hasMore} 
    next={()=> setPage((prevPage) => prevPage + 1)}
    loader={<Loader/>}
    >
          <ul className='ContentGridCard'>        
            {cont!=[]&&cont.map((item, index)=>{
                return(                  
                    <Card key={index}
                    title={item.title}
                    image={item.thumbnail}
                    type={item.genre}
                    id={item.id}
                     publisher={item.publisher}
                    platform={item.platform}
                    short_description={item.short_description}
                 />)
                })}             
            </ul>
  </InfiniteScroll>
  )
}

export default CardGrid