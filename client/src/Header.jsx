import { useState } from 'react'
import yogaLogo from './assets/icon.png'
function Header() {

  const [isLoggedIn, setLogin] = useState(0)

  return (
    <>
    <div id="mainMenu" className="container-fluid">
        <div className="row ps-1">          
            <div className="col-2 ">
            <a href="\Dashboard" >
                <img src={yogaLogo} className="logo rounded" alt="Missing" title="Return to Dashboard" />
            </a>
            </div>
            <div className="col-8 ">
            </div>
            <div className="col-2">
            <button
                type="button"
                className=" btn btn-dark fs-5"
                onClick={() => setLogin((isLoggedIn) => isLoggedIn = 1)}
                >
                Is Logged in= {isLoggedIn}
            </button>
            </div>
        </div>
    </div>

    </>
  )
}

export default Header
