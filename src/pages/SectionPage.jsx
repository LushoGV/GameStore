import {useState, useEffect} from 'react'
import useFetchApi from '../hooks/useFetchApi'
import { useParams, useNavigate } from 'react-router-dom'
import CardGrid from '../components/CardGrid'
import { useLoaderContext } from '../context/ContextLoader'

const SectionPage = () => {
    
    const redirect = useNavigate()
    const params = useParams()
    const [content, setContent] = useState([])
    const { loader, changeLoader } = useLoaderContext()

    const sortOptions = ["popularity","release-date","relevance"]
    let data 
    let load
    let error

      params.category ?  [data,error,load] = useFetchApi(`games?platform=all&category=${params.category}&sort-by=${params.sort}`,true) 
    : params.platform ?  [data,error,load] = useFetchApi(`games?platform=${params.platform}&sort-by=${params.sort}`,true) 
    : [data,error,load] = useFetchApi(`games?sort-by=${params.sort}`,true)  

    useEffect(() => {

      if(!sortOptions.includes(params.sort))redirect("/")
      else{
        changeLoader(load)
        setContent([])
        setContent(data)
      }

    }, [params.sort,data,load])

    return (
      <>{!loader&&
      <>
      <header className='headerPage'>
        <ul>
        {
        params.category ? <li>{params.category} / {params.sort.includes('-') ? params.sort.replace('-', ' ') : params.sort}</li> : 
        params.platform ? <li>{params.platform} / {params.sort.includes('-') ? params.sort.replace('-', ' ') : params.sort}</li> : 
        <li>{params.sort.includes('-') ? params.sort.replace('-', ' ') : params.sort}</li>
        }
        </ul>
      </header> 
    <section className='resultsGridContainer'>
      { content!=[]&&<CardGrid
          contentGrid={content}
        /> }
    </section>
    </>
    }
    </>
  )
}

export default SectionPage