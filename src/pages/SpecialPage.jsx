import { useNavigate } from 'react-router-dom'

const SpecialPage = ({use}) => {

  const navigate = useNavigate
 
  return (
    <div className='specialPageContent'>
      {use == '404' ? <p>error 404</p> : use == 'search' ? <p>no results found</p> : <p>you don't have favorite games</p>}
      {use=='404'&&<button onClick={navigate('/')}>home</button>}
    </div>
  )
}

export default SpecialPage