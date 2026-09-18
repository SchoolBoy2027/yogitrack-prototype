import { useState } from 'react'
function Header() {

  const [isLoggedIn, setLogin] = useState(0)

  return (
    <>
    <div id="mainMenu" className="container-flex">
        <div className="d-flex flex-row-reverse">
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
