import ProductList from "../../Product/ProductList";
import NavBar from "../../components/NavBar";
import Banner from "./Banner";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <>
      <Header />
      <Banner />
      <ProductList />
      <Footer />
      <NavBar />
    </>
  );
};

export default Home;
