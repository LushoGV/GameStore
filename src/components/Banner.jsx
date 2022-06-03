import { useContext } from 'react'
import Search from './Search'
import { Link } from 'react-router-dom'
import { useInputContext } from '../context/ContextInput'

const Banner = () => {

  const {inputActive} = useInputContext()

return(
  <section className='slideSection'>
  <div className='slideContent'>
  <video autoPlay loop muted >
      <source src='https://www.freetogame.com/g/515/videoplayback.webm'/>         
      {/* https://www.freetogame.com/g/452/videoplayback.webm */}
  </video>
</div>
<div className='slideTextContent'>
    <p className='textContentTitle'><span>find & track the best</span><span className='specialSpan'>free-to-play</span><span>games</span></p>
    <span className='secondaryTitle'>track what you've played and search for what to play next!</span>
    <Search/>
      <button onClick={() => inputActive()}><span>search</span></button>
    <div className='popularSection'>
      <span>popular:</span>
      <Link to='/category/strategy' ><span className='popularSectionOption'>strategy,</span></Link>
      <Link to='/category/shooter'><span className='popularSectionOption'>shooter,</span></Link>
      <Link to='/category/mmorpg'><span className='popularSectionOption'>mmorpg</span></Link>
    </div>      
</div>
</section>
)

}


export default Banner

