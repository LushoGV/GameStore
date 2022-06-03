import {useState, useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import Dropdown from './Dropdown'
import categoriesList from '../hooks/CategoriesList'

const Sort = () => {

  const navigate = useNavigate()
  let location = useLocation()
  const [sortSelect, setSortSelect] = useState({sort: 'relevance',platform: 'all',genre: 'All'})
  const obj = [{
    text: ['sort by','platform','genre'],
    content: [["alphabetical","release-date","relevance"], ['all','pc','browser'],['All',categoriesList].flat()],
  }]

  const changeURL = (item) =>{ //cuando se selecciona una opcion de cualquier dropbox
  
    let urlText//identificador que va a la url sobre el tipo de filtro
    let urlParam//seccion de la url actual a la que pertenece el filtro
    let newUrlParam//nueva parte de la url con el filtro nuevo ya agregado

    obj.map(element =>{
     
      if(element.content[0].includes(item)){//si la opcion seleccionada se encuentra en el drop orden
        urlText = '?sort='
        urlParam= location.search
      }
      else if(element.content[1].includes(item)){//si la opcion seleccionada se encuentra en el drop plataformas
        urlText = '&platform='
        urlParam= location.pathname
        
      }
      else{//si la opcion seleccionada se encuentra en el drop categorias
        urlText = '#filter='
        urlParam= location.hash
        
      }
      return urlText, urlParam
    })

    if(urlParam == location.search){//si la opcion seleccionada se encuentra en el drop orden

      if(urlParam != ""){//si ya habia un filtro antes de este tipo
        newUrlParam = urlParam.replace(urlParam.substring(urlParam.indexOf(urlText)+urlText.length), item)//reemplazo el filtro de la url por el nuevo
        navigate(`${location.pathname}${newUrlParam}${location.hash}`)// y redirecciono a la nueva url
      }
      else{//si no habia filtro de este tipo, se agrega redirecciona a la url actual + el nuevo filtro
        navigate(`${location.pathname}${urlText}${item}${location.hash}`)//plataforma+textoFIltro+filtro+genero
      }

    }else if(urlParam == location.pathname){

      let platform =  urlParam.slice(1, urlParam.indexOf('/search'))
      if(platform != ''){
        let newPathname = location.pathname.replace(platform, item.toLowerCase())
         navigate(`${newPathname}${location.search}${location.hash}`)

      }else{
        navigate(`/${item.toLowerCase()}${location.pathname}${location.search}${location.hash}`)//nuevaPlataforma+orden+genero
      }
      
    }else{

      if(urlParam != ""){
        newUrlParam = urlParam.replace(urlParam.substring(urlParam.indexOf(urlText)+urlText.length), item)//urlParam.substring(posicion inicial del id + largo del id) = filtro viejo
        navigate(`${location.pathname}${location.search}${newUrlParam}`)
      }
      else{
        navigate(`${location.pathname}${location.search}${urlText}${item}`)//plataforma+orden+textoFIltro+filtro
      }
    }

}

  useEffect(()=>{//cuando algun filtro en la url cambia, se actualiza el estado que contiene el objeto 

    setSortSelect({

      sort: location.search ? location.search.slice(6,location.search.length) : 'relevance',//si hay algun filtro, se recorta de la url, sino se pone uno por defecto
      platform: location.pathname ? location.pathname.slice(1,location.pathname.indexOf('/search')) : 'all',
      genre: location.hash ? location.hash.slice(8,location.hash.length) : 'All'

    })

  },[location.hash, location.pathname, location.search])

  return (
    <>     
        {
          obj.map((item, index)=>{ 
            return(
              <div className='selectFilter' key={index}>
                <Dropdown 
                  text={item.text[0]}
                  titleState = {sortSelect.sort}
                  option = {sortSelect.sort}
                  content={item.content[0]}
                  fn={changeURL}
                  modalState={false}
                  use={2}
                  />
                  <Dropdown 
                  text={item.text[1]}
                  titleState = {sortSelect.platform}
                  option = {sortSelect.platform}
                  content={item.content[1]}
                  fn={changeURL}
                  modalState={false}
                  use={2}
                  />
                  <Dropdown
                  text={item.text[2]}
                  titleState = {sortSelect.genre}
                  option = {sortSelect.genre}
                  content={item.content[2]}
                  fn={changeURL}
                  modalState={false}
                  use={2}
                  />
              </div>
              )
          })
      }
    </>
  )
}

export default Sort