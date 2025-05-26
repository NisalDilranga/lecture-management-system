import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../component/Naviagtion/NavBar";
import ShuffleHero from "../component/HeroSection/ShuffleHero";
import { TextParallaxContentExample } from "../component/TextParallaxContent";
import { Example } from "../component/BlockInTextCard";
import UtilityBar from "../component/Naviagtion/UtilityBar";
import Footer from "../component/footer/Footer";
import LoginComp from "../component/Login/LoginComp";

const Home = () => {
  const location = useLocation();
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Check if we're being redirected from a protected route that requires login
  useEffect(() => {
    if (location.state?.openLoginModal) {
      setLoginModalOpen(true);
      // Clear the state to avoid reopening the modal on page refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <>
      <UtilityBar />
      <NavBar setLoginModalOpen={setLoginModalOpen} />
      
      {/* Login Modal */}
      <LoginComp open={loginModalOpen} handleClose={handleCloseLoginModal} />

      <div className="">
        <ShuffleHero />
        <TextParallaxContentExample />
        <Example />
        <Footer />
      </div>
    </>
  );
};

export default Home;
