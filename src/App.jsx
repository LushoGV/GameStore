import {useState, useEffect } from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Page from './pages/Page'
import SectionPage from './pages/SectionPage';
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import CategoryPage from './pages/CategoryPage'
import Navbar from'./components/Navbar'
import Loader from './components/Loader'
import ScrollTopRouter from './components/ScrollTopRouter';
import Carrito from './pages/Carrito';
import ScrollButton from './components/ScrollButton';
import ShopAlert from './components/ShopAlert';
import useLockScroll from './hooks/useLockScroll';
import { InputProvider } from './context/ContextInput';
import { CarritoProvider } from './context/ContextCarrito';

const App =() =>{

  const [loader, setLoader] = useState(true)
  const [theme, setTheme] = useState('auto')
  const changeTheme = (newState) => setTheme(newState)
  const changeLoader = (newState) =>setLoader(newState)
  useLockScroll(loader)
    
  useEffect(() => {
    changeLoader(false)
  }, [])   
  
  return (
    <InputProvider>
    <CarritoProvider>
    <div className='App' data-theme={theme}>
      <ScrollTopRouter/>
          <Navbar
              changeTheme = {changeTheme}
              theme = {theme}
          />        
      <main>
      {loader&&<Loader/>}    
          <Routes>       
              <Route path='/' element={<HomePage changeLoader={changeLoader}/> }>
                <Route exact path=':sort' element={<SectionPage changeLoader={changeLoader}/>}/>
              </Route>
              <Route exact path='category/:category' element={<CategoryPage changeLoader={changeLoader} loader={loader}/>}>
                  <Route exact path='/category/:category/:sort' element={<SectionPage changeLoader={changeLoader}/>}/>
              </Route>
              <Route exact path='platform/:platform' element={<CategoryPage changeLoader={changeLoader} loader={loader}/>}>
                  <Route exact path='/platform/:platform/:sort' element={<SectionPage changeLoader={changeLoader}/>}/>                 
             </Route>
              <Route path='all/search=:id' element={<SearchPage changeLoader={changeLoader} loader={loader}/>}/>
              <Route path=':platform/search=:id' element={<SearchPage changeLoader={changeLoader}  loader={loader}/>}/>              
              <Route exact path='game/:id/:title' element= {<Page changeLoader={changeLoader}/>}/>
              <Route exact path='shop' element= {<Carrito changeLoader={changeLoader}/>}/>
        </Routes>
        <ShopAlert/>
        <ScrollButton/>
        </main>
      </div>
      </CarritoProvider>
      </InputProvider>
)}

export default App