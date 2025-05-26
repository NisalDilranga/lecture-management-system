import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import LoginComp from "../Login/LoginComp";

const NavBar = ({ setLoginModalOpen: setParentLoginModalOpen }) => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleOpenLoginModal = () => {
    if (setParentLoginModalOpen) {
      setParentLoginModalOpen(true);
    } else {
      setLoginModalOpen(true);
    }
  };
  
  const handleCloseLoginModal = () => setLoginModalOpen(false);
  const handleLogout = () => {
    localStorage.removeItem('lecturerAuth');
    localStorage.removeItem('lecturerRole');
    localStorage.removeItem('lecturerEmail');
    localStorage.removeItem('lecturerStatus');
    setIsLoggedIn(false);
    setUserRole("");
    setUserEmail("");
    navigate("/");
  };

  useEffect(() => {    // Check authentication status whenever component mounts
    const lecturerAuth = localStorage.getItem('lecturerAuth') === 'true';
    const storedLecturerStatus = Number(localStorage.getItem('lecturerStatus'));
    const storedLecturerEmail = localStorage.getItem('lecturerEmail');
    const storedLecturerRole = localStorage.getItem('lecturerRole');
    
    setIsLoggedIn(lecturerAuth);
    setUserRole(storedLecturerRole || "");
    setUserEmail(storedLecturerEmail || "");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);
  return (
    <>
      <LoginComp open={loginModalOpen} handleClose={handleCloseLoginModal} />
      <header
        className={`${
          scrolled
            ? "shadow-md bg-white/95 backdrop-blur-sm"
            : "bg-[#c3c1c1] mt-[78px]"
        } fixed top-0 left-0 right-0 z-50 transition-all duration-300 `}
      >
        <div
          className={`mx-auto flex  max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 ${
            scrolled ? "h-16" : "h-10"
          }`}
        >
          {scrolled && (
            <a className="block text-teal-600" href="#">
              <span className="sr-only">Home</span>

              <img
                src="/src/assets/SLIATE.png"
                alt="SLIATE Logo"
                style={{ width: "40px", height: "50px" }}
              />
            </a>
          )}

          <div
            className={`flex flex-1 items-center justify-end  ${
              scrolled ? "md:justify-between" : "md:justify-center"
            }`}
          >
            {" "}
            <nav aria-label="Global" className="hidden md:block">
              <ul className="flex items-center gap-6 text-[16px] font-medium">
                <li>
                  <a
                    className={` ${
                      scrolled ? "text-gray-700" : " text-black"
                    } transition  rounded-md px-3 py-2 hover:bg-gray-100 hover:text-black`}
                    href="#"
                  >
                    {" "}
                    Home{" "}
                  </a>
                </li>

                <li>
                  <a
                    className={` ${
                      scrolled ? "text-gray-700" : " text-black"
                    } transition  rounded-md px-3 py-2 hover:bg-gray-100 hover:text-black`}
                    href="#"
                  >
                    {" "}
                    About{" "}
                  </a>
                </li>

                <li>
                  <a
                    className={` ${
                      scrolled ? "text-gray-700" : " text-black"
                    } transition  rounded-md px-3 py-2 hover:bg-gray-100 hover:text-black`}
                    href="#"
                  >
                    {" "}
                    Programs{" "}
                  </a>
                </li>

                <li>
                  <a
                    className={` ${
                      scrolled ? "text-gray-700" : " text-black"
                    } transition  rounded-md px-3 py-2 hover:bg-gray-100 hover:text-black`}
                    href="#"
                  >
                    {" "}
                    Admissions{" "}
                  </a>
                </li>

                <li>
                  <a
                    className={` ${
                      scrolled ? "text-gray-700" : " text-black"
                    } transition  rounded-md px-3 py-2 hover:bg-gray-100 hover:text-black`}
                    href="/vacancies"
                  >
                    {" "}
                    Vacancy{" "}
                  </a>
                </li>

                <li>
                  <a
                    className={` ${
                      scrolled ? "text-gray-700" : " text-black"
                    } transition  rounded-md px-3 py-2 hover:bg-gray-100 hover:text-black`}
                    href="#"
                  >
                    {" "}
                    Contact{" "}
                  </a>
                </li>
              </ul>
            </nav>{" "}            {scrolled && (
              <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">                  {isLoggedIn ? (
                    <div className="flex items-center gap-3">                      <a
                        href="/admin/dashboard"
                        className="block rounded-md bg-indigo-600 px-5 py-2 text-[15px] font-medium text-white transition-all duration-300 hover:bg-indigo-700 hover:shadow-lg"
                      >
                        Lecturer Dashboard
                      </a>
                      <div className="hidden sm:block text-sm text-gray-600">
                        {userEmail}
                        <div className="text-xs text-gray-500">{userRole}</div>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="block rounded-md bg-gray-200 px-5 py-2 text-[15px] font-medium text-gray-800 transition-all duration-300 hover:bg-gray-300"
                      >
                        Logout
                      </button>
                    </div>                  ) : (
                    <>
                      <button
                        onClick={handleOpenLoginModal}
                        className="block rounded-md bg-teal-600 px-5 py-2 text-[15px] font-medium text-white transition-all duration-300 hover:bg-teal-700 hover:shadow-lg hover:shadow-teal-600/20"
                      >
                        Login
                      </button>
                      <a
                        className="hidden rounded-md border-2 border-teal-600 bg-transparent px-5 py-1.5 text-[15px] font-medium text-teal-600 transition-all duration-300 hover:bg-teal-600 hover:text-white sm:block"
                        href="#"
                      >
                        Apply Now
                      </a>
                    </>
                  )}
                </div>{" "}
                <button className="block rounded-md bg-gray-100 p-2.5 text-gray-700 transition-all duration-300 hover:bg-teal-600 hover:text-white md:hidden">
                  <span className="sr-only">Toggle menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>{" "}
      </header>
    </>
  );
};

export default NavBar;
