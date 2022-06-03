import { useEffect, useState } from 'react'
import useFetchApi from '../hooks/useFetchApi'
import Card from './Card'

const Recomendations = ({category, description, id}) => {

    const [data] = useFetchApi(`games?sort-by=popularity`)
    const [contentFilter, setContentFilter] = useState(null)

    const filterRecomendations = () =>{

        let filterGenre = category == 'ARPG' || category == 'Action RPG' ? 'MMORPG' : category //error de la api
        
        let filters = data.filter((element) => {

            if(element.short_description.toLowerCase().includes(description.toLowerCase()) ||  element.genre.toLowerCase() == filterGenre.toLowerCase())
            if(element.id != id)return true
     
        })

       if(filters.length > 4 )  return filters.slice(0, 4) //si los resultados filtrados son mayor a 4, se seleccionan 4 
       else return filters

    }

    useEffect(()=>{
        if(description && category) setContentFilter(filterRecomendations())
     
    },[data, category, description])

  return (
    contentFilter!=null&&
    <aside>
        <div className='asideTitle'>
                <h2>Recomendations</h2>
        </div>
    <ul>
        {
            contentFilter.map((item, index)=>{

                return (
                                <Card
                                    key={index}
                                    title={item.title}
                                    id={item.id}
                                    image={item.thumbnail}
                                    type={item.genre}
                                    publisher={item.publisher}
                                    platform={item.platform}
                                />
                )

            })
        }
    </ul>
    </aside>
  )
}

export default Recomendations