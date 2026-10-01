import { useState } from 'react'
import yogaLogo from './assets/icon.png'
function Header() {

    const [isLoggedIn, setLogin] = useState(0)
    /*                                Is Logged in= {isLoggedIn}  was the button text below.  
    */
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
                        <a
                            type="button"
                            className=" btn btn-dark fs-5"
                            href="/Login"
                        /* onClick={() => setLogin((isLoggedIn) => isLoggedIn = 1)}  */
                        >Login Screen
                        </a>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Header
