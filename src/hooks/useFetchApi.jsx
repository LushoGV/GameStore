import {useEffect, useState} from 'react'
import options from './options'

const useFetchApi = (param, use) => {

    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [loader, setLoader] = useState(true)
    let paginacion = {
        page:0,
        contentPage:[],
        totalPages:0
    }

    const url = `https://free-to-play-games-database.p.rapidapi.com/api/${param}`

    const fetchResource = async (url, options) =>{

        setLoader(true)

        const data = await fetch(url,options)
        const response = await data.json()

        if(use){
            if(response.length > 12){

                let max = Math.round(response.length/12)
                let index = 0
                let i
    
                for (i = 0; i < max; i++){
                    paginacion.contentPage.push(response.slice(index, index+12))
                    index =  index+12
                }
                
                paginacion.contentPage
                setData(paginacion)
                
            }else{
                setData(response)
            }
            
            paginacion.totalPages =  paginacion.contentPage.length
        }
        else{
            setData(response)
        }

        setTimeout((
            setLoader(false)
        ),10000)

    }
  
    useEffect(() => {

        setLoader(true)

        try{
            fetchResource(url,options)   
        }
        catch(e){
            setError(e)
        }
    
    }, [url,options])

    return [data,error,loader]
}

export default useFetchApi