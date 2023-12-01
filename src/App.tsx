
import './App.css'
import './index.css'
import './reset.css'

import Header from "./Header/Header";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home/Home';
import Footer from './Footer/Footer';
import NavBar from './NavBar/NavBar';
import CategoryPage from './routes/CategoryPage/CategoryPage';

function App() {

  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:firstCategory" element={<CategoryPage/>}></Route>
        <Route path="/:firstCategory/:secondCategory" element={<CategoryPage/>}></Route>
      </Routes>
      <Footer />
      <NavBar />
    </BrowserRouter>
    </>
  )
}

export default App
