import { useEffect, useState } from 'react'
import Fullscreen from './Fullscreen'
import useLockScroll from '../hooks/useLockScroll'

const Gallery = ({imagesArray}) => {

    const [imagesContent, setImagesContent] = useState(null)
    const [gridImage, setGridImage] = useState(null)
    const [FullscreenActive, setFullscreenActive] = useState(false)
    useLockScroll(FullscreenActive)

    const changeImage = (position) =>{
        if(gridImage == null) setGridImage(0)
        else if(gridImage != position) setGridImage(position)
        
    }

    useEffect(()=>{
            setGridImage(0)
            setImagesContent(null)
            if(imagesArray.length >  0){
                if(imagesArray.length > 4){
                    imagesArray = imagesArray.slice(0, 3)
                    setImagesContent(imagesArray)
                }
                else setImagesContent(imagesArray)
                if(gridImage == null && imagesArray) changeImage()
            }
            else{
                setImagesContent(null)
            }
    },[imagesArray])

    

  return (
      <>
        {     
        imagesContent != null&&
        <section className='imagesGridSection'>
            <h2>images</h2>
            <div className='imagesGrid'>
                <div><img onClick={()=> setFullscreenActive(true)}  src={imagesContent[gridImage].image} alt=""/></div>
                    <ul>
                {
                imagesContent.map((item, index)=>{
                        return(<li className={gridImage == index ? 'imageSelected' : 'imageNoSelected'} key={index}  onClick={() => {changeImage(index)}}><img src={item.image} alt="" /></li>)
                    })
                }
                </ul>
            </div>
        </section>    
        }
        {
             FullscreenActive != false&&<Fullscreen imagesArray = {imagesArray} imagePosition={gridImage} FullscreenState={setFullscreenActive}/>
        }
      </>
  )
}

export default Gallery