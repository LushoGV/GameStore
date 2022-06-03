import { useNavigate } from 'react-router-dom'

const SpecialPage = ({use}) => {

  const navigate = useNavigate
 
  return (
    <div className='specialPageContent'>
      {use == '404' ? <p>error 404</p> : use == 'search' ? <p>no se han encontrado resultados</p> : <p>no tienes juegos guardados</p>}
      {use=='404'&&<button onClick={navigate('/')}>home</button>}
    </div>
  )
}

export default SpecialPage