import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import User from './User.jsx'
import './index.css'
import Footer from './Footer.jsx'
import Header from './Header.jsx'
import Customer from './Customer.jsx'
/*https://stackoverflow.com/questions/75522048/react-how-to-access-urls-parameters*/


createRoot(document.getElementById('root')).render(
  <>
    <StrictMode>
      <Header />
      <Customer />
      <Footer />
    </StrictMode>
  </>
)
