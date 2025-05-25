import React, { useState } from "react";
import NavBar from "../component/Naviagtion/NavBar";
import UtilityBar from "../component/Naviagtion/UtilityBar";
import LoginComp from "../component/Login/LoginComp";

const Login = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(true);

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false);
    // Optionally redirect to home page after closing
    // window.location.href = '/';
  };

  return (
    <>
      <UtilityBar />
      <NavBar />
      <LoginComp open={loginModalOpen} handleClose={handleCloseLoginModal} />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {/* This div will be visible if the modal is closed */}
        {!loginModalOpen && (
          <div className="text-center p-8 bg-white rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4">Login Page</h1>
            <button
              onClick={() => setLoginModalOpen(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
              Open Login Form
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
