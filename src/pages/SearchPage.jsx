import {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import CardGrid from '../components/CardGrid'
import useFetchApi from '../hooks/useFetchApi'
import Sort from '../components/Sort'
import SpecialPage from './SpecialPage'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSlidersH} from '@fortawesome/free-solid-svg-icons'

const SearchPage = ({changeLoader, loader}) => {

  const [content, setContent] = useState([])
  const [noResults, setNoResults] = useState(false)
  const [sortActive, setSortActive] = useState(true)

  let location = useLocation()
  let query = location.pathname.slice(location.pathname.indexOf('/search=')+8, location.pathname.length) //separo la busqueda de la url
  let filters = location.hash.slice(8,location.hash.length) //filtro el genero
  let sort = (location.search.slice(6,location.search.length) != '') ? location.search.slice(6,location.search.length) : 'relevance' //si existe, filtro el orden, sino pongo por defecto
  let platform = location.pathname.slice(1,location.pathname.indexOf('/search'))  //filtro plataforma

  const [data, error, load] = useFetchApi(`games?&sort-by=${sort}`)

  const testFilter = () =>{

    let content = data.filter(element =>element.title.toLocaleLowerCase().startsWith(query) == true) //empiezan con el query
    let moreContent = data.filter(element =>{ if(element.title.toLocaleLowerCase().includes(query) && !content.includes(element)) return true})//contienen el query
    content = content.concat(moreContent)

    let contentFiltered = [] //resultados filtrados
    let platformFilter = [] //filtro por plataforma
    let genreFilter = [] //filtro por genero

    if(filters == '' && platform == '' ) contentFiltered = content //si no hay filtros, va todo
    else{
      if(platform != '' && platform != 'all') platformFilter = content.filter(elementFilt => elementFilt.platform.toLowerCase().includes(platform.toLocaleLowerCase()) == true) //filtro por plataforma
      else platformFilter = content //si no hay plataforma, va todo

      if(filters != '' && filters != 'All') genreFilter = content.filter(item=>(item.genre.toLowerCase() == filters.toLowerCase()) == true)//filtro por genero
      else genreFilter = content//si no hay genero, va todo
    
      if(platformFilter != '' && genreFilter == '')contentFiltered = platformFilter 
      else if(platformFilter == '' && genreFilter != '')contentFiltered = genreFilter
      else if(platformFilter == '' && genreFilter == '')contentFiltered = ''
      else{
        contentFiltered = genreFilter.filter(element => platformFilter.includes(element) == true) //filtro los no repetidos en los dos arrays
      }
    }
    return contentFiltered
  }

  useEffect(() => {

    //si existe algun elemento que coincida con la busqueda, filtro
    if(data.some(element =>element.title.toLocaleLowerCase().startsWith(query) || element.title.toLocaleLowerCase().includes(query)  == true) == true){
      setContent(testFilter())
      setNoResults(false)
    }
    else{
      setNoResults(true) //sino, se cambia la variable de noResults para que no se renderize la tabla con filtros
      
    }
    changeLoader(load)
    
  }, [data, load,platform,filters,query])

  useEffect(()=>{
    changeLoader(load)
  },[])

  return (
    <>
          {noResults == false ? 
            <section className='resultsGridContainer'>
                <header className='resultsPagHeader'>
                    <div className='resultsTitle'>
                      <div className='TitleContent'>
                      <h2>{`Search results for: ${query}`}</h2>
                      <p><span>{`found ${content.length} results`}</span></p>   
                      </div>
                      <button className='sortButton' onClick={() => setSortActive(!sortActive)}><FontAwesomeIcon icon={faSlidersH}/></button>
                    </div> 
                    <div className={sortActive ? 'sortBox-active' : 'sortBox-hidden'}>
                    <Sort/>
                    </div>
              </header>
           {  !loader&&
                <CardGrid
                  contentGrid = {content}
                  use={2}
                />
          } 
            </section>

            : <SpecialPage use='search' /> 
        }
    </>
  )
}

export default SearchPage