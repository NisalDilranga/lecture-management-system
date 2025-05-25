import NavBar from "../component/Naviagtion/NavBar";
import ShuffleHero from "../component/HeroSection/ShuffleHero";
import { TextParallaxContentExample } from "../component/TextParallaxContent";
import { Example } from "../component/BlockInTextCard";
import UtilityBar from "../component/Naviagtion/UtilityBar";

const Home = () => {
  return (
    <>
      <UtilityBar />
      <NavBar />

      <div>
        <ShuffleHero />
        <TextParallaxContentExample />
        <Example />
      </div>
    </>
  );
};

export default Home;
