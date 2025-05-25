import React, { useState } from "react";
import { motion } from "framer-motion";
import LoginComp from "../Login/LoginComp";

const UtilityBar = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleOpenLoginModal = () => setLoginModalOpen(true);
  const handleCloseLoginModal = () => setLoginModalOpen(false);

  const utilityLinks = [
    { title: "Directory", href: "/directory" },
    { title: "Webmail", href: "/webmail" },
    { title: "Login", onClick: handleOpenLoginModal },
    { title: "Emergency", href: "/emergency" },
    { title: "Online Payments", href: "/payments" },
  ];
  return (
    <>
      <LoginComp open={loginModalOpen} handleClose={handleCloseLoginModal} />
      <div className="hidden md:block bg-[#680000] text-white py-1">
        <div className="container mx-auto px-4 flex justify-between items-center ">
          <div className="">
            {" "}
            <img
              src="/src/assets/logo.png"
              alt="SLIATE Logo"
              style={{ width: "400px", height: "70px" }}
            />
          </div>
          <div className="flex items-center space-x-4">
            {" "}
            {utilityLinks.map((link, index) => (
              <React.Fragment key={link.title}>
                {link.onClick ? (
                  <motion.button
                    onClick={link.onClick}
                    className="text-sm hover:text-accent transition-colors duration-200 bg-transparent border-none cursor-pointer"
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {link.title}
                  </motion.button>
                ) : (
                  <motion.a
                    href={link.href}
                    className="text-sm hover:text-accent transition-colors duration-200"
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {link.title}
                  </motion.a>
                )}

                {index < utilityLinks.length - 1 && (
                  <span className="text-black">|</span>
                )}
              </React.Fragment>
            ))}
            <div className="relative ml-4">
              <select className="text-sm bg-transparent border border-white/30 rounded px-2 py-1 appearance-none pr-8 focus:outline-none focus:border-accent">
                <option value="en">English</option>
                <option value="si">සිංහල</option>
                <option value="ta">தமிழ்</option>
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 fill-current text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UtilityBar;
