import { useEffect, useState } from "react";
import instructorReportsLogo from '../assets/instructorLogin.png'
import wipLogo from '../assets/WorkInProgress.png'


function WorkInProgress({ api, title }) {
    const [something, setSomething] = useState([]);

    return (
        <>
            <div className="row p-5 m-5 align-self-center">
                <a href="\Dashboard" >
                                <h1 className="text-white">Work in Progress</h1>    
                            <img src={wipLogo} className="rounded" alt="Missing" title="Return to Dashboard" height={"600px"} />

                     
                </a>
            </div>
        </>
    );
}

export default WorkInProgress;

