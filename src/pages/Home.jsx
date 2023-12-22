import Banner from "../components/Home/Banner";
import BuiltForSection from "../components/Home/BuiltForSection/BuiltForSection";

const Home = () => {
  return (
    <div>
      <Banner />
      <section id="about">
        <BuiltForSection />
      </section>
    </div>
  );
};

export default Home;
