import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";


import './index.css'
import App from './App.jsx'
import User from './User.jsx'
import YogaClass from './YogaClass.jsx'
import Customer from './Customer.jsx'
import Sale from './Sale.jsx'

import Footer from './Footer.jsx'
import Header from './Header.jsx'
/*https://stackoverflow.com/questions/75522048/react-how-to-access-urls-parameters*/


createRoot(document.getElementById('root')).render(
  <>


    <StrictMode>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/Customer/:action" element={<Customer />} />
          <Route path="/Customer/:action/:id" element={<Customer />} />
          <Route path="/User/:action" element={<User />} />
          <Route path="/User/:action/:id" element={<User />} />
          <Route path="/YogaClass/:action" element={<User />} />
          <Route path="/YogaClass/:action/:id" element={<User />} />
          <Route path="/Sale/:action" element={<User />} />
          <Route path="/Sale/:action/:id" element={<User />} />
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>

    </StrictMode>

  </>
)



function GetPage() {
  const location = useLocation();
  let PageRender;

  console.log(location.pathname);
  switch (location.pathname) {
    case "/YogaClass":
      PageRender = YogaClass;
      break;

    case "/User":
      PageRender = User;
      break;

    case "/Customer":
      PageRender = Customer;
      break;

    case "/Sale":
      PageRender = Sale;
      break;

    default:
      PageRender = App;
      break;
  }

  return <PageRender />;
}




function GetAction() {

  const location = useLocation();
  let PageAction;

  console.log(location.pathname);

  const queryParams = new URLSearchParams(window.location.search)
  const term = queryParams.get("term")
  console.log(term);

  switch (term) {
    case "create":
      PageAction = 'create';
      break;

    case "update":
      PageAction = 'update';

      break;

    case "delete":
      PageAction = 'delete';
      break;

    case "read":
      PageAction = 'read';
      break;
  }

  return PageAction;
}