
import instructorReportsLogo from './assets/InstructorLogin.png'
import reportsLogo from './assets/Reports.png'
import salesLogo from './assets/sales.png'
import instructorLogo from './assets/background_sunset.png'
import customerLogo from './assets/Senior.png'
import classLogo from './assets/General.png'

/*
        import './App.css'
           <div className="container-flex">
          <img src={background} className="base" width="170" height="100vh" alt="" />
          <img src={seniorLogo} className="card-img-top" alt="Missing" />
          <img src={generalLogo} className="vite" alt="Vite logo" />
        </div>
*/



function App() {

  return (

    <div className="row p-5 ms-5 ">

      <div className="card col-2 ms-5" title="Customers" >
        <div class="row">
          <img src={customerLogo} className="card-img-top" alt="Missing" />
        </div>
        <div className=" row pl-1 pr-1 mb-0">
          <a href="/Customer.html?action=Read" className="btn btn-dark fw-bold dash-button">Customers</a>
        </div>
      </div>

      <div className="card col-2 ms-5" title="Classes" >
        <div class="row">
          <img src={classLogo} className="card-img-top" alt="Missing" />
        </div>
        <div className=" row pl-1 pr-1 mb-0">
          <a href="/YogaClass.html?action=Read" className="btn btn-dark fw-bold dash-button">Yoga </a>
        </div>
      </div>

      <div className="card col-2 ms-5" title="Instructors" >
        <div class="row">
          <img src={instructorLogo} className="card-img-top" alt="Missing" />
        </div>
        <div className=" row pl-1 pr-1 mb-0">
          <a href="/User.html?action=Read" className="btn btn-dark fw-bold dash-button">Instructors</a>
        </div>
      </div>

      <div className="card col-2 ms-5" title="Sales" >
        <div class="row">
          <img src={salesLogo} className="card-img-top" alt="Missing" />
        </div>
        <div className=" row pl-1 pr-1 mb-0">
          <a href="/Sale.html?action=Read" className="btn btn-dark fw-bold dash-button">Sales</a>
        </div>
      </div>

      <div className="card col-2 ms-5" title="Reports" >
        <div class="row">
          <img src={reportsLogo} className="card-img-top" alt="Missing" />
        </div>
        <div className=" row pl-1 pr-1 mb-0">
          <a href="#" className="btn btn-dark fw-bold dash-button">Reports</a>
        </div>
      </div>

      <div className="card col-2 ms-5 p5" title="Instructor Reports" >
        <div class="row">
          <img src={instructorReportsLogo} className="card-img-top" alt="Missing" />
        </div>
        <div className=" row pl-1 pr-1 mb-0">
          <a href="#" className="btn btn-dark fw-bold dash-button">Instructor Reports</a>
        </div>
      </div>


    </div>

  )
}

export default App
