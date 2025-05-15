import Hero from "../components/Hero";
import LatestConllection from "../components/LatestConllection";
import BestSeller from "../components/BestSeller";
import OutPolicy from "../components/OutPolicy";
import NewsletterBox from "../components/NewsletterBox";
import AllType from "../components/AllType";
import Slider from "../components/Slider";
import HeroBackground from "../components/HeroBackground";

const Home = () => {
  return (
    <div>
      <HeroBackground />
      <Hero />
      <Slider />
      <AllType />
      {/* <TopCategories /> */}
      <LatestConllection />
      <BestSeller />
      <OutPolicy />
      <NewsletterBox />
    </div>
  );
};

export default Home;
