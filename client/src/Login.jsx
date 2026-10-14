
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginLogo from "./assets/PadlockFancy.png";
import { useAuth } from "./AuthContext";
import scheduleImage from "./assets/logo2.png";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mustChangePassword, setMustChangePassword] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setResponseMessage("");

    if (!userId || !password) {
      setResponseMessage("Please enter your User ID and Password.");
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          password: password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setResponseMessage(data.message || "Invalid user ID or password.");
        return;
      }
      login(data.user);
      setLoggedInUser(data.user);

      if (data.mustChangePassword) {
        setMustChangePassword(true);
        setResponseMessage("Your temporary password must be changed before you can continue.");
        return;
      }

      navigate("/Dashboard");
    } catch (error) {
      console.error("Login error:", error);
      setResponseMessage("Unable to connect to the server.");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setResponseMessage("");

    if (!newPassword || !confirmPassword) {
      setResponseMessage("Please enter and confirm your new password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setResponseMessage("The new passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setResponseMessage("Password must be at least 8 characters.");
      return;
    }

    if (!loggedInUser) {
      setResponseMessage("User information is missing. Please log in again.");
      return;
    }

    try {
      const response = await fetch("/api/login/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: loggedInUser.user_id,
          currentPassword: password,
          newPassword: newPassword
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setResponseMessage(data.message || "Unable to change password.");
        return;
      }

      setResponseMessage("Password changed successfully.");

      setMustChangePassword(false);
      setPassword("");
      setNewPassword("");
      setConfirmPassword("");

      navigate("/Dashboard");
    } catch (error) {
      console.error("Change password error:", error);
      setResponseMessage("Unable to connect to the server.");
    }
  };
  const schedulePath = "/ClassSchedule/View";
  const scheduleTitle = "Class Schedule";


  if (mustChangePassword) {
    return (
      <>
        <div className="d-flex justify-content-center">
          <div className="loginForm pb-1 rounded m-5 p-1">
            <div id="response" className="ajaxReturnMsg">{responseMessage}</div>
            <form id="changePassword" className="classForm" onSubmit={handleChangePassword}>

              <div className="row pb-1 border-bottom border-dark border-solid">
                <div className="col-1">
                  <div className="loginLogo">
                    <img src={loginLogo} alt="Change Password" style={{ maxWidth: "50px" }} />
                  </div>
                </div>
                <div className="col-10">
                  <p className="p-3 fs-3 fw-bold text-white">Change Password</p>
                </div>
              </div>

              <div className="row pb-1 border-bottom border-dark border-solid">
                <div className="col-1"></div>
                <div className="col-9">
                  <p className="fs-5">Your temporary password must be changed before you can continue.</p>
                </div>
              </div>

              <div className="row pb-1 border-bottom border-dark border-solid">
                <div className="col-1"></div>
                <div className="col-3">
                  <label htmlFor="newPassword" className="formLabel fs-5 fw-bold">New Password:</label>
                </div>
                <div className="col-6">
                  <input id="newPassword" type="password" className="formInput" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} autoComplete="new-password" />
                </div>
              </div>

              <div className="row pb-1 border-bottom border-dark border-solid">
                <div className="col-1"></div>
                <div className="col-3">
                  <label htmlFor="confirmPassword" className="formLabel fs-5 fw-bold">Confirm Password:</label>
                </div>
                <div className="col-6">
                  <input id="confirmPassword" type="password" className="formInput" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="new-password" />
                </div>
              </div>

              <div className="row p-3 border-bottom border-dark border-solid">
                <div className="col-9"></div>
                <div className="col-2">
                  <button className="btn btn-dark fs-5 fw-bold" type="submit">Change Password</button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="loginForm pb-1 rounded m-5 p-1">
          <div id="response" className="ajaxReturnMsg">{responseMessage}</div>
          <form id="login" className="classForm" onSubmit={handleLogin}>

            <div className="row pb-1 border-bottom border-dark border-solid">
              <div className="col-1">
                <div className="loginLogo">
                  <img src={loginLogo} alt="Login" style={{ maxWidth: "50px" }} />
                </div>
              </div>
              <div className="col-10">
                <p className="p-3 fs-3 fw-bold text-white">Login</p>
              </div>
              <div className="col-1 fs-3 pr-3 fw-bold text-white" title="Not functional yet"></div>
            </div>

            <div className="row pb-1 border-bottom border-dark border-solid">
              <div className="col-1"></div>
              <div className="col-3">
                <label htmlFor="user_id" className="formLabel fs-5 fw-bold">User ID:</label>
              </div>
              <div className="col-6">
                <input id="user_id" type="text" name="user_id" className="formInput" value={userId} onChange={(e) => setUserId(e.target.value)} autoComplete="username" />
              </div>
            </div>

            <div className="row pb-1 border-bottom border-dark border-solid fs-5">
              <div className="col-1"></div>
              <div className="col-3">
                <label htmlFor="password" className="fs-5 fw-bold">Password:</label>
              </div>
              <div className="col-6">
                <input id="password" type="password" name="password" className="formInput" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
              </div>
            </div>

            <div className="row p-3 border-bottom border-dark border-solid">
              <div className="col-9"></div>
              <div className="col-2">
                <button className="btn btn-dark fs-5 fw-bold" type="submit">Login</button>
              </div>
            </div>

          </form>
        </div>
      </div>
      <div className="d-flex flex-column flex-md-row ms-0 pt-5">

        <div className="p-2 justify-content-start mt-0 pt-0 ms-5 card">
          <a href={schedulePath} title={scheduleTitle} className="position-relative d-inline-block" style={{ width: "200px" }}>
            <img
              src={scheduleImage}
              className="card-img-top"
              alt={scheduleTitle}
              style={{ width: "200px" }}
            />

            <div className="position-absolute bottom-0 start-0 w-100 p-0">
              <div className="btn btn-dark border-2 border-secondary fw-bold dash-button w-100 rounded-0">
                {scheduleTitle}
              </div>
            </div>
          </a>
        </div>

      </div>

    </>
  );
}

export default Login;
