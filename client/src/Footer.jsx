import coyoteLogo from './assets/CoyoteIcon.png'
import yogaLogo from './assets/icon.png'
function Footer() {


    return (
        <>
            <footer id="coyote" className="container-fluid mt-auto" title="Trust the Coyote to use the finest ACME products!">
                <div className="row">
                    <div className="col-4 left">
                    </div>
                    <div className="col-4 center">
                        <div className="row">
                            <p>
                                &copy;2026 Yoga H'om
                            </p>
                        </div>
                        <div className="row" title="Trust the Coyote to use the finest ACME products!">
                            <p>
                                &copy;2026 Website built by Coyote Enterprises
                            </p>
                        </div>
                    </div>
                    <div className="col-4">
                        <a href={"/AboutMe"} >
                        <img src={coyoteLogo} className="coyotelogo rounded" alt="Missing" title="Trust the Coyote to use the finest ACME products!" />
                        </a>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default Footer
