import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import "./index.css";

import App from "./App.jsx";
import User from "./User.jsx";
import YogaClass from "./YogaClass.jsx";
import Customer from "./Customer.jsx";
import Sale from "./Sale.jsx";
import ClassPackage from "./ClassPackage.jsx";
import ClassSchedule from "./ClassSchedule";
import AttendanceList from "./AttendanceList.jsx";
import AttendanceReport from "./AttendanceReport.jsx";
import InstructorEval from "./InstructorEval.jsx";
import InstructorPayReport from "./InstructorPayReport.jsx";
import AboutMe from "./AboutMe.jsx";
import Login from "./Login.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";
import WorkInProgress from "./components/WorkInProgress.jsx";

import IsLoggedIn from "./IsLoggedIn.jsx";      //security wrapper for the site below.

import { AuthProvider } from "./AuthContext";
import InstructorReport from "./InstructorReport.jsx";
import ManagerReport from "./ManagerReport.jsx";

function Layout() {
  const location = useLocation();
  const hideHeader = location.pathname === "/Login" || location.pathname === "/";

  return (
    <>

      {!hideHeader && (<Header />)}
      <main className="position-fixed start-0 end-0 overflow-auto mt-5" style={{ height: "85vh" }} >
        <div className="container-fluid mt-3">
          <Routes>
            <Route element={<IsLoggedIn />}>
              <Route path="/Customer/:action" element={<Customer />} />
              <Route path="/Customer/:action/:id" element={<Customer />} />
              <Route path="/User/:action" element={<User />} />
              <Route path="/User/:action/:id" element={<User />} />
              <Route path="/YogaClass/:action" element={<YogaClass />} />
              <Route path="/YogaClass/:action/:id" element={<YogaClass />} />
              <Route path="/Sale/:action" element={<Sale />} />
              <Route path="/Sale/:action/:id" element={<Sale />} />
              <Route path="/ClassPackage/:action" element={<ClassPackage />} />
              <Route path="/ClassPackage/:action/:id" element={<ClassPackage />} />


              <Route path="/InstructorReport/View" element={<InstructorReport />} />
              <Route path="/InstructorReport/AttendanceReport" element={<AttendanceReport />} />
              <Route path="/InstructorReport/Attendance" element={<AttendanceList />} />
              <Route path="InstructorReport/Eval" element= {<WorkInProgress/>}/>
              <Route path="/Report/View" element={<ManagerReport />} />
              <Route path="/Report/AttendanceReport" element={<AttendanceReport />} />
              <Route path="/Report/InstructorEval" element={<InstructorEval />} />
              <Route path="/Report/InstructorPay" element={<InstructorPayReport />} />
              <Route path="/Dashboard" element={<App />} />
              <Route path="/AboutMe" element={<AboutMe />} />
            </Route>
            <Route path="/ClassSchedule/View" element={<ClassSchedule />} />
            <Route path="*" element={<Login />} />  /* The catch all, login redirects to the dashboard */
          </Routes>
        </div>
      </main>
    </>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>

        <Layout />

      </AuthProvider>
      <footer className="fixed-bottom" style={{ height: "10vh" }}>
        <Footer />
      </footer>
    </BrowserRouter>
  </StrictMode>
);