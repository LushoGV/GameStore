import {useEffect, useState} from 'react'
import categoriesList from '../hooks/CategoriesList'
import { useNavigate } from 'react-router-dom'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons'
import ThemeButton from './ThemeButton'
import useLockScroll from '../hooks/useLockScroll'

const BarLeft = ({BarValue,hideBar,changeTheme,theme}) => {

    const navigate = useNavigate()
    const [option, setOption] = useState({
      platform: false,
      categories: false
    })
    const objList = [
      ['category','platform'],
      [categoriesList.flat(), ['pc','browser']]
    ] 

    const closeBar = (e) =>{
        setTimeout((e) =>{
        hideBar()
        }, 100) 
    }

    useLockScroll(BarValue)

    const changeStateOption = (item) =>{

        item == 'platform' ? 
        setOption({...option, platform: !option.platform}) 
        : setOption({...option, categories:  !option.categories})

    }

    const checkOption = (item) =>{
        if(item == 'platform') return option.platform
        else return option.categories
    }

    useEffect(()=>{

        BarValue != true&&setOption({...option, categories:  false, platform: false})

    },[BarValue])

    
  return (
    <div className= {BarValue ? "barLeft-active" : "barLeft-hidden"} >
    <div className="barLeftContent">
    {BarValue&&
    <ul className='barBtnContainer'>
        <li className='barBtn'><button onClick={() => {closeBar(), navigate('/')}}><span>home</span><FontAwesomeIcon icon={faAngleRight}/></button></li>
    {
      objList[0].map((item, index)=>{
        return(
          <li key={index} className='barBtn'>
            <button onClick={() => changeStateOption(item)} ><span>{item}</span><FontAwesomeIcon icon={faAngleRight}/></button>
            <div className={checkOption(item) != false ? 'dropMenu-active' : 'dropMenu-hidden'}>
                  <button onClick={() => changeStateOption(item)}><FontAwesomeIcon icon={faAngleLeft}/><span>{item}</span></button>
                  <ul>
                    {
                      objList[1][index].map((element, number) => {return <li key={number} className='dropMenu-option' 
                      onClick={() => {
                          closeBar()
                          navigate(`/${item}/${element}`)
                  }}>{element}</li>})
                    }
              </ul>
            </div>     
          </li>
        )
      })
  }
    <li className='barBtn'><ThemeButton
        changeTheme = {changeTheme}
        theme = {theme}
    /></li>
</ul>
    }
     </div>
 </div>
    )
}


export default BarLeft