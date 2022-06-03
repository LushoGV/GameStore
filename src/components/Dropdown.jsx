import {useState, useEffect} from 'react'
import {FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons'

const Dropdown = ({content,fn,modalState,titleState,text,option}) => {

    const [optionState, setOptionState] = useState(false)
    const optionsActive = () =>setOptionState(!optionState)
    const [newContent, setNewContent] = useState([])
    const [optionSelected, setOptionSelected] = useState(null)

    const checkOption = (item) =>{
        if(optionSelected != null && optionSelected == item) return 'dropdown-optionSelected'
        else return 'dropdown-option'
    }

    useEffect(() => {
        setNewContent(content)
        setOptionState(modalState)
        option&&setOptionSelected(option)
    }, [content,modalState])  

  return (
    <div onBlur={() => {
        setTimeout(() => {setOptionState(false)},180)
        }}>
            <button onClick={optionsActive}>
               <span>{text}<p>{titleState}</p></span>
                <FontAwesomeIcon icon={optionState ? faAngleUp :  faAngleDown}/>
            </button>
            <ul  className={optionState ? 'dropdown-active' : 'dropdown-hidden'}>
                {
                    newContent.map((item, index)=>{
                        return(<li key={index} className={checkOption(item)}><p onClick={()=>{fn(item), setOptionSelected(item)}}>{item}</p></li>)
                    })                   
                }
            </ul>
    </div>
  )
}

export default Dropdown