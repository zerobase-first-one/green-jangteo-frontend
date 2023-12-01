import { Link } from 'react-router-dom';
import { useReducer } from 'react';
import { TbMenu2 } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import styles from './Header.module.css'

const Header = () => {
   const categories = [
      {firstCategory: "음식", secondCategoryList: [{secondCategory: "스낵"},{secondCategory: "과일"}]},
      {firstCategory: "의류", secondCategoryList: [{secondCategory: "상의"},{secondCategory: "하의"}]},
   ]

   const [display, setDisplay] = useReducer(
      (val) => (val === "none" ? "block" : "none"),
      "none"
   )


   return (
      <>
         <header className={styles.header}>
            <h1 className={styles.logo}><span className="blind">그린장터</span></h1>
            <button type="button" className={styles.categoryBtn} onClick={setDisplay}>
               {display == "none" ? <TbMenu2 /> : <IoClose />}<span className="blind">카테고리</span>
               </button>
            <nav className={styles.navigation} style={{ display }}>
               <ul className={styles.ul1deps}>
                  {categories.map((category: any) => (
                     <li key={category.firstCategory} className={styles.categoryList}>
                        <Link className={styles.list} to={`/${category.firstCategory}`} onClick={setDisplay}>{category.firstCategory}</Link>
                        <ul key={category.firstCategory} className={styles.ul2deps}>
                           {category.secondCategoryList.map((list: any) => (
                              <li key={list.secondCategory}>
                                 <Link className={styles.list} to={`/${category.firstCategory}/${list.secondCategory}`} onClick={setDisplay}>{list.secondCategory}</Link>
                              </li>
                           ))}
                        </ul>
                     </li>
                  ))}
               </ul>
            </nav>
            <div className={styles.utilBtnBox}>
               <button type="button" className={styles.categoryBtn}><FaBell /><span className="blind">알림</span></button>
               <button type="button" className={styles.categoryBtn}><FaShoppingCart /><span className="blind">장바구니</span></button>
            </div>
         </header>
      </>
   )
}

export default Header