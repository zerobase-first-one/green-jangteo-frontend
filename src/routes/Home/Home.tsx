import ProductList from "../../Product/ProductList"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import NavBar from "../../components/NavBar"
import Banner from "./Banner"

const Home = () => {
   return (
      <>
         <Header />
         <Banner />
         <ProductList />
         <Footer />
         <NavBar />
      </>
   )
   }

export default Home