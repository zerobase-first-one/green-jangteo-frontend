import styles from "./NavBar.module.css"
import { AiFillHome } from "react-icons/ai";
import { IoSearch } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import { BsPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";


const NavBar = () => {
   return (
      <div className={styles.navBar}>
         <Link to={"/"}>
            <button type="button"><AiFillHome /><span className="blind">홈</span></button>
         </Link>
         <button type="button"><IoSearch /><span className="blind">검색</span></button>
         <button type="button"><IoIosDocument /><span className="blind">주문내역</span></button>
         <button type="button"><BsPersonFill /><span className="blind">마이페이지</span></button>
      </div>
   )
}

export default NavBar