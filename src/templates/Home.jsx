import NavBar from "../component/Naviagtion/NavBar";
import ShuffleHero from "../component/HeroSection/ShuffleHero";
import { TextParallaxContentExample } from "../component/TextParallaxContent";
import { Example } from "../component/BlockInTextCard";
import UtilityBar from "../component/Naviagtion/UtilityBar";
import Footer from "../component/footer/Footer";

const Home = () => {
  return (
    <>
      <UtilityBar />
      <NavBar />

      <div>
        <ShuffleHero />
        <TextParallaxContentExample />
        <Example />
        <Footer />
      </div>
    </>
  );
};

export default Home;
