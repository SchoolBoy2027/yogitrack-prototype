import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'
import background from './assets/dashboard.png'
import Footer from './Footer.jsx'
import Header from './Header.jsx'
/*https://stackoverflow.com/questions/75522048/react-how-to-access-urls-parameters*/


createRoot(document.getElementById('root')).render(
 <>


 <StrictMode>
    <Header/>
    <App />
    <Footer/>
   </StrictMode>
 </>
)
