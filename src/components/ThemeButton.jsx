import  { useEffect } from 'react'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSun, faMoon} from '@fortawesome/free-solid-svg-icons'

const ThemeButton = ({changeTheme, theme}) => {

    const checkTheme = () => localStorage.themes ? 
    localStorage.themes === 'auto' ? changeTheme(getTheme()) : 
    changeTheme(localStorage.themes)  : 
    (changeTheme(getTheme()),localStorage.setItem('themes', getTheme()) )

    const getTheme = () => {
        if (window.matchMedia) {
          if(window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark' 
          else return 'light'
        }
        return 'light'
    }

    const newTheme = () =>{
        if(theme == 'light') changeTheme('dark'), localStorage.setItem('themes', 'dark')
        else changeTheme('light'), localStorage.setItem('themes', 'light')
    }

    useEffect(()=>{
        checkTheme()
    },[theme])

  return (
    <button className='themeButton' onClick={()=>newTheme()}><span>theme:</span><span>{theme}</span><FontAwesomeIcon icon={theme == 'light' ? faSun :  faMoon}/></button>
  )
}

export default ThemeButton